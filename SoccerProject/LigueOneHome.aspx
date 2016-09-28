<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="LigueOneHome.aspx.cs" Inherits="SoccerProject.LigueOne" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div id="ligueOneBanner" class="jumbotron">
            <h1>Registered Ligue One Teams</h1>
            <p>France 2016 - 2017 Season</p>
            <br />
            <br />
        </div>
    </div>

    <div id="teamsID" class="row" style="align-content:center;">
        <!--__________________________________________________________________________________________________ -->

        <!--First Row Span -->
        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Arsenal.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/angersFC.jpg" width="100" height="100"  title="Click to see Anger FC players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Bournemouth.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)" >
                <img src="Content/TeamImages/LigueOne/bastiaFC.jpg" width="100" height="100" title="Click to see Bastia FC players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Burnley.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/bordeauxFC.jpg" width="100" height="100" title="Click to see Bordeaux FC players." />
                <br />
            </a>
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Chelsea.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/caenFC.jpg" width="100" height="100" title="Click to see Caen FC players." />
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
                <img src="Content/TeamImages/LigueOne/dijonFC.jpg" width="100" height="100" title="Click to see Dijon FC players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Everton.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/guingampFC.jpg" width="100" height="100" title="Click to see Guingamp FC players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/HullCity.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/lilleFC.jpg" width="100" height="100" title="Click to see Lille FC players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/LeicesterCity.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/lorientFC.jpg" width="100" height="100" title="Click to see Lorient FC players."/>
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
                <img src="Content/TeamImages/LigueOne/metzFC.jpg" width="100" height="100" title="Click to see Metz FC players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/ManCity.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/monacoFC.jpg" width="100" height="100" title="Click to see Monaco FC players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/ManUnited.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/montpellierFC.jpg" width="100" height="100" title="Click to see Montpellier FC players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Middlesbrough.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/nancyFC.jpg" width="100" height="100" title="Click to see Nancy FC players." />
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
                <img src="Content/TeamImages/LigueOne/nantesFC.jpg" width="100" height="100" title="Click to see Nantes FC players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Stoke_City.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/niceFC.jpg" width="100" height="100" title="Click to see Nice FC players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Sunderland.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/olympiqueLyonFC.jpg" width="100" height="100" title="Click to see Olympique Lyon players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/SwanseaCity.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/olympiqueMarseilleFC.jpg" width="100" height="100" title="Click to see Olympique Marseille FC players." />
            </a>
            <br />
        </div>

        <!--__________________________________________________________________________________________________ -->

        <!--Fifth Row Span -->

        <!--__________________________________________________________________________________________________ -->


        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Tottenham.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/PSG_FC.jpg" width="100" height="100" title="Click to see PSG players."/>
            </a>
            <br />

        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/Watford.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)" >
                <img src="Content/TeamImages/LigueOne/Rennes.jpg" width="100" height="100" title="Click to see Rennes FC players." />
            </a>
            <br />
            <br />
        </div>

        <br />
        <br />


        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/WestBrom.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/st_EtienneFC.jpg" width="100" height="100" title="Click to see West Brom players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/Premier_League_Teams/WestHam.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LigueOne/toulouseFC.jpg" width="100" height="100" title="Click to see West Ham    players." />
            </a>
            <br />
        </div>

    </div>
</asp:Content>
