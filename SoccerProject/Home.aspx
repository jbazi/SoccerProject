<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="SoccerProject.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <div class="container">
  <div class="jumbotron">
    <h1>Home</h1>
    <p>2016 - 2017 Season</p>
  </div>
        </div>

    <div>
        <div class="row">

            <div class="col-lg-12">
                <h3 class="page-header">Related Projects</h3>
            </div>

            <div id="epl" class="col-sm-3 col-xs-6">
                <a href="PremierLeagueHome.aspx">
                    <img class="img-responsive portfolio-item" src="Content/epl.jpg" width="150" height="150" title=" English League (Premier League)" />
                </a>
            </div>

            <div id="laliga" class="col-sm-3 col-xs-6">
                <a href="Leagues/LaLiga.aspx">
                    <img class="img-responsive portfolio-item" src="Content/laliga.jpg" width="150" height="150" title=" Spanish League (La Liga)" />
                </a>
            </div>

            <div id="bundesliga" class="col-sm-3 col-xs-6">
                <a href="Leagues/Bundesliga.aspx">
                    <img class="img-responsive portfolio-item" src="Content/bundesliga.jpg" width="150" height="150" title="German League (Bundesliga)" />
                </a>
            </div>

            <div id="ligue1" class="col-sm-3 col-xs-6">
                <a href="Leagues/LigueOne.aspx">
                    <img class="img-responsive portfolio-item" src="Content/ligue1.jpg" width="150" height="150" title="French League (Ligue 1)" />
                </a>
            </div>

        </div>
        <!-- /.row -->

        <hr>

        <!-- Footer -->
        

    </div>
</asp:Content>
