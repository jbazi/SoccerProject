$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://newsrss.bbc.co.uk/rss/sportonline_uk_edition/football/teams/m/liverpool/rss.xml',
    });
    $("#latestNews").html("Latest Liverpool News");


    $('#teamNews').text('Current Liverpool Form');
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
    var userSelection = "Philippe Coutinho";
    renderLoadedPlayers(userSelection);
    $('#playerInfo_tbl').hide();
    $("#managedBy").attr("src", "../../Players/PremierLeague/Liverpool/klopp.jpg");
    $("#managersName").html("Jurgen Klopp");

    
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
        url: 'http://api.football-data.org/v1/teams/64/players',
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
        url: 'http://api.football-data.org/v1/teams/64/players',
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
        url: 'http://api.football-data.org/v1/teams/64/fixtures',
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
        var name = "Liverpool FC";
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
    $('#teamStanding_tbl tr td').each(function () {
        if ($(this).text() === 'Liverpool FC')
            $(this).parent().css('background-color', '#E86118', '!important');
    });
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
            var name = "Liverpool FC";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/coutinho.jpg");
            break;
        case 'Sadio Mané': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/mane.jpg");
            break;
        case 'Alexander Manninger': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/manninger.jpg");
            break;
        case 'Ragnar Klavan': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/klavan.jpg");
            break;
        case 'Loris Karius': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/karius.jpg");
            break;
        case 'Georginio Wijnaldum': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/wijnaldum.jpg");
            break;
        case 'Simon Mignolet': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/mignolet.jpg");
            break;
        case 'Mamadou Sakho': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/sakho.jpg");
            break;
        case 'Dejan Lovren': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/lovren.jpg");
            break;
        case 'Joe Gomez': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/gomez.jpg");
            break;
        case 'Tiago Ilori': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/llori.jpg");
            break;
        case 'Alberto Moreno': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/moreno.jpg");
            break;
        case 'Nathaniel Clyne': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/clyne.jpg");
            break;
        case 'Connor Randall': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/randall.jpg");
            break;
        case 'Emre Can': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/can.jpg");
            break;
        case 'Lucas Leiva': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/lucas.jpg");
            break;
        case 'Kevin Stewart': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/kevinstewart.jpg");
            break;
        case 'Jordan Henderson': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/henderson.jpg");
            break;
        case 'James Milner': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/milner.jpg");
            break;
        case 'Marko Grujic': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/grujic.jpg");
            break;
        case 'Adam Lallana': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/lallana.jpg");
            break;
        case 'Sheyi Ojo': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/ojo.jpg");
            break;
        case 'Roberto Firmino': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/firmino.jpg");
            break;
        case 'Daniel Sturridge': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/sturridge.jpg");
            break;
        case 'Danny Ings': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/dannyIngs.jpg");
            break;
        case 'Divock Origi': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/origi.jpg");
            break;
        case 'Philippe Coutinho': $("#playerPicture").attr("src", "../../Players/PremierLeague/Liverpool/coutinho.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





