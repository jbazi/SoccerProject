$(document).ready(function () {
    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://www.bbc.com/sport/football/teams/afc-bournemouth/rss.xml',
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
        'bFilter': false,
        "bPaginate": false,
        "bSort": false,
        "aaData": [],
    });

    getPieChartStats();
    getTeamFixtures();

    getPlayerData();
    getTeamLeagueStandingData();
    var userSelection = "Jack Wilshere";
    renderLoadedPlayers(userSelection);
    $('#playerInfo_tbl').hide();
    $("#managedBy").attr("src", "../../Players/PremierLeague/Bournemouth/howe.jpg");
    $("#managersName").html("Eddie Howe");
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
        url: 'http://api.football-data.org/v1/teams/1044/players',
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
        url: 'http://api.football-data.org/v1/teams/1044/players',
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
        url: 'http://api.football-data.org/v1/teams/57/fixtures',
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
        var name = "AFC Bournemouth";
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
            var name = "AFC Bournemouth";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/wilshere.jpg");
            break;
        case 'Nathan Aké': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/ake.jpg");
            break;
        case 'Jordon Ibe': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/ibe.jpg");
            break;
        case 'Lys Mousset': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/mousset.jpg");
            break;
        case 'Ryan Allsop': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/allsop.jpg");
            break;
        case 'Artur Boruc': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/boruc.jpg");
            break;
        case 'Adam Federici': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/federici.jpg");
            break;
        case 'Steve Cook': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/cook.jpg");
            break;
        case 'Tyrone Mings': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/mings.jpg");
            break;
        case 'Charlie Daniels': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/daniels.jpg");
            break;
        case 'Brad Smith': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/smith.jpg");
            break;
        case 'Simon Francis': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/francis.jpg");
            break;
        case 'Adam Smith': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/smith.jpg");
            break;
        case 'Lewis Cook': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/lewisCook.jpg");
            break;
        case 'Dan Gosling': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/gosling.jpg");
            break;
        case 'Andrew Surman': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/surman.jpg");
            break;
        case 'Harry Arter': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/arter.jpg");
            break;
        case 'Emerson Hyndman': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/hyndman.jpg");
            break;
        case 'Max Gradel': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/gradel.jpg");
            break;
        case 'Junior Stanislas': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/stanislas.jpg");
            break;
        case 'Marc Pugh': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/pugh.jpg");
            break;
        case 'Ryan Fraser': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/fraser.jpg");
            break;
        case 'Joshua King': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/king.jpg");
            break;
        case 'Benik Afobe': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/afobe.jpg");
            break;
        case 'Callum Wilson': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/wilson.jpg");
            break;
        case 'Lewis Grabban': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/grabban.jpg");
            break;
        case 'Marc Wilson': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/marcWilson.jpg");
            break;
        case 'Jack Wilshere': $("#playerPicture").attr("src", "../../Players/PremierLeague/Bournemouth/wilshere.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





