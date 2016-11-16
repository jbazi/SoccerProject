<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Teams.Master" AutoEventWireup="true" CodeBehind="LasPalmas.aspx.cs" Inherits="SoccerProject.Teams.La_Liga_Teams.LasPalmas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-3.1.0.min.js"></script>
    <script src="../../Scripts/Team_Scripts/LaLiga/lasPalmas.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1><img src="../../Content/TeamImages/LaLiga/lasPalmas.jpg" width="100" height="100" />UD Las Palmas</h1>
        </div>
    </div>
</asp:Content>
