$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://www.bbc.com/sport/football/teams/sunderland/rss.xml',
    });
    $('#latestNews').text('Latest Team News');
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
    var userSelection = "Jermain Defoe";
    renderLoadedPlayers(userSelection);
    $('#playerInfo_tbl').hide();
    $("#managedBy").attr("src", "../../Players/PremierLeague/Sunderland/moyes.jpg");
    $("#managersName").html("David Moyes");
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

    //var userSelection = "Bastian Schweinsteiger";
    //playerLoad(userSelection);
    var DataArray = [];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var name, nationality, position, jerseyNumber, contractDate;
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/71/players',
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
    //"<a id='laLigaAnchor' style='color:white;' href='../LaLigaHome.aspx' target=_blank + title='Navigate to La Liga Home'>" + this.caption + "</a>"
    //$('#playerInfo_tbl').dataTable().fnAdjustColumnSizing();

}



/*
-----------------------------------------------------------------------------------------
                        Players Informations On The Team
-----------------------------------------------------------------------------------------
*/
function renderTeamPlayerData(result) {
    var DataArray = [];
    var NamesArray = [];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    $.each(result.players, function () {
        NamesArray.push([this.name]);
    });
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
        url: 'http://api.football-data.org/v1/teams/71/players',
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
    var lastFour = prevResults.slice(-5);
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
        url: 'http://api.football-data.org/v1/teams/71/fixtures',
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
        var name = "Sunderland AFC";
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
        if ($(this).text() === 'Sunderland AFC')
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
            var name = "Sunderland AFC";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/defoe.jpg");
            break;
        case 'Javier Manquillo': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/manquillo.jpg");
            break;
        case 'Papy Djilobodji': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/djilobodji.jpg");
            break;
        case 'Jason Denayer': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/denayer.jpg");
            break;
        case 'Vito Mannone': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/mannone.jpg");
            break;
        case 'Jordan Pickford': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/pickford.jpg");
            break;
        case 'Lamine Koné': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/kone.jpg");
            break;
        case 'Patrick McNair': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/mcnair.jpg");
            break;
        case "John O'Shea": $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/oshea.jpg");
            break;
        case 'Patrick van Aanholt': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/aanholt.jpg");
            break;
        case 'Billy Jones': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/billyJones.jpg");
            break;
        case 'Donald Love': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/donaldLove.jpg");
            break;
        case 'Jack Rodwell': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/rodwell.jpg");
            break;
        case 'Lee Cattermole': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/cattermole.jpg");
            break;
        case 'Sebastian Larsson': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/larsson.jpg");
            break;
        case 'Wahbi Khazri': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/khazri.jpg");
            break;
        case 'Adnan Januzaj': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/januzaj.jpg");
            break;
        case 'Fabio Borini': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/borini.jpg");
            break;
        case 'Duncan Watmore': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/watmore.jpg");
            break;
        case 'Jermain Defoe': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/defoe.jpg");
            break;
        case 'Steven Pienaar': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/pienaar.jpg");
            break;
        case 'Didier Ndong': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/ndong.jpg");
            break;
        case 'Lynden Gooch': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/gooch.jpg");
            break;
        case 'Victor Anichebe': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/anichebe.jpg");
            break;
        case 'Joel Asoro': $("#playerPicture").attr("src", "../../Players/PremierLeague/Sunderland/asoro.jpg");
            break;
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





