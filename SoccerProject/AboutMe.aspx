<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/IndependentPages.Master" AutoEventWireup="true" CodeBehind="AboutMe.aspx.cs" Inherits="SoccerProject.AboutMe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1>Hello It's Nice to Meet You</h1>
            
        </div>
    </div>

    <div class="box">
        <div class="left-box">
            <img id="abt_img1" src="images/izzy_and_me.jpg"/>
        </div>
        <div class="middle-box">
            <article>
      There are only two seasons, summer and football <i class="fa fa-soccer-ball-o"></i>. <hr />
      
      You're probably thinking who am I? Well allow me to indulge you.  
                <ul>
                    <li>I am a software developer who loves this beautiful game called football. <br />
      Yes, the universal name is football, however, some of my friends call
      it soccer. <br /></li>

                    <li>
                        I enjoy learning as well as working (don't confuse this with the term <em>'job'</em>) <br />
      I am particulary interested and passionate in using my skills to help others. <br />
                        <ul>
                            <li><em>"Its kinda boring knowing the same thing yesterday, today, then tomorrow!"</em></li>
                        </ul>
                    </li>
                    <li>
                        With this in mind, I decided to use my skills and build a page where fans like me <br />
      can easily access quick data such as scores, player info, team fixtures, etc.
                    </li>
                </ul>
     
      
                <hr />
      What am I doing now? <br /> 
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
    </article>
        </div>
        <div class="right-box">
            <img id="abt_img1" src="images/me.jpg"/>
        </div>
    </div>


    <!--
    <section class="abt_container">
  <div class="left-half">
     <img id="abt_img1" src="images/izzy_and_me.jpg"/>
  </div>
  <div class="right-half">
    <article>
      There are only two season, summer and football. <br />

      I am a software developer who loves this beautiful game called football. <br />
      Yes, the universal name is football, however, my friends here at USA call
      it soccer. <br />

      I am a firm believer that technology is and will be an enine that stretches our <br />
      our minds by introducing new ideas and chnages to our every day lives. <br />

      With this in mind, I decided to use my skills and build a page where fans like me <br />
      can easily access quick data such as scores, player info, team fixtures, etc.
      
      Stay tuned for more projects!  
    </article>
  </div>
</section>
    -->
    <!--
    <div class="right-half">
        <p id="aboutTxt" class="text-primary"> I am a software developer who loves this beautiful game called football. <br />
            Yes, the universal name is football, however, my friends here at USA call
            it soccer. <br />

            I am a firm believer that technology is and will be an enine that stretches our <br />
            our minds by introducing new ideas and chnages to our every day lives. <br />

            With this in mind, I decided to use my skills and build a page where fans like me <br />
            can easily access quick data such as scores, player info, team fixtures, etc.
            
            Stay tuned for more projects!  
        </p> 
        
    </div>

    <div id="left-half">
        <img id="abt_img1" src="images/izzy_and_me.jpg" />
    </div>
    -->
</asp:Content>
