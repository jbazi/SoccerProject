$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://www.bbc.com/sport/football/teams/southampton/rss.xml',
    });
    $("#latestNews").html("Latest Team News");
    $('#teamNews').text('Current Southampton Form');
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
    //getLineGGraph();
    getTeamFixtures();

    getPlayerData();
    getTeamLeagueStandingData();
    var userSelection = "José Fonte";
    renderLoadedPlayers(userSelection);
    $('#playerInfo_tbl').hide();
    $("#managedBy").attr("src", "../../Players/PremierLeague/Southampton/puel.jpg");
    $("#managersName").html("Claude Puel");
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
        cache: false, 
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
        url: 'http://api.football-data.org/v1/teams/340/players',
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
        url: 'http://api.football-data.org/v1/teams/340/fixtures',
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
        var name = "Southampton FC";
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
        if ($(this).text() === 'Southampton FC')
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



function getLineGGraph() {
    var Wins = 9;
    var Draws = 6;
    var Losses = 3;
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var DataArray = [];

    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/340/fixtures',
        dataType: 'json',
        cache: false, //add this
        async: false,
        type: 'GET',
    }).done(function (result) {
        $.each(result.fixtures, function () {
            var status = "FINISHED";
            if (this.status == status) {
                var rawDate = new Date(this.date);
                var datePretty = monthNames[rawDate.getMonth()] + ", " + (rawDate.getDate() + 1) + " " + rawDate.getFullYear();
                DataArray.push([this.homeTeamName, this.result.goalsHomeTeam, datePretty, this.result.goalsAwayTeam, this.awayTeamName]);
            }
        });
        var lastFive = DataArray.slice(-5);
        var ctx = document.getElementById("myLine").getContext('2d');
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labelFontColor: "red",
                labels: [
                        Wins,
                        Draws,
                        Losses
                ],
                labelColor: 'white',
                datasets: [
                    {
                        data: lastFive,
                        illColor: '#47A508',
                        strokeColor: '#ff6a00',
                        pointColor: '#ffd800',
                    }]
            },
            options: { responsive: true },
            animateScale: true
        });
    });
    
   
}


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
            var name = "Southampton FC";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/fonte.jpg");
            break;
        case 'Pierre-Emile Höjbjerg': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/hojbjerg.jpg");
            break;
        case 'Alex McCarthy': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/mccarthy.jpg");
            break;
        case 'Lloyd Isgrove': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/isgrove.jpg");
            break;
        case 'Shane Long': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/long.jpg");
            break;
        case 'Jérémy Pied': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/pied.jpg");
            break;
        case 'Sofiane Boufal': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/boufal.jpg");
            break;
        case 'Nathan Redmond': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/redmond.jpg");
            break;
        case 'Fraser Forster': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/forster.jpg");
            break;
        case 'Virgil van Dijk': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/vanDijk.jpg");
            break;
        case 'José Fonte': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/fonte.jpg");
            break;
        case 'Florin Gardos': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/gardos.jpg");
            break;
        case 'Maya Yoshida': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/yoshida.jpg");
            break;
        case 'Jack Stephens': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/stephens.jpg");
            break;
        case 'Ryan Bertrand': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/bertrand.jpg");
            break;
        case 'Matt Targett': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/targett.jpg");
            break;
        case 'Cédric Soares': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/cedric.jpg");
            break;
        case 'Cuco Martina': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/martina.jpg");
            break;
        case 'Jordy Clasie': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/classie.jpg");
            break;
        case 'Oriol Romeu': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/romeu.jpg");
            break;
        case 'James Ward-Prowse': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/wardProwse.jpg");
            break;
        case 'Steven Davis': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/davis.jpg");
            break;
        case 'Harrison Reed': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/reed.jpg");
            break;
        case 'Dusan Tadic': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/tadic.jpg");
            break;
        case 'Sam McQueen': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/mcqueen.jpg");
            break;
        case 'Jay Rodríguez': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/rodriguez.jpg");
            break;
        case 'Charlie Austin': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/austin.jpg");
            break;
        case 'Stuart Taylor': $("#playerPicture").attr("src", "../../Players/PremierLeague/Southampton/taylor.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





