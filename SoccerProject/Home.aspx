<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="SoccerProject.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:Label ID="lblMessage" runat="server" ForeColor="Red" Visible="false"></asp:Label>
    
     <div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 980px; height: 380px; overflow: hidden; visibility: hidden;">
        <!-- Loading Screen -->
        <div data-u="loading" style="position: absolute; top: 0px; left: 0px;">
            <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
            <div style="position:absolute;display:block;background:url('Content/sliderImages/loading.gif') no-repeat center center;top:0px;left:0px;width:100%;height:100%;"></div>
        </div>
        <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 980px; height: 380px; overflow: hidden;">
            <div data-b="0" data-p="170.00">
                <img data-u="image" src="Content/Banner_Images/stadium.jpg" />
                <div style="margin: auto;  top: 107px; left: 460px; width: 460px; height: 210px;">
                    <img data-u="caption" data-t="0" style="position: absolute; top: -300px; left: 89px; width: 198px; height: 178px;" src="Content/sliderImages/realM.png" />
                    <img data-u="caption" data-t="1" style="position: absolute; top: 55px; left: -200px; width: 184px; height: 144px;" src="Content/sliderImages/bayern.png" />
                    <img data-u="caption" data-t="2" style="position: absolute; top: 88px; left: 420px; width: 114px; height: 144px;" src="Content/sliderImages/arsenal.png" />
                </div>
                <div style="position: absolute; top: 107px; left: 460px; width: 460px; height: 210px;">
                    <img data-u="caption" data-t="0" style="position: absolute; top: -300px; left: 89px; width: 210px; height: 178px;" src="Content/sliderImages/lMessi.png" />
                    <img data-u="caption" data-t="1" style="position: absolute; top: 55px; left: -280px; width: 180px; height: 144px;" src="Content/sliderImages/ronaldo.png" />
                    <img data-u="caption" data-t="2" style="position: absolute; top: 88px; left: 420px; width: 180px; height: 144px;" src="Content/sliderImages/neymar.png" />
                </div>
                <p> Welcome to </p> <h1 data-animate="fadeInDown">Sasa Scores </h1>
            </div>
            <div data-b="1" data-p="170.00" style="display: none;">
                <img data-u="image" src="Content/Banner_Images/stadium.jpg" />
                <div data-u="caption" data-t="9" data-3d="1" style="position: absolute; top: 150px; left: -36px; width: 1053px; height: 150px;">
                    <div data-u="caption" data-t="10" data-to="100% 50%" style="position: absolute; top: 0px; left: 1030px; width: 72px; height: 72px; background-color: #eb9434;">
                        <div data-u="caption" data-t="11" style="position: absolute; top: 0px; left: 0px; width: 72px; height: 72px; font-size: 25px; color: #ffffff; line-height: 72px; text-align: center;">Four

                        </div>
                    </div>
                    <div data-u="caption" data-t="12" data-to="0% 50%" style="position: absolute; top: 0px; left: 360px; width: 175px; height: 72px; background-color: #eb9434; font-size: 36px; color: #ffffff; line-height: 72px; text-align: center;">European

                    </div>
                    <div data-u="caption" data-t="13" data-to="0% 50%" style="position: absolute; top: 0px; left: 535px; width: 230px; height: 72px; background-color: #eb9434; font-size: 36px; color: #ffffff; line-height: 72px; text-align: center;">Competitions

                    </div>
                    <div data-u="caption" data-t="14" style="position: absolute; top: 360px; left: 238px; width: 577px; height: 30px; font-size: 24px; color: #ffffff; line-height: 30px; text-align: center;">Get All Your latest Team Scores and Standings at SasaScores</div>
                </div>
                <div data-u="caption" data-t="15" data-3d="1" style="position: absolute; top: 70px; left: 182px; width: 616px; height: 150px;">
                    <img data-u="caption" data-t="16" style="position: absolute; top: 22px; left: 266px; width: 84px; height: 84px;" src="Content/sliderImages/myLeague.png" />
                    <img data-u="caption" data-t="17" style="position: absolute; top: 16px; left: 260px; width: 96px; height: 96px;" src="Content/sliderImages/circle.png" />
                    <div data-u="caption" data-t="18" style="position: absolute; top: 195px; left: 260px; width: 96px; height: 30px; font-size: 18px; color: #ffffff; line-height: 30px; text-align: center;">League Standings</div>
                    <img data-u="caption" data-t="19" style="position: absolute; top: 22px; left: 22px; width: 84px; height: 84px;" src="Content/sliderImages/manutd.png" />
                    <img data-u="caption" data-t="20" style="position: absolute; top: 16px; left: 16px; width: 96px; height: 96px;" src="Content/sliderImages/circle.png" />
                    <div data-u="caption" data-t="21" style="position: absolute; top: 125px; left: 166px; width: 96px; height: 30px; font-size: 18px; color: #ffffff; line-height: 30px; text-align: center;">Team Results</div>
                    <img data-u="caption" data-t="22" style="position: absolute; top: 22px; left: 510px; width: 84px; height: 84px;" src="Content/sliderImages/messi.png" />
                    <img data-u="caption" data-t="23" style="position: absolute; top: 16px; left: 504px; width: 96px; height: 96px;" src="Content/sliderImages/circle.png" />
                    <div data-u="caption" data-t="24" style="position: absolute; top: 125px; left: 354px; width: 96px; height: 30px; font-size: 18px; color: #ffffff; line-height: 30px; text-align: center;">Players Bio</div>
                </div>
            </div>
        </div>
        <!-- Bullet Navigator -->
        <div data-u="navigator" class="jssorb05" style="bottom:16px;right:16px;" data-autocenter="1">
            <!-- bullet navigator item prototype -->
            <div data-u="prototype" style="width:16px;height:16px;"></div>
        </div>
        <!-- Arrow Navigator -->
        <span data-u="arrowleft" class="jssora22l" style="top:0px;left:10px;width:40px;height:58px;" data-autocenter="2"></span>
        <span data-u="arrowright" class="jssora22r" style="top:0px;right:10px;width:40px;height:58px;" data-autocenter="2"></span>
    </div>
    <div>

        <div class="banner-info">
                    <h3> Welcome to </h3> <h1 data-animate="fadeInDown">Sasa Scores </h1>
            </div>


        <div class="row">
            <div id="epl" class="col-sm-3 col-xs-6">
                <a href="PremierLeagueHome.aspx">
                    <img class="img-responsive portfolio-item" src="Content/epl.jpg" width="200" height="200" title=" English League (Premier League)" />
                </a>
            </div>

            <div id="laliga" class="col-sm-3 col-xs-6">
                <a href="Leagues/LaLiga.aspx">
                    <img class="img-responsive portfolio-item" src="Content/laliga.jpg" width="200" height="200" title=" Spanish League (La Liga)" />
                </a>
            </div>

            <div id="bundesliga" class="col-sm-3 col-xs-6">
                <a href="Leagues/Bundesliga.aspx">
                    <img class="img-responsive portfolio-item" src="Content/bundesliga.jpg" width="200" height="200" title="German League (Bundesliga)" />
                </a>
            </div>

            <div id="ligue1" class="col-sm-3 col-xs-6">
                <a href="Leagues/LigueOne.aspx">
                    <img class="img-responsive portfolio-item" src="Content/ligue1.jpg" width="200" height="200" title="French League (Ligue 1)" />
                </a>
            </div>

        </div>
    </div>
</asp:Content>
