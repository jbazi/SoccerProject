$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://www.ligue1.com/ligue1/rss.xml',
    });
    $("#latestNews").html("Ligue One News");

    $('#teamNews').text('Current Form');
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
    $("#managedBy").attr("src", "../../Players/LigueOne/SM_Caen/patrice.jpg");
    $("#managersName").html("GARANDE Patrice");
    $("#fullLeague_btn").on('click', function () {
        window.location = "../../Leagues/LigueOne.aspx";
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
        url: 'http://api.football-data.org/v1/teams/514/players',
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
        var datePretty = monthNames[rawDate.getMonth()] + ", " + (rawDate.getDate()) + " " + rawDate.getFullYear();
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
        url: 'http://api.football-data.org/v1/teams/514/players',
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
            var datePretty = days[rawDate.getDay()] + " " + monthNames[rawDate.getMonth()] + " " + (rawDate.getDate()) + ",  " + rawDate.getFullYear();
            prevResults.push([this.homeTeamName, this.result.goalsHomeTeam, datePretty, this.result.goalsAwayTeam, this.awayTeamName]);
        }
    });
    var lastFour = prevResults.slice(-4);
    $('#teamPrevResults').dataTable().fnAddData(lastFour);
    $('#teamPrevResults').dataTable().fnAdjustColumnSizing();

    $.each(result.fixtures, function () {
        var status1 = "TIMED"; var status2 = "POSTPONED"; var status3 = "SCHEDULED";
        var verses = "vs";
        if (this.status == status1 || this.status == status2 || this.status == status3) {
            var rawDate = new Date(this.date);
            var datePretty = days[rawDate.getDay()] + " " + monthNames[rawDate.getMonth()] + " " + (rawDate.getDate()) + ",  " + rawDate.getFullYear();
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
        url: 'http://api.football-data.org/v1/teams/514/fixtures',
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
        var name = "SM Caen";
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
        if ($(this).text() === 'SM Caen')
            $(this).parent().css('background-color', '#E86118', '!important');
    });
}

function getTeamLeagueStandingData() {
    var DataArray = [];
    var position;
    var next;
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/434/leagueTable',
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
        url: 'http://api.football-data.org/v1/competitions/434/leagueTable',
        dataType: 'json',
        cache: false, //add this
        async: false,
        type: 'GET',
    }).done(function (result) {
        $.each(result.standing, function (index) {
            var name = "SM Caen";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/ivan.jpg");
            break;
        case 'Romain Genevois': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/romain.jpg");
            break;
        case 'Chaker Alhadhur': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/chaker.jpg");
            break;
        case 'Vincent Bessat': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/vincent.jpg");
            break;
        case 'Jonathan Delaplace': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/jonathan.jpg");
            break;
        case 'Ronny Rodelin': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/ronny.jpg");
            break;
        case 'Ismaël Diomandé': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/ismael.jpg");
            break;
        case 'Rémy Vercoutre': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/remy.jpg");
            break;
        case 'Paul Reulet': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/paul.jpg");
            break;
        case 'Damien Da Silva': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/silva.jpg");
            break;
        case 'Alaeddine Yahia': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/yahia.jpg");
            break;
        case 'Emmanuel Imorou': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/imorou.jpg");
            break;
        case 'Jordan Adéoti': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/jordan.jpg");
            break;
        case 'Nicolas Seube': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/nicolas.jpg");
            break;
        case 'Nicolas Maurice-Belay': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/nicolas.jpg");
            break;
        case 'Julien Féret': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/julien.jpg");
            break;
        case 'Hervé Bazile': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/herve.jpg");
            break;
        case 'Mouhamadou Dabo': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/dabo.jpg");
            break;
        case 'Steed Malbranque': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/steed.jpg");
            break;
        case 'Matthieu Dreyer': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/matthieu.jpg");
            break;
        case 'Louis Deschateaux': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/louis.jpg");
            break;
        case 'Syam Ben Youssef': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/syam.jpg");
            break;
        case 'Jordan Leborgne': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/leborgne.jpg");
            break;
        case 'Jean-Victor Makengo': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/jean.jpg");
            break;
        case "Jordan N'Kololo": $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/mauro.jpg");
            break;
        case 'Jeff Louis': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/jeff.jpg");
            break;
        case 'Pape Sané': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/pape.jpg");
            break;
        case 'Yann Karamoh': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/yann.jpg");
            break;
        case 'Valentin Voisin': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/valentin.jpg");
            break;
        case 'Ivan Santini': $("#playerPicture").attr("src", "../../Players/LigueOne/SM_Caen/ivan.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





