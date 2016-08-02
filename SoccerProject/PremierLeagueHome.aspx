<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="PremierLeagueHome.aspx.cs" Inherits="SoccerProject.PremierLeagueHome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1>Premier League</h1>
            <p>England 2016 - 2017 Season</p>

            <p>Click on your favorite club below, to see the list of players.</p>
        </div>
    </div>

    <div id="teamsID" class="row">
        <!--__________________________________________________________________________________________________ -->

        <!--First Row Span -->
        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Arsenal.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/Arsenal.jpg" width="100" height="100"  title="Click to see Arsenal players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Bournemouth.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)" >
                <img src="Content/TeamImages/EPL/Bournemouth.jpg" width="100" height="100" title="Click to see Bournemouth players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Burnley.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/Burnley.jpg" width="100" height="100" title="Click to see Burnley players." />
                <br />
            </a>
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Chelsea.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/chelsea.jpg" width="100" height="100" title="Click to see Chelsea players." />
            </a>
            <br />
        </div>
        <br />
        <br />
        <!--__________________________________________________________________________________________________ -->

        <!--Second Row Span -->
        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/CrystalPalace.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)" >
                <img src="Content/TeamImages/EPL/crystal_palace.jpg" width="100" height="100" title="Click to see Crystal Palace players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Everton.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/Everton.jpg" width="100" height="100" title="Click to see Everton players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/HullCity.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/Hull_City.jpg" width="100" height="100" title="Click to see Hull City players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/LeicesterCity.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/Leicester.jpg" width="100" height="100" title="Click to see Leicester City players."/>
            </a>
            <br />
        </div>

        <br />
        <br />

        <!--__________________________________________________________________________________________________ -->

        <!--Third Row Span -->
        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Liverpool.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/liverpool.jpg" width="100" height="100" title="Click to see Liverpool players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/ManCity.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/mancity.jpg" width="100" height="100" title="Click to see Manchester City players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/ManUnited.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/ManU.jpg" width="100" height="100" title="Click to see Manchester United players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Middlesbrough.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/Middlesbrough.jpg" width="100" height="100" title="Click to see Middlesbrough players." />
            </a>
            <br />
        </div>

        <br />
        <br />

        <!--__________________________________________________________________________________________________ -->

        <!--Fourth Row Span -->
        <!--__________________________________________________________________________________________________ -->


        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Southampton.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/southampton.jpg" width="100" height="100" title="Click to see Southampton players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Stoke_City.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/stokeCity.jpg" width="100" height="100" title="Click to see Stoke City players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Sunderland.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/sunderland.jpg" width="100" height="100" title="Click to see Sunderland players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/SwanseaCity.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/swanseaCity.jpg" width="100" height="100" title="Click to see Swansea City players." />
            </a>
            <br />
        </div>

        <!--__________________________________________________________________________________________________ -->

        <!--Fifth Row Span -->

        <!--__________________________________________________________________________________________________ -->


        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Tottenham.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/Tottenham.jpg" width="100" height="100" title="Click to see Tottenham players."/>
            </a>
            <br />

        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Watford.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)" >
                <img src="Content/TeamImages/EPL/watford.jpg" width="100" height="100" title="Click to see Watford players." />
            </a>
            <br />
            <br />
        </div>

        <br />
        <br />


        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/WestBrom.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/westBrom.jpg" width="100" height="100" title="Click to see West Brom players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/WestHam.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/EPL/westHam.jpg" width="100" height="100" title="Click to see West Ham    players." />
            </a>
            <br />
        </div>

    </div>
</asp:Content>
