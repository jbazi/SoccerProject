$(document).ready(function () {
    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://www.bbc.com/sport/football/teams/middlesbrough/rss.xml',
    });
    $("#latestNews").html("Latest Team News");

    $('#teamNews').text('Current Middlesbrough Form');
    $("#myTable").dataTable({
        'iDisplayLength': 5,
        'bJQueryUI': true,
        "aaData": [],
        "oLanguage": { "sEmptyTable": "No teams were found with the API provided" },
        "sDom": '<"H"lf<"clear-right"p>>rt<"F"ip>',
    });

    $("#teamStanding_tbl").dataTable({
        "bInfo": false,
        'bFilter': false,
        "bPaginate": false,
        "bSort": false,
        "aaData": [],
    });

    $("#teamFixtures").dataTable({
        "bInfo": false,
        'bFilter': false,
        "bPaginate": false,
        "bSort": false,
        "aaData": [],
    });

    getPieChartStats();
    getTeamFixtures();

    getPlayerData();
    getTeamLeagueStandingData();
    var userSelection = "Álvaro Negredo";
    renderLoadedPlayers(userSelection);
    $('#playerInfo_tbl').hide();
    $("#managedBy").attr("src", "../../Players/PremierLeague/Boro/karanka.jpg");
    $("#managersName").html("Aitor karanka");
    $("#fullLeague_btn").on('click', function () {
        window.location = "../../Leagues/PremierLeague.aspx";
    });

});

/*
-----------------------------------------------------------------------------------------
                        Rough Draft Informations On The Team
-----------------------------------------------------------------------------------------
*/

function renderLoadedPlayers(userSelection) {
    $('#playerInfo_tbl').show();
    userSelection = $('#selectPlayer').val();
    playerLoad(userSelection);

    var DataArray = [];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var name, nationality, position, jerseyNumber, contractDate;
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/343/players',
        dataType: 'json',
        cache: false, //add this
        async: false,
        type: 'GET',
    }).done(function (result) {
        $.each(result.players, function () {
            if (this.name == userSelection) {
                var rawDate = new Date(this.contractUntil);
                var datePretty = monthNames[rawDate.getMonth()] + ", " + (rawDate.getDate() + 1) + " " + rawDate.getFullYear();
                DataArray.push([this.name,
                        this.nationality,
                        this.position,
                        this.jerseyNumber,
                        datePretty
                ]);
                name = this.name;
                nationality = this.nationality;
                position = this.position;
                jerseyNumber = this.jerseyNumber;
                contractDate = datePretty;
            }
        });
    });
    $('#playerName').html("<td><label>Name: </label>   " + name + "</td>");
    $('#playerNationality').html("<td><label>Nationality: </label>   " + nationality + "</td>");
    $('#playerPosition').html("<td><label>Position: </label>    " + position + "</td>");
    $('#jerseyNumber').html("<td><label>Jersey Number: </label>    " + jerseyNumber + "</td>");
    $('#signedUntil').html("<td><label>Signed Until: </label>    " + contractDate + "</td>");

}



/*
-----------------------------------------------------------------------------------------
                        Players Informations On The Team
-----------------------------------------------------------------------------------------
*/
function renderTeamPlayerData(result) {
    var DataArray = [];
    var NamesArray = [];
    var removeName = "Matt Macey";
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    $.each(result.players, function () {
        NamesArray.push([this.name]);
    });
    for (var i = NamesArray.length - 1; i--;) {
        if (NamesArray[i] === removeName)
            NamesArray.splice(i, 1);
    }
    var select = document.getElementById("selectPlayer");
    for (var i = 0; i < NamesArray.length; i++) {
        var opt = NamesArray[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    $.each(result.players, function () {
        var rawDate = new Date(this.contractUntil);
        var datePretty = monthNames[rawDate.getMonth()] + ", " + (rawDate.getDate() + 1) + " " + rawDate.getFullYear();
        DataArray.push([this.name,
                        this.nationality,
                        this.position,
                        this.jerseyNumber,
                        datePretty
        ]);
    });

    $('#myTable').dataTable().fnAddData(DataArray);
    $('#myTable').dataTable().fnAdjustColumnSizing();
}

function getPlayerData() {
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/343/players',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        renderTeamPlayerData(response);
    });
}
/*
-----------------------------------------------------------------------------------------
                        Quick League Standings For The Team
                             Code Logic Return based on string name 
                                 No Id in API for distinct verification
-----------------------------------------------------------------------------------------
*/

function renderTeamFixtures(result) {
    var DataArray = [];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    $.each(result.fixtures, function () {
        var status = "FINISHED";
        if (this.status == status) {
            var rawDate = new Date(this.date);
            var datePretty = monthNames[rawDate.getMonth()] + ", " + (rawDate.getDate() + 1) + " " + rawDate.getFullYear();
            DataArray.push([this.homeTeamName, this.result.goalsHomeTeam, datePretty, this.result.goalsAwayTeam, this.awayTeamName]);
        }
    });
    var lastFour = DataArray.slice(-4);
    $('#teamFixtures').dataTable().fnAddData(lastFour);
    $('#teamFixtures').dataTable().fnAdjustColumnSizing();
}

