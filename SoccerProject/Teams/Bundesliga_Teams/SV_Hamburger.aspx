<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Teams.Master" AutoEventWireup="true" CodeBehind="SV_Hamburger.aspx.cs" Inherits="SoccerProject.Teams.Bundesliga_Teams.SV_Hamburger" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-3.1.0.min.js"></script>
    <script src="../../Scripts/Team_Scripts/Bundesliga/svHamburger.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1><img src="../../Content/TeamImages/Bundesliga/hamburgFC.jpg" width="100" height="100" />Hamburger SV</h1>
        </div>
    </div>
</asp:Content>
