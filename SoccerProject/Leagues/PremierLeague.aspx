<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/League.Master" AutoEventWireup="true" CodeBehind="PremierLeague.aspx.cs" Inherits="SoccerProject.Leagues.PremierLeague" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Premier League</title>
    <script src="../Scripts/jquery-3.1.0.min.js"></script>
    <script src="../Scripts/League_Scripts/premierLeague.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container">
        <div class="jumbotron">
            <h1><span><img id="trophy"  src="../Content/trophies/epl.png" /></span>Premier League</h1>
            <p>2016 - 2017 Season</p>
        </div>
    </div>

    <div class="container">
  <div class="dropdown" style="float:right;">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Your Team
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      <li><a href="../../Teams/Premier_League_Teams/Arsenal.aspx"> 
          <img src="../Content/TeamImages/EPL/Arsenal.jpg" width="25" height="25" />  Arsenal FC</a></li>
      <li><a href="../../Teams/Premier_League_Teams/Bournemouth.aspx"> 
          <img src="../Content/TeamImages/EPL/Bournemouth.jpg" width="25" height="25" />  Bournemouth FC</a></li>
      <li><a href="../../Teams/Premier_League_Teams/Burnley.aspx"> 
          <img src="../Content/TeamImages/EPL/Burnley.jpg" width="25" height="25" />  Burnely FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Chelsea.aspx"> 
            <img src="../Content/TeamImages/EPL/chelsea.jpg" width="25" height="25" />  Chelsea FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/CrystalPalace.aspx"> 
            <img src="../Content/TeamImages/EPL/crystal_palace.jpg" width="25" height="25" />  Crystal Palace FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Everton.aspx"> 
            <img src="../Content/TeamImages/EPL/Everton.jpg" width="25" height="25" />  Everton FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/HullCity.aspx"> 
            <img src="../Content/TeamImages/EPL/Hull_City.jpg" width="25" height="25" />  Hull City FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/LeicesterCity.aspx"> 
            <img src="../Content/TeamImages/EPL/Leicester.jpg" width="25" height="25" />  Leicester FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Liverpool.aspx"> 
            <img src="../Content/TeamImages/EPL/liverpool.jpg" width="25" height="25" />  Liverpool FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/ManCity.aspx"> 
            <img src="../Content/TeamImages/EPL/mancity.jpg" width="25" height="25" />  Man City FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/ManUnited.aspx"> 
            <img src="../Content/TeamImages/EPL/ManU.jpg" width="25" height="25" />  Man United FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Middlesbrough.aspx"> 
            <img src="../Content/TeamImages/EPL/Middlesbrough.jpg" width="25" height="25" />  Middlesbrough FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Southampton.aspx"> 
            <img src="../Content/TeamImages/EPL/southampton.jpg" width="25" height="25" />  Southampton FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Stoke_City.aspx"> 
            <img src="../Content/TeamImages/EPL/stokeCity.jpg" width="25" height="25" />  Stoke City FC</a></li>
         <li><a href="../../Teams/Premier_League_Teams/Sunderland.aspx"> 
            <img src="../Content/TeamImages/EPL/sunderland.jpg" width="25" height="25" />  Sunderland FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/SwanseaCity.aspx"> 
            <img src="../Content/TeamImages/EPL/swanseaCity.jpg" width="25" height="25" />  Swansea City FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Tottenham.aspx">
            <img src="../Content/TeamImages/EPL/Tottenham.jpg" width="25" height="25" /> Tottenham FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/Watford.aspx">
            <img src="../Content/TeamImages/EPL/watford.jpg" width="25" height="25" /> Watford FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/WestBrom.aspx"> 
            <img src="../Content/TeamImages/EPL/westBrom.jpg" width="25" height="25" /> WestBrom FC</a></li>
        <li><a href="../../Teams/Premier_League_Teams/WestHam.aspx">
                <img src="../Content/TeamImages/EPL/westHam.jpg" width="25" height="25" />  WestHam FC
            </a></li>
    </ul>
  </div>
</div>
</asp:Content>
