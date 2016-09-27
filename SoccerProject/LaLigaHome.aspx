<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="LaLigaHome.aspx.cs" Inherits="SoccerProject.LaLigaHome" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function windowpop(url, width, height) {
            var leftPosition, topPosition;
            //Allow for borders.
            leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
            //Allow for title and status bars.
            topPosition = (window.screen.height / 2) - ((height / 2) + 50);
            //Open the window.
            window.open(url, "Window2", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div id="laLigaBanner" class="jumbotron">
            <h1>La Liga</h1>
            <p>Spanish 2016 - 2017 Season</p>
        </div>
    </div>

    <div id="teamsID" class="row">
        <!--__________________________________________________________________________________________________ -->

        <!--First Row Span -->
        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/Alaves.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/Alaves.jpg" width="100" height="100"  title="Click to see Deportivo Alavés players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/AtleticoBilbao.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)" >
                <img src="Content/TeamImages/LaLiga/atleticoBilbao.jpg" width="100" height="100" title="Click to see Atletico Bilbao players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/AtleticoDeMadrid.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/atleticoMadrid.jpg" width="100" height="100" title="Click to see Atletico Madrid players." />
                <br />
            </a>
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/Barcelona.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/barcelona.jpg" width="100" height="100" title="Click to see Barcelona players." />
            </a>
            <br />
        </div>

        <!--__________________________________________________________________________________________________ -->

        <!--Second Row Span -->
        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/CeltaVigo.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)" >
                <img src="Content/TeamImages/LaLiga/celtaVigo.jpg" width="100" height="100" title="Click to see Celta Vigo players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/DeportivoLaCoruna.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/deportivoLaCoruna.jpg" width="100" height="100" title="Click to see Derpotivo La Coruna players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/SdEibar.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/eibar.jpg" width="100" height="100" title="Click to see Eibar players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/Espanyol.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/espanyol.jpg" width="100" height="100" title="Click to see Espanyol players."/>
            </a>
            <br />
        </div>

        <!--__________________________________________________________________________________________________ -->
        <!--Third Row Span -->
        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/Granada.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/grananda.jpg" width="100" height="100" title="Click to see Grananda players."/>
            </a>
            <br />
        </div>
        
        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/LasPalmas.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/lasPalmas.jpg" width="100" height="100" title="Click to see Las Palmas players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="#" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/leganes.jpg" width="100" height="100" title="Click to see Leganes players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/Malaga.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/malaga.jpg" width="100" height="100" title="Click to see Málaga CF players." />
            </a>
            <br />
        </div>

        <!--__________________________________________________________________________________________________ -->
        
        <!--Fourth Row Span -->
        
        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="#" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/osasuna.jpg" width="100" height="100" title="Click to see Osasuna players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/RealBetis.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/realBetis.jpg" width="100" height="100" title="Click to see Real Betis players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/RealMadrid.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/realMadrid.jpg" width="100" height="100" title="Click to see Real Madrid players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/RealSociedad.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/realSociedad.jpg" width="100" height="100" title="Click to see Real Sociedad players." />
            </a>
            <br />
        </div>

        <!--__________________________________________________________________________________________________ -->

        <!--Fifth Row Span -->

        <!--__________________________________________________________________________________________________ -->

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/Sevilla.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/sevilla.jpg" width="100" height="100" title="Click to see Sevilla players."/>
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/SportingGijon.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)" >
                <img src="Content/TeamImages/LaLiga/sportingGijon.jpg" width="100" height="100" title="Click to see Sporting Gijon players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/Valencia.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/valencia.jpg" width="100" height="100" title="Click to see Valencia players." />
            </a>
            <br />
        </div>

        <div class="col-md-3">
            <a href="Teams/La_Liga_Teams/Villarreal.aspx" target="_blank" onclick="return windowpop(this.href, 600, 600)">
                <img src="Content/TeamImages/LaLiga/villareal.jpg" width="100" height="100" title="Click to see Villareal players." />
            </a>
            <br />
        </div>

    </div>
</asp:Content>
