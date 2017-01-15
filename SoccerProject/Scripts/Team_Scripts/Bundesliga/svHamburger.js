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
    $("#managedBy").attr("src", "../../Players/Bundesliga/SV_Hamburger/markus.jpg");
    $("#managersName").html("<strong>Markus Gisdol</strong>");
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
        url: 'http://api.football-data.org/v1/teams/7/players',
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
        url: 'http://api.football-data.org/v1/teams/7/players',
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
        url: 'http://api.football-data.org/v1/teams/7/fixtures',
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
        var name = "Hamburger SV";
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
        if ($(this).text() === 'Hamburger SV')
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
            var name = "Hamburger SV";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/bobby.jpg");
            break;
        case 'Tom Mickel': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/tom.jpg");
            break;
        case 'Bobby Wood': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/bobby.jpg");
            break;
        case 'Luca Waldschmidt': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/gian.jpg");
            break;
        case 'Filip Kostic': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/filip.jpg");
            break;
        case 'René Adler': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/adler.jpg");
            break;
        case 'Andreas Hirzel': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/hirzel.jpg");
            break;
        case 'Johan Djourou': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/johan.jpg");
            break;
        case 'Cléber Reis': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/cleber.jpg");
            break;
        case 'Emir Spahic': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/emir.jpg");
            break;
        case 'Matthias Ostrzolek': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/matthias.jpg");
            break;
        case 'Dennis Diekmeier': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/dennis.jpg");
            break;
        case 'Gotoku Sakai': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/sakai.jpg");
            break;
        case 'Ashton Götz': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/ashton.jpg");
            break;
        case 'Gideon Jung': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/jung.jpg");
            break;
        case 'Finn Porath': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/finn.jpg");
            break;
        case 'Albin Ekdal': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/albin.jpg");
            break;
        case 'Lewis Holtby': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/lewsi.jpg");
            break;
        case 'Aaron Hunt': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/hunt.jpg");
            break;
        case 'Nicolai Müller': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/nicolai.jpg");
            break;
        case 'Michael Gregoritsch': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/michael.jpg");
            break;
        case 'Pierre-Michel Lasogga': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/sogga.jpg");
            break;
        case 'Christian Mathenia': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/christian.jpg");
            break;
        case 'Dren Feka': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/dren.jpg");
            break;
        case 'Nabil Bahoui': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/nabil.jpg");
            break;
        case 'Alen Halilovic': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/alen.jpg");
            break;
        case 'Young-Jae Seo': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/seo.jpg");
            break;
        case 'Frank Ronstadt': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/frank.jpg");
            break;
        case 'Mats Köhlert': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/mats.jpg");
            break;
        case 'Bakery Jatta': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/jatta.jpg");
            break;
        case 'Douglas Santos': $("#playerPicture").attr("src", "../../Players/Bundesliga/SV_Hamburger/douglas.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





