﻿$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    $('#teamRssFeed').FeedEk({
        FeedUrl: 'http://newsrss.bbc.co.uk/rss/sportonline_uk_edition/football/teams/m/arsenal/rss.xml',
    });
    $("#latestNews").html("Latest Team News");
    
    $('#teamNews').text('Current Arsenal Form');
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
    $("#managedBy").attr("src", "../../Players/PremierLeague/Arsenal/wenger.jpg");
    $("#managersName").html("Arsene Wenger");
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
        url: 'http://api.football-data.org/v1/teams/57/players',
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
        url: 'http://api.football-data.org/v1/teams/57/players',
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
        var name = "Arsenal FC";
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
        if ($(this).text() === 'Arsenal FC')
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
            var name = "Arsenal FC";
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
        case 'Choose A Player': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/ozil.jpg");
            break;
        case 'Mathieu Debuchy': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/debuchy.jpg");
            break;
        case 'Yaya Sanogo': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/sanogo.jpg");
            break;
        case 'Shkodran Mustafi': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/mustafi.jpg");
            break;
        case 'Granit Xhaka': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/xhaka.jpg");
            break;
        case 'Petr Cech': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/cech.jpg");
            break;
        case 'David Ospina': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/ospina.jpg");
            break;
        case 'Emiliano Martínez': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/martinez.jpg");
            break;
        case 'Laurent Koscielny': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/koscielny.jpg");
            break;
        case 'Gabriel Paulista': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/gabriel.jpg");
            break;
        case 'Per Mertesacker': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/mertesacker.jpg");
            break;
        case 'Rob Holding': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/holding.jpg");
            break;
        case 'Nacho Monreal': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/monreal.jpg");
            break;
        case 'Kieran Gibbs': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/gibbs.jpg");
            break;
        case 'Héctor Bellerín': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/bellerin.jpg");
            break;
        case 'Carl Jenkinson': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/jenkinson.jpg");
            break;
        case 'Francis Coquelin': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/coquelin.jpg");
            break;
        case 'Mohamed Elneny': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/elneny.jpg");
            break;
        case 'Aaron Ramsey': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/ramsey.jpg");
            break;
        case 'Santi Cazorla': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/cazorla.jpg");
            break;
        case 'Mesut Özil': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/ozil.jpg");
            break;
        case 'Alex Iwobi': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/iwobi.jpg");
            break;
        case 'Alex Oxlade-Chamberlain': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/chamberlain.jpg");
            break;
        case 'Alexis Sánchez': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/alexis.jpg");
            break;
        case 'Theo Walcott': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/walcott.jpg");
            break;
        case 'Olivier Giroud': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/giroud.jpg");
            break;
        case 'Danny Welbeck': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/welbeck.jpg");
            break;
        case 'Chuba Akpom': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/akpom.jpg");
            break;
        case 'Lucas Pérez': $("#playerPicture").attr("src", "../../Players/PremierLeague/Arsenal/perez.jpg");
            break;
        default: $('#selectPlayer').val();
            break;
    }

}





