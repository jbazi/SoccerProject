<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="BundesligaHome.aspx.cs" Inherits="SoccerProject.BundesligaHome" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div id="bundesligaBanner" class="jumbotron">
            <h1>Registered Bundesliga Teams</h1>
            <p>Germany 2016 - 2017 Season</p>
            <br />
            <br />
        </div>
    </div>
    <div id="teamsID" class="row" style="align-content:center;">
        <!--__________________________________________________________________________________________________ -->

        <!--First Row Span -->
        <!--__________________________________________________________________________________________________ -->
       
        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Arsenal.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/augsburgFC.jpg" width="100" height="100"  title="Click to see Augsburg FC players." />
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Bournemouth.aspx" target="_blank"  >
                <img src="Content/TeamImages/Bundesliga/bayerLeverkusen.jpg" width="100" height="100" title="Click to see Bayer Leverkusen players."/>
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Burnley.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/bayernMunichFC.jpg" width="100" height="100" title="Click to see Bayern Munich players." />
                <br />
            </a>
        </div>
        <br />
        <br />
        <!--__________________________________________________________________________________________________ -->

        <!--Second Row Span -->
        <!--__________________________________________________________________________________________________ -->
        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Chelsea.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/borussiaDortmund.jpg" width="100" height="100" title="Click to see Borussia Dortmund players." />
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Chelsea.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/borussiaMonchengladbach.jpg" width="100" height="100" title="Click to see Borussia Monchegladbach players." />
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Bundesliga_Teams/FC_Koln.aspx" target="_blank"  >
                <img src="Content/TeamImages/Bundesliga/cologneFC.jpg" width="100" height="100" title="Click to see FC Köln players." />
            </a>
            <br />
        </div>
        <br />
        <br />

        <!--__________________________________________________________________________________________________ -->

        <!--Third Row Span -->
        <!--__________________________________________________________________________________________________ -->
        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Everton.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/eintrachtFrankfurt.jpg" width="100" height="100" title="Click to see Eintracht Frankfurt players."/>
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/HullCity.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/FC_Ingolstadt04.jpg" width="100" height="100" title="Click to see FC Ingolstadt FC players."/>
            </a>
            <br />
        </div>


        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/LeicesterCity.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/FC_Schalke.jpg" width="100" height="100" title="Click to see FC Schalke players."/>
            </a>
            <br />
        </div>
        <br />
        <br />

        <!--__________________________________________________________________________________________________ -->

        <!--Fourth Row Span -->
        <!--__________________________________________________________________________________________________ -->
         <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Liverpool.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/hamburgFC.jpg" width="100" height="100" title="Click to see Humburg FC players."/>
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/ManCity.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/herthBerlinFC.jpg" width="100" height="100" title="Click to see Herth Berlin FC players."/>
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/ManUnited.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/hoffenheim.jpg" width="100" height="100" title="Click to see Hoffenheim FC players." />
            </a>
            <br />
        </div>
        <br />
        <br />
        <!--__________________________________________________________________________________________________ -->

        <!--Fifth Row Span -->

        <!--__________________________________________________________________________________________________ -->
        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Middlesbrough.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/mainzFC.jpg" width="100" height="100" title="Click to see 1. FSV Mainz 05 players." />
            </a>
            <br />
        </div>


        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Southampton.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/rbLeipzigFC.jpg" width="100" height="100" title="Click to see RB Leipzig players." />
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Stoke_City.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/scFreiburg.jpg" width="100" height="100" title="Click to see SC Freiburg players." />
            </a>
            <br />
        </div>
        <br />
        <br />
        <!--__________________________________________________________________________________________________ -->

        <!--Sixth Row Span -->

        <!--__________________________________________________________________________________________________ -->
        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Sunderland.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/svDarmstadt98.jpg" width="100" height="100" title="Click to see SV Darmstadt98 players."/>
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/SwanseaCity.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/werderBremen.jpg" width="100" height="100" title="Click to see Werder Bremen players." />
            </a>
            <br />
        </div>

        <div class="col-md-4">
            <a href="Teams/Premier_League_Teams/Tottenham.aspx" target="_blank" >
                <img src="Content/TeamImages/Bundesliga/wolfsburgFC.jpg" width="100" height="100" title="Click to see Wolfsburg players."/>
            </a>
            <br />

        </div>
        <br />
        <br />

    </div>
</asp:Content>