function getTeamFixtures() {
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/343/fixtures',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        renderTeamFixtures(response);
    });
}

function renderTeamLeagueStandingData(result) {
    var DataArray = [];
    var position, sum;

    $.each(result.standing, function (index) {
        var name = "Middlesbrough FC";
        var firstPrev, secondPrev, firstNext, secondNext, link;
        if (this.teamName == name) {
            $(result).css('background-color', '#FFFF00');
            position = index;
            if (position - 1 > -1) {
                //firstPrev = result.standing[position - 2];
                secondPrev = result.standing[position - 1];

                /*
                DataArray.push([firstPrev.position,
                        firstPrev.teamName,
                        firstPrev.playedGames,
                        firstPrev.points
                ]);
                */
                DataArray.push([secondPrev.position,
                        secondPrev.teamName,
                        secondPrev.playedGames,
                        secondPrev.points
                ]);
            }
            DataArray.push([this.position,
                        this.teamName,
                        this.playedGames,
                        this.points
            ]);

            if (position + 1 < result.standing.length) {
                firstNext = result.standing[position + 1];
                DataArray.push([firstNext.position,
                        firstNext.teamName,
                        firstNext.playedGames,
                        firstNext.points
                ]);

                secondNext = result.standing[position + 2];

                DataArray.push([secondNext.position,
                        secondNext.teamName,
                        secondNext.playedGames,
                        secondNext.points
                ]);

            }
        }

    });

    $('#teamStanding_tbl').dataTable().fnAddData(DataArray);
    $('#teamStanding_tbl').dataTable().fnAdjustColumnSizing();
}

function getTeamLeagueStandingData() {
    var DataArray = [];
    var position;
    var next;
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/426/leagueTable',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        renderTeamLeagueStandingData(response);
    });
}

/*
-----------------------------------------------------------------------------------------
                        Show Statistical Data on a pie chart
                             Use Flot.js 
-----------------------------------------------------------------------------------------
*/


function getPieChartStats() {
    /*
         -> #47A508 = green (wins)
         -> #ff6a00 = orange (losses)
         -> #ffd800 = yellow (draws)
    */
    var DataArray = [];
    var position;
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/426/leagueTable',
        dataType: 'json',
        cache: false, //add this
        async: false,
        type: 'GET',
    }).done(function (result) {
        $.each(result.standing, function (index) {
            var name = "Middlesbrough FC";
            if (this.teamName == name) {
                position = index + 1;
                DataArray.push(this.wins, this.losses, this.draws);
            }
        });

        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labelFontColor: "red",
                labels: [
                        "Wins",
                        "Losses",
                        "Draws"
                ],
                labelColor: 'white',
                datasets: [
                    {
                        data: DataArray,
                        backgroundColor: [
                            "#47A508",
                            "#ff6a00",
                            "#ffd800"
                        ],
                    }]
            },
            options: { responsive: true },
            animateScale: true
        });
    });

}


function playerLoad(playerName) {
    var select = document.getElementById("selectPlayer");
    switch (playerName) {
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/negredo.jpg");
            break;
        case 'David Nugent': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/nugent.jpg");
            break;
        case 'Stewart Downing': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/downing.jpg");
            break;
        case 'Brad Guzan': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/guzan.jpg");
            break;
        case 'Gastón Ramírez': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/ramirez.jpg");
            break;
        case 'Viktor Fischer': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/fischer.jpg");
            break;
        case 'Antonio Barragán': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/barragan.jpg");
            break;
        case 'Álvaro Negredo': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/negredo.jpg");
            break;
        case 'Víctor Valdés': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/valdes.jpg");
            break;
        case 'Bernardo Espinosa': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/bernardo.jpg");
            break;
        case 'Marten de Roon': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/roon.jpg");
            break;
        case 'Dimitrios Konstantopoulos': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/konstantopoulos.jpg");
            break;
        case 'Tomás Mejías': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/mejias.jpg");
            break;
        case 'Daniel Ayala': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/ayala.jpg");
            break;
        case 'Ben Gibson': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/gibson.jpg");
            break;
        case 'Fábio': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/fabio.jpg");
            break;
        case 'George Friend': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/friend.jpg");
            break;
        case 'James Husband': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/husband.jpg");
            break;
        case 'Emilio Nsue': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/nsue.jpg");
            break;
        case 'Julien de Sart': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/sart.jpg");
            break;
        case 'Adam Clayton': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/clayton.jpg");
            break;
        case 'Adam Forshaw': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/forshaw.jpg");
            break;
        case 'Grant Leadbitter': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/leadbitter.jpg");
            break;
        case 'Carlos de Pena': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/pena.jpg");
            break;
        case 'Jordan Rhodes': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/rhodes.jpg");
            break;
        case 'Cristhian Stuani': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/stuani.jpg");
            break;
        case 'Calum Chambers': $("#playerPicture").attr("src", "../../Players/PremierLeague/Boro/chambers.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





