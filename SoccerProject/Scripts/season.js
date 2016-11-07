$(document).ready(function () {
    getData();
    $('#england').show("slide", { direction: "left" });

});

function getData() {
    var englandArray = [];
    var franceArray = [];
    var germanyArray = [];
    var spainArray = [];
    var plID = 426, lalgID = 436, blID = 430, lgoneID = 434;
    $.ajax({
        headers: { 'X-Auth-Token': 'e4a0c71e6e9f4981b9706379992f468a' },
        url: 'http://api.football-data.org/v1/competitions/?season=2016',
        dataType: 'json',
        type: 'GET',
    }).done(function (result) {
        $.each(result, function () {
            if (this.id == plID) {
                englandArray.push(this.numberOfGames, this.numberOfTeams);
                $('#ENGnumOfGames').html(englandArray[0]);
                $('#ENGnumOfTeams').html(englandArray[1]);
            }
            if (this.id == lalgID) {
                spainArray.push(this.numberOfGames, this.numberOfTeams);
                $('#FRnumOfGames').html(spainArray[0]);
                $('#FRnumOfTeams').html(spainArray[1]);
            }
            if (this.id == blID) {
                germanyArray.push(this.numberOfGames, this.numberOfTeams);
                $('#GMYnumOfGames').html(germanyArray[0]);
                $('#GMYnumOfTeams').html(germanyArray[1]);
            }
            if (this.id == lgoneID) {
                franceArray.push(this.numberOfGames, this.numberOfTeams);
                $('#SPNnumOfGames').html(franceArray[0]);
                $('#SPNnumOfTeams').html(franceArray[1]);
            }
        });
    });
}

/*
function renderData(result) {
    
    $.each(result, function () {
        
            eu2016  = European Championship France 2016
            plID    = Premier League 2016/17
            lalgID   = Primer Division 2016/17
            blID    = Bundesliga 2016/17
            lgoneID = Ligue 1 2016/17
        
        var plID = 426, lalgID = 436, blID = 430, lgoneID = 434;

        if (this.id == plID || this.id == lalgID || this.id == blID || this.id == lgoneID) {
            var link;
            if (this.id == plID) {
                link = "<a id='plLeagueAnchor' style='color:white;' href='../PremierLeagueHome.aspx'  + target=_blank + title='Navigate to Premier League Home'>" + this.caption + "</a>";
                $(".numOfGames").html(this.numberOfGames);
                $(".numOfTeams").html(this.numberOfTeams);
            }
            else if (this.id == lalgID) {
                link = "<a id='laLigaAnchor' style='color:white;' href='../LaLigaHome.aspx' target=_blank + title='Navigate to La Liga Home'>" + this.caption + "</a>";
                $(".numOfGames").html(this.numberOfGames);
                $(".numOfTeams").html(this.numberOfTeams);
            }
            else
                link = this.caption;
            DataArray.push([link, this.numberOfTeams, this.numberOfGames]);
        }    
    });


}
*/


