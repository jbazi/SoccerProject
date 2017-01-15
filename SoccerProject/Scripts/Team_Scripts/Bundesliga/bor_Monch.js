﻿$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://www.bbc.com/sport/football/teams/real-madrid/rss.xml',
    });
    $("#latestNews").html("Latest Team News");

    $('#teamNews').text('FC Köln Form');
    $("#leagueTable").dataTable({
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

    $("#teamPrevResults").dataTable({
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
    var userSelection = "Mesut Özil";
    renderLoadedPlayers(userSelection);
    $('#playerInfo_tbl').hide();
    $("#managedBy").attr("src", "../../Players/Bundesliga/bor_Monch/schubert.jpg");
    $("#managersName").html("<strong>André Schubert</strong>");
    $("#fullLeague_btn").on('click', function () {
        window.location = "../../Leagues/Bundesliga.aspx";
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
        url: 'http://api.football-data.org/v1/teams/18/players',
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

    $('#leagueTable').dataTable().fnAddData(DataArray);
    $('#leagueTable').dataTable().fnAdjustColumnSizing();
}

function getPlayerData() {
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/18/players',
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
    $('#teamPrevResults').dataTable().fnAddData(lastFour);
    $('#teamPrevResults').dataTable().fnAdjustColumnSizing();
}

function getTeamFixtures() {
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/18/fixtures',
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
        var name = "Bor. Mönchengladbach";
        var firstPrev, secondPrev, firstNext, secondNext, link;
        if (this.teamName == name) {
            $(result).css('background-color', '#FFFF00');
            position = index;
            if (position - 1 > -1) {
                firstPrev = result.standing[position - 2];
                secondPrev = result.standing[position - 1];


                DataArray.push([firstPrev.position,
                        firstPrev.teamName,
                        firstPrev.playedGames,
                        firstPrev.points
                ]);

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
        if ($(this).text() === 'Bor. Mönchengladbach')
            $(this).parent().css('background-color', '#E86118', '!important');
    });
}

function getTeamLeagueStandingData() {
    var DataArray = [];
    var position;
    var next;
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/430/leagueTable',
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
        url: 'http://api.football-data.org/v1/competitions/430/leagueTable',
        dataType: 'json',
        cache: false, //add this
        async: false,
        type: 'GET',
    }).done(function (result) {
        $.each(result.standing, function (index) {
            var name = "Bor. Mönchengladbach";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/lars.jpg");
            break;
        case 'Tobias Strobl': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/tobias.jpg");
            break;
        case 'Jannik Vestergaard': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/jannik.jpg");
            break;
        case 'Christoph Kramer': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/kramer.jpg");
            break;
        case 'Jonas Hofmann': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/jonas.jpg");
            break;
        case 'Yann Sommer': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/yann.jpg");
            break;
        case 'Tobias Sippel': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/tobias.jpg");
            break;
        case 'Christofer Heimeroth': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/christofer.jpg");
            break;
        case 'Álvaro Domínguez': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/soto.jpg");
            break;
        case 'Tony Jantschke': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/tony.jpg");
            break;
        case 'Nico Elvedi': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/nico.jpg");
            break;
        case 'Andreas Christensen': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/andreas.jpg");
            break;
        case 'Oscar Wendt': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/oscar.jpg");
            break;
        case 'Nico Schulz': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/nicoS.jpg");
            break;
        case 'Julian Korb': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/julian.jpg");
            break;
        case 'Marvin Schulz': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/marvin.jpg");
            break;
        case 'Lars Stindl': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/lars.jpg");
            break;
        case 'Mahmoud Dahoud': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/dahoud.jpg");
            break;
        case 'Thorgan Hazard': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/hazard.jpg");
            break;
        case 'Fabian Johnson': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/fabian.jpg");
            break;
        case 'Ibrahima Traoré': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/traore.jpg");
            break;
        case 'Patrick Herrmann': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/patrick.jpg");
            break;
        case 'André Hahn': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/hahn.jpg");
            break;
        case 'Raffael': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/raffael.jpg");
            break;
        case 'Josip Drmic': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/josip.jpg");
            break;
        case 'Moritz Nicolas': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/moritz.jpg");
            break;
        case 'Mamadou Doucouré': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/mamadou.jpg");
            break;
        case 'Tsiy William Ndenge': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/tsiy.jpg");
            break;
        case 'Djibril Sow': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/sow.jpg");
            break;
        case 'Lászlo Bénes': $("#playerPicture").attr("src", "../../Players/Bundesliga/bor_Monch/benes.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}




