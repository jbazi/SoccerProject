$(document).ready(function () {
    $("#leagueTable").dataTable({
        "bInfo" : false,
        'bFilter': false,
        "bPaginate": false,
        "bSort": false,
        "aaData": [],
    });

    getData();
});

function getData() {
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/426/leagueTable',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        renderData(response);
    });
}

function renderData(result) {
    var DataArray = [];
    $.each(result.standing, function () {
        DataArray.push([this.position,
                        this.teamName,
                        this.playedGames,
                        this.wins,
                        this.draws,
                        this.losses,
                        this.goals,
                        this.goalsAgainst,
                        this.goalDifference,
                        this.points
        ]);
    });

    $('#leagueTable').dataTable().fnAddData(DataArray);
    $('#leagueTable').dataTable().fnAdjustColumnSizing();
}

