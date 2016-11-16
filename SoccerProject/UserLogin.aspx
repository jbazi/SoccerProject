<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="UserLogin.aspx.cs" Inherits="SoccerProject.UserLogin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
        <script src="../js/jquery.kinetic.min.js" type="text/javascript"></script>
        <script src="../js/jquery.mousewheel.min.js" type="text/javascript"></script>
        <script src="../js/jquery.smoothdivscroll-1.3-min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1>About Me</h1>
            <p>2016 - 2017 Season</p>
        </div>
    </div>

       <div class="login" style="margin-top:15px;">
  <header class="login-header"><span class="text">LOGIN</span><span class="loader"></span></header>
  <form class="login-form">
    <input type="text" placeholder="Username" class="login-input"/>
    <input type="password" placeholder="Password" class="login-input"/>
    <button type="submit" class="login-btn">login</button>
  </form>
</div>
</asp:Content>
