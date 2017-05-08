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

    $('#teamNews').text('Eintracht Frankfurt Form');
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

    $("#nextFiveGames").dataTable({
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
    $("#managedBy").attr("src", "../../Players/Bundesliga/Frankfurt/niko.jpg");
    $("#managersName").html("<strong>Niko Kovac</strong>");
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
        url: 'http://api.football-data.org/v1/teams/19/players',
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
        url: 'http://api.football-data.org/v1/teams/19/players',
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
    var prevResults = [];
    var nextFixtures = [];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    $.each(result.fixtures, function () {
        var status = "FINISHED";
        if (this.status == status) {
            var rawDate = new Date(this.date);
            var datePretty = days[rawDate.getDay()] + " " + monthNames[rawDate.getMonth()] + " " + (rawDate.getDate() + 1) + ",  " + rawDate.getFullYear();
            prevResults.push([this.homeTeamName, this.result.goalsHomeTeam, datePretty, this.result.goalsAwayTeam, this.awayTeamName]);
        }
    });
    var lastFour = prevResults.slice(-4);
    $('#teamPrevResults').dataTable().fnAddData(lastFour);
    $('#teamPrevResults').dataTable().fnAdjustColumnSizing();

    $.each(result.fixtures, function () {
        var status1 = "TIMED"; var status2 = "POSTPONED"; var status3 = "SCHEDULED";
        var verses = "v";
        if (this.status == status1 || this.status == status2 || this.status == status3) {
            var rawDate = new Date(this.date);
            var datePretty = days[rawDate.getDay()] + " " + monthNames[rawDate.getMonth()] + " " + (rawDate.getDate() + 1) + ",  " + rawDate.getFullYear();
            nextFixtures.push([this.homeTeamName, verses, this.awayTeamName, datePretty]);
        }
    });
    var lastfive = nextFixtures.slice(0, 5);
    $('#nextFiveGames').dataTable().fnAddData(lastfive);
    $('#nextFiveGames').dataTable().fnAdjustColumnSizing();
}
function getTeamFixtures() {
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/19/fixtures',
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
        var name = "Eintracht Frankfurt";
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
        if ($(this).text() === 'Eintracht Frankfurt')
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
            var name = "Eintracht Frankfurt";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/meier.jpg");
            break;
        case 'Ante Rebic': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/ante.jpg");
            break;
        case 'Danny Blum': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/blum.jpg");
            break;
        case 'Heinz Lindner': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/heinz.jpg");
            break;
        case 'Lukas Hradecky': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/luke.jpg");
            break;
        case 'Marco Russ': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/marco.jpg");
            break;
        case 'David Abraham': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/david.jpg");
            break;
        case 'Bamba Anderson': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/anderson.jpg");
            break;
        case 'Bastian Oczipka': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/bastian.jpg");
            break;
        case 'Timothy Chandler': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/timothy.jpg");
            break;
        case 'Makoto Hasebe': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/makoto.jpg");
            break;
        case 'Slobodan Medojevic': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/slobodan.jpg");
            break;
        case 'Johannes Flum': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/flum.jpg");
            break;
        case 'Marc Stendera': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/marc.jpg");
            break;
        case 'Joel Gerezgiher': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/joel.jpg");
            break;
        case 'Mijat Gacinovic': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/mijat.jpg");
            break;
        case 'Alexander Meier': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/meier.jpg");
            break;
        case 'Haris Seferovic': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/haris.jpg");
            break;
        case 'Enis Bunjaki': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/bunjaki.jpg");
            break;
        case 'Branimir Hrgota': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/hrgota.jpg");
            break;
        case 'Omar Mascarell': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/omar.jpg");
            break;
        case 'Yanni Regäsel': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/yanni.jpg");
            break;
        case 'Marco Fabián': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/marco.jpg");
            break;
        case 'Szabolcs Huszti': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/huszti.jpg");
            break;
        case 'Leon Bätge': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/leon.jpg");
            break;
        case 'Michael Hector': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/michael.jpg");
            break;
        case 'Jesús Vallejo': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/vallejo.jpg");
            break;
        case 'Taleb Tawatha': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/taleb.jpg");
            break;
        case 'Guillermo Varela': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/varela.jpg");
            break;
        case 'Furkan Zorba': $("#playerPicture").attr("src", "../../Players/Bundesliga/Frankfurt/zobra.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





