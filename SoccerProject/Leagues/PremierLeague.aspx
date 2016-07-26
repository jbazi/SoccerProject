<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/League.Master" AutoEventWireup="true" CodeBehind="PremierLeague.aspx.cs" Inherits="SoccerProject.Leagues.PremierLeague" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Premier League</title>
    <script src="../Scripts/jquery-3.1.0.min.js"></script>
    <script src="../Scripts/League_Scripts/premierLeague.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1>Premier League</h1>
            <p>England 2016 - 2017 Season</p>
        </div>
    </div>
</asp:Content>
