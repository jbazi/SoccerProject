<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/League.Master" AutoEventWireup="true" CodeBehind="LaLiga.aspx.cs" Inherits="SoccerProject.Leagues.LaLiga" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-3.1.0.min.js"></script>
    <script src="../Scripts/League_Scripts/laLiga.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1><span><img id="trophy" src="../Content/trophies/laliga.jpg" /></span>La Liga</h1>
            <p>Spanish 2016 - 2017 Season</p>
        </div>
    </div>
    <div class="container">
  <div class="dropdown" style="float:right;">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Your Team
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      <li><a href="../../Teams/La_Liga_Teams/Alaves.aspx">Deportivo Alavés</a></li>
          <li><a href="../../Teams/La_Liga_Teams/AtleticoBilbao.aspx">Athletic Bilbao</a></li>
          <li><a href="../../Teams/La_Liga_Teams/AtleticoDeMadrid.aspx">Atletico Madrid</a></li>
          <li><a href="../../Teams/La_Liga_Teams/Barcelona.aspx">FC Barcelona</a></li>
          <li><a href="../../Teams/La_Liga_Teams/CeltaVigo.aspx">RC Celta de Vigo</a></li>
          <li><a href="../../Teams/La_Liga_Teams/DeportivoLaCoruna.aspx">RC Deportivo La Coruna</a></li>
          <li><a href="../../Teams/La_Liga_Teams/Espanyol.aspx">RCD Espanyol</a></li>
          <li><a href="../../Teams/La_Liga_Teams/Granada.aspx">Granada CF</a></li>
          <li><a href="../../Teams/La_Liga_Teams/LasPalmas.aspx">Las Palmas</a></li>
          <li><a href="../../LaLigaHome.aspx">CD Leganes</a></li>
          <li><a href="../../Teams/La_Liga_Teams/Malaga.aspx">Málaga CF</a></li>
          <li><a href="../../Teams/La_Liga_Teams/Osasuna.aspx">CA Osasuna</a></li>
          <li><a href="../../Teams/La_Liga_Teams/RealBetis.aspx">Real Betis</a></li>
          <li><a href="../../Teams/La_Liga_Teams/RealMadrid.aspx">Real Madrid</a></li>
          <li><a href="../../Teams/La_Liga_Teams/RealSociedad.aspx">Real Sociedad</a></li>
          <li><a href="../../Teams/La_Liga_Teams/SdEibar.aspx">SD Eibar</a></li>
          <li><a href="../../Teams/La_Liga_Teams/Sevilla.aspx">Sevilla FC</a></li>
          <li><a href="../../Teams/La_Liga_Teams/SportingGijon.aspx">Sporting Gijón</a></li>
          <li><a href="../../Teams/La_Liga_Teams/Valencia.aspx">Valencia CF</a></li>
          <li><a href="../../Teams/La_Liga_Teams/Villarreal.aspx">Villarreal CF</a></li>
    </ul>
  </div>
</div>
</asp:Content>
