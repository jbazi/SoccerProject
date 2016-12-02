$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://newsrss.bbc.co.uk/rss/sportonline_uk_edition/football/teams/m/man_utd/rss.xml',
    });
    $('#latestNews').text('Latest Team News');
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
    var userSelection = "Paul Pogba";
    renderLoadedPlayers(userSelection);
    $('#playerInfo_tbl').hide();
    $("#managedBy").attr("src", "../../Players/PremierLeague/ManchesterUnited/joseM.jpg");
    $("#managersName").html("Jose Mourinho");
    $("#fullLeague_btn").on('click', function () {
        window.location = "../../Leagues/PremierLeague.aspx";
    });
    
});

/*
-----------------------------------------------------------------------------------------
                        Rough Draft Informations On The Team
-----------------------------------------------------------------------------------------
*/

function renderLoadedPlayers(userSelection)
{
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
        url: 'http://api.football-data.org/v1/teams/66/players',
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
    
    $('#myTable').dataTable().fnAddData(DataArray);
    $('#myTable').dataTable().fnAdjustColumnSizing();
}

function getPlayerData() {
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/teams/66/players',
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
    $('#teamFixtures').dataTable().fnAddData(lastFour);
    $('#teamFixtures').dataTable().fnAdjustColumnSizing();

    $.each(result.fixtures, function () {
        var status1 = "TIMED"; var status2 = "POSTPONED"; var status3 = "SCHEDULED";
        var verses = "v";
        if (this.status == status1 || this.status == status2 || this.status == status3 ) {
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
        url: 'http://api.football-data.org/v1/teams/66/fixtures',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        renderTeamFixtures(response);
    });
}

function renderTeamLeagueStandingData(result) {
    var DataArray = [];
    var position,sum;

    $.each(result.standing, function (index) {
        var name = "Manchester United FC";
        var firstPrev,secondPrev,firstNext,secondNext,link;
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
        if ($(this).text() === 'Manchester United FC')
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
            var name = "Manchester United FC";
            if (this.teamName == name) {
                position = index+1;
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Pogba.jpg");
            break;
        case 'Paul Pogba': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Pogba.jpg");
            break;
        case 'Zlatan Ibrahimovic': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Ibrahimovic.jpg");
            break;
        case 'Eric Bailly': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Bailey.jpg");
            break;
        case 'Henrikh Mkhitaryan': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Mkhitaryan.jpg");
            break;
        case 'David de Gea': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/DeGea.jpg");
            break;
        case 'Sergio Romero': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Romero.jpg");
            break;
        case 'Sam Johnstone': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/johnston.jpg");
            break;
        case 'Daley Blind': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Blind.jpg");
            break;
        case 'Chris Smalling': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Smalling.jpg");
            break;
        case 'Marcos Rojo': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Rojo.jpg");
            break;
        case 'Phil Jones': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Jones.jpg");
            break;
        case 'Luke Shaw': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Shaw.jpg");
            break;
        case 'Matteo Darmian': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/darmian.jpg");
            break;
        case 'Antonio Valencia': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/valencia.jpg");
            break;
        case 'Morgan Schneiderlin': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/schneiderlin.jpg");
            break;
        case 'Michael Carrick': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Carrick.jpg");
            break;
        case 'Timothy Fosu-Mensah': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/fosuMensah.jpg");
            break;
        case 'Ander Herrera': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Herrera.jpg");
            break;
        case 'Marouane Fellaini': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/fellaini.jpg");
            break;
        case 'Bastian Schweinsteiger': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/schweinsteiger.jpg");
            break;
        case 'Juan Mata': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Mata.jpg");
            break;
        case 'Memphis Depay': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Memphis.jpg");
            break;
        case 'Ashley Young': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Young.jpg");
            break;
        case 'Jesse Lingard': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Lingard.jpg");
            break;
        case 'Wayne Rooney': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Rooney.jpg");
            break;
        case 'Marcus Rashford': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Rashford.jpg");
            break;
        case 'Anthony Martial': $("#playerPicture").attr("src", "../../Players/PremierLeague/ManchesterUnited/Martial.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





