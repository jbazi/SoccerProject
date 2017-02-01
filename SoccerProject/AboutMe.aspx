<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="AboutMe.aspx.cs" Inherits="SoccerProject.AboutMe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>John Mutabazi - About Me</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1>Hello It's Nice to Meet You!</h1>

        </div>
    </div>

    <div class="box">
        <div class="left-box">
            <img id="abt_img1" src="images/izzy_and_me.jpg" />
        </div>
        <div class="middle-box">
            <article>
                There are only two seasons, summer and football <i class="fa fa-smile-o"></i>.
                <hr />

                You're probably thinking who am I? Well allow me to indulge you <i class="fa-smile-o" aria-hidden="true"></i>.  
                <ul>
                    <li>I am a software developer who loves this beautiful game called football.
                        <br />
                        Yes, the universal name is football, however, some of my friends call
                        it soccer.
                        <br />
                    </li>

                    <li>I enjoy <em><strong>learning</strong></em> as well as '<em><strong>working</strong></em>'
                        <br />
                        I am particulary interested and passionate in using my skills to help others.
                        <br />
                        <ul>
                            <li><em>"Its kinda boring knowing the same thing yesterday, today, then tomorrow!"</em></li>
                        </ul>
                    </li>
                    <li>With this in mind, I decided to use my skills and build a quick site where fans like me
                        <br />
                        can easily access quick data such as scores, player info, team fixtures, etc.
                    </li>
                </ul>


                <hr />
                What am I doing now?
                <br />
                <ul>
                    <li>Well I could be continuing my ongoing lessons playing my keyboard <em>(thank you youtube!).</em></li>
                    <li>I could be catching up on a show on netflix.</li>
                    <li>I could be enjoying my time with family.</li>
                    <li>I could be calling one of my friends/cousins to see where we can hangout.</li>
                    <li>I could be watching a DIY video on youtube.</li>
                    <li>I could be very well sleeping.</li>
                </ul>

                Ofcourse I can do all these things simutaneously and at once! 
                <hr />

                Lastly, major thanks to my friend in Germany, Daniel Freitag,  the creator of the free API am implementing here. <br />
                Visit <a href="http://api.football-data.org/index" target="_blank">football-data.org</a> for more information! 
            </article>
        </div>
        <div class="right-box">
            <img id="abt_img2"  src="images/me.jpg" />
        </div>
    </div>
</asp:Content>
