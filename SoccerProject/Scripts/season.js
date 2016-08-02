$(document).ready(function () {
    $("#myTable").dataTable({
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            // Bold the grade for all 'A' grade browsers
            if (aData[426] === "Premier League 2016/17")
            {
                $('td:eq(426)', nRow).html('<a href="../PremierLeagueHome.aspx">Premier League 2016/17</a>');
            }
        },
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
        var plID = 426, lalgID=436, blID=430, lgoneID = 434;
        if (this.id == plID || this.id == lalgID || this.id == blID || this.id == lgoneID) {
            var link;
            if (this.id == plID) {
                link = "<a href='../PremierLeagueHome.aspx'  + target=_blank + title='Navigate to Premier League Home'>" + this.caption + "</a>";
            }
            else if (this.id == lalgID) {
                link = "<a href='../LaLigaHome.aspx' target=_blank + title='Navigate to La Liga Home'>" + this.caption + "</a>";

            }
            else
                link = this.caption;
            DataArray.push([link, this.numberOfTeams, this.numberOfGames]);
        }
            
    });

    $('#myTable').dataTable().fnAddData(DataArray);
    $('#myTable').dataTable().fnAdjustColumnSizing();


}


