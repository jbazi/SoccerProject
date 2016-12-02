$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://www.bbc.com/sport/football/teams/real-madrid/rss.xml',
    });
    $("#latestNews").html("Latest Team News");

    $('#teamNews').text('Wolfsburg Form');
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
    var userSelection = "Mesut Özil";
    renderLoadedPlayers(userSelection);
    $('#playerInfo_tbl').hide();
    $("#managedBy").attr("src", "../../Players/Bundesliga/Wolfsburg/ismael.jpg");
    $("#managersName").html("<strong>Valerien Ismael</strong>");
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
        url: 'http://api.football-data.org/v1/teams/11/players',
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
        url: 'http://api.football-data.org/v1/teams/11/players',
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
        url: 'http://api.football-data.org/v1/teams/11/fixtures',
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
        var name = "VfL Wolfsburg";
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
        if ($(this).text() === 'VfL Wolfsburg')
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
            var name = "VfL Wolfsburg";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/gomez.jpg");
            break;
        case 'Jakub Blaszczykowski': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/jakub.jpg");
            break;
        case 'Mario Gómez': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/gomez.jpg");
            break;
        case 'Daniel Didavi': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/didavi.jpg");
            break;
        case 'Yannick Gerhardt': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/yannick.jpg");
            break;
        case 'Diego Benaglio': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/diego.jpg");
            break;
        case 'Koen Casteels': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/koen.jpg");
            break;
        case 'Max Grün': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/max.jpg");
            break;
        case 'Robin Knoche': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/knoche.jpg");
            break;
        case 'Ricardo Rodríguez': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/ricardo.jpg");
            break;
        case 'Marcel Schäfer': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/marcel.jpg");
            break;
        case 'Vieirinha': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/vieirinha.jpg");
            break;
        case 'Sebastian Jung': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/jung.jpg");
            break;
        case 'Christian Träsch': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/christian.jpg");
            break;
        case 'Luiz Gustavo': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/luiz.jpg");
            break;
        case 'Josuha Guilavogui': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/joshua.jpg");
            break;
        case 'Carlos Ascues': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/carlos.jpg");
            break;
        case 'Paul Seguin': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/paul.jpg");
            break;
        case 'Maximilian Arnold': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/maximilian.jpg");
            break;
        case 'Daniel Caligiuri': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/yuya.jpg");
            break;
        case 'Ismail Azzaoui': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/ismailA.jpg");
            break;
        case 'Jeffrey Bruma': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/bruma.jpg");
            break;
        case 'Bruno Henrique': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/bruno.jpg");
            break;
        case 'Philipp Wollscheid': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/woll.jpg");
            break;
        case 'Phillip Menzel': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/phillip.jpg");
            break;
        case 'Robin Ziegele': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/robin.jpg");
            break;
        case 'Jannes Horn': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/horn.jpg");
            break;
        case 'Amara Conde': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/amara.jpg");
            break;
        case 'Josip Brekalo': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/josip.jpg");
            break;
        case 'Anton Donkor': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/anton.jpg");
            break;
        case 'Borja Mayoral': $("#playerPicture").attr("src", "../../Players/Bundesliga/Wolfsburg/josip.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





