/// <reference path="C:\My_2016_Portfolio\SoccerProject\SoccerProject\Leagues/PremierLeague.aspx" />
$(document).ready(function () {
    $("#manU_Feed").attr("src", "../manU_RssFeed.html");
    $("#myTable").dataTable({
        'bProcessing': true,
        'bAutoWidth': true,
        'iDisplayLength': 5,
        'bJQueryUI': true,
        "aaData": [],
        "oLanguage": { "sEmptyTable": "No teams were found with the API provided" },
        "sDom": '<"H"lf<"clear-right"p>>rt<"F"ip>',
    });

    $("#teamStanding_tbl").dataTable({
        'bFilter': false,
        "bPaginate": false,
        "aaData": [],
    });

    getPieChartStats();
    getPlayerData();
    getTeamLeagueStandingData();

    $("#fullLeague_btn").on('click', function () {
        window.location = "..Leagues/PremierLeague.aspx";
    });
    
});
/*
-----------------------------------------------------------------------------------------
                        Players Informations On The Team
-----------------------------------------------------------------------------------------
*/
function renderTeamPlayerData(result) {
    var DataArray = [];

    $.each(result.players, function () {
        DataArray.push([this.name,
                        this.position,
                        this.jerseyNumber,
                        this.nationality,
                        this.contractUntil
        ]);
    });
    //(imgList += '<li><img src= "' + this.crestUrl + '"></li>')
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
function renderTeamLeagueStandingData(result) {
    var DataArray = [];
    $.each(result.standing, function () {
        var name = "Manchester United FC";
        var index = 0;
        var prev,next;
        if (this.teamName == name) {
            next = DataArray[++index];
            prev = DataArray[--index];
            DataArray.push([this.position,
                        this.teamName,
                        this.playedGames,
                        this.points
            ]);
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

    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/426/leagueTable',
        dataType: 'json',
        cache: false, //add this
        async: false,
        type: 'GET',
    }).done(function (result) {
        $.each(result.standing, function () {
            var name = "Manchester United FC";
            if (this.teamName == name) {
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





