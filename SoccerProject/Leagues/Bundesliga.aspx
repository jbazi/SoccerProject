<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/League.Master" AutoEventWireup="true" CodeBehind="Bundesliga.aspx.cs" Inherits="SoccerProject.Leagues.Bundesliga" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Bundesliga</title>
    <script src="../Scripts/jquery-1.9.1.min.js"></script>
    <script src="../Scripts/jquery-3.1.0.min.js"></script>
    <script src="../Scripts/League_Scripts/bundesliga.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">

        <div class="jumbotron">
            <h1><span>
                <img id="trophy" src="../Content/trophies/trophy4.png" /></span>Bundesliga</h1>
            <p>Germany 2016 - 2017 Season</p>
        </div>
    </div>
    <div class="container">
        <div class="dropdown" style="float: right;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                Select Your Team
   
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a href="../../Teams/Bundesliga_Teams/Bayer_Leverkusen.aspx">Bayer Leverkusen</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Bayern_Munich.aspx">Bayern Munich</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Bor_Monch.aspx">Bor. Mönchengladbach</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Borussia_Dortmund.aspx">Borussia Dortmund</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/FC_Augsburg.aspx">FC Augsburg</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/FC_Ingolstadt.aspx">FC Ingolstadt 04</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/FC_Koln.aspx">1. FC Köln</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/FC_Mainz.aspx">1. FSV Mainz 05</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/FC_Schalke.aspx">FC Schalke 04</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Frankfurt.aspx">Eintracht Frankfurt</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Hertha.aspx">Hertha BSC</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Hoffenheim.aspx">TSG 1899 Hoffenheim</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Leipzig.aspx">Red Bull Leipzig</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/SC_Freiburg.aspx">SC Freiburg</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/SV_Darmstadt.aspx">SV Darmstadt 98</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/SV_Hamburger.aspx">Hamburger SV</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Weder_Bremen.aspx">Werder Bremen</a></li>
                <li><a href="../../Teams/Bundesliga_Teams/Wolfsburg.aspx">VfL Wolfsburg</a></li>
            </ul>
        </div>
    </div>
</asp:Content>
