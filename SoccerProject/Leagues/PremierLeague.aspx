<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/League.Master" AutoEventWireup="true" CodeBehind="PremierLeague.aspx.cs" Inherits="SoccerProject.Leagues.PremierLeague" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Premier League</title>
    <script src="../Scripts/jquery-3.1.0.min.js"></script>
    <script src="../Scripts/League_Scripts/premierLeague.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">

            <h1><span><img id="trophy" src="../Content/trophies/eplTrophy.jpg" /></span>Premier League</h1>
            <p>England 2016 - 2017 Season</p>
        </div>
    </div>
    <div class="container">
  <div class="dropdown" style="float:right;">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Your Team
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      <li><a href="../../Teams/Premier_League_Teams/Arsenal.aspx">Arsenal FC</a></li>
      <li><a href="../../Teams/Premier_League_Teams/Bournemouth.aspx">Bournemouth FC</a></li>
      <li><a href="../../Teams/Premier_League_Teams/Burnley.aspx">Burnely FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Chelsea.aspx">Chelsea FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/CrystalPalace.aspx">Crystal Palace FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Everton.aspx">Everton FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/HullCity.aspx">Hull City FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/LeicesterCity.aspx">Leicester FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Liverpool.aspx">Liverpool FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/ManCity.aspx">Man City FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/ManUnited.aspx">Man United FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Middlesbrough.aspx">Middlesbrough FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Southampton.aspx">Southampton FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Stoke_City.aspx">Stoke City FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/SwanseaCity.aspx">Swansea City FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Tottenham.aspx">Tottenham FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Watford.aspx">Watford FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/WestBrom.aspx">WestBrom FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/WestHam.aspx">WestHam FC</a></li>
    </ul>
  </div>
</div>
</asp:Content>
