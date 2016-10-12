$(document).ready(function () {
    //$("iframe").attr("src", "http://www.skysports.com/manchester-united");
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
        'bProcessing': true,
        'bAutoWidth': true,
        'iDisplayLength': 5,
        'bJQueryUI': true,
        "aaData": [],
        "oLanguage": { "sEmptyTable": "No teams were found with the API provided" },
        "sDom": '<"H"lf<"clear-right"p>>rt<"F"ip>',
    });

    

    getPlayerData();
    getTeamLeagueStandingData();
    getPieChartStats();

   
    
});
/*
-----------------------------------------------------------------------------------------
                        Players Informations On The Team
-----------------------------------------------------------------------------------------
*/
function renderTeamPlayerData(result) {
    var DataArray = [];
    var imgList = "";
    var text;

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
                        this.wins,
                        this.losses,
                        this.draws,
                        this.points
            ]);
        }
        
    });

    function nextProject(name) {
        return DataArray[($.inArray(name, DataArray) + 1) % DataArray.length];
    }

    function prevProject(name) {
        return DataArray[($.inArray(name, DataArray) - 1 + DataArray.length) % DataArray.length];
    }

    /*
    var next = p[($.inArray(start, p) + 1) % p.length];
var prev = p[($.inArray(start, p) - 1 + p.length) % p.length];
        function nextProject(num) { 
        return p[($.inArray(num, p) + 1) % p.length]; 
        }
        function prevProject(num) { 
          return p[($.inArray(num, p) - 1 + p.length) % p.length];
        }
*/

    $('#teamStanding_tbl').dataTable().fnAddData(DataArray);
    $('#teamStanding_tbl').dataTable().fnAdjustColumnSizing();
}

function getTeamLeagueStandingData() {
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
function renderPieChartStatsData(result) {
    var DataArray = [];
    $.each(result.standing, function () {
        var name = "Manchester United FC";
        if (this.teamName == name) {
            DataArray.push([this.wins,
                        this.losses,
                        this.draws
            ]);
        }

    });
}

function getPieChartStats() {
    var DataArray = [];
    $.each(result.standing, function () {
        var name = "Manchester United FC";
        if (this.teamName == name) {
            DataArray.push([this.wins,
                        this.losses,
                        this.draws
            ]);
        }

    });
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/426/leagueTable',
        dataType: 'json',
        type: 'POST',
        data: {json: JSON.stringify(DataArray)},
    }).success(function (response) {
        $.plot($('#placeHolder'), DataArray, {
            series: {
                pie: {
                    show: true
                }
            },
            legend: {
                labelBoxBorderColor: "none"
            }
        });
    });
}






