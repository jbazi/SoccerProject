$(document).ready(function () {
    $("#myTable").dataTable({
        'bProcessing': true,
        'bAutoWidth': true,
        'iDisplayLength': 10,
        'bJQueryUI': true,
        "aaData": [],
        "oLanguage": { "sEmptyTable": "No teams were found with the API provided" },
        "sDom": '<"H"lf<"clear-right"p>>rt<"F"ip>',
    });

    getData();

});

function getData() {
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/?season=2016',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        renderData(response);
    });
}

function renderData(result) {
    var DataArray = [];
    $.each(result, function () {
        /*
            eu2016  = European Championship France 2016
            plID    = Premier League 2016/17
            lalgID   = Primer Division 2016/17
            blID    = Bundesliga 2016/17
            lgoneID = Ligue 1 2016/17
        */
        var euroID = 424, plID = 426, lalgID=436, blID=430, lgoneID = 434;
        if (this.id == euroID || this.id == plID || this.id == lalgID || this.id == blID || this.id == lgoneID) {
            DataArray.push([this.caption, this.numberOfTeams, this.numberOfGames]);
        }
    });

    $('#myTable').dataTable().fnAddData(DataArray);
    $('#myTable').dataTable().fnAdjustColumnSizing();
}

function clicks() {

}

