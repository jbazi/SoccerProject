<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/User.Master" AutoEventWireup="true" CodeBehind="RegisterUser.aspx.cs" Inherits="SoccerProject.UserAuthentication.RegisterUser" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1>Register As A Fan</h1>
            <asp:Label ID="lblMessage" runat="server" ForeColor="Red" Visible="false"></asp:Label>
        </div>
    </div>

       <div class="login col-lg-4" style="margin-top:15px; margin-left:10%; float:left !important;">
  <header class="login-header"><span class="text">LOGIN</span><span class="loader"></span></header>
  <form class="login-form">
    <input type="text" placeholder="Username" class="login-input"/>
    <input type="password" placeholder="Password" class="login-input"/>
    <button type="submit" class="login-btn">login</button>
  </form>
</div>
 <p></p>

    <table id="registerTable" class="col-lg-4" style="margin-left:10%; opacity:0.8;">
        <caption>Sign Up</caption>
        <tr class="info">
            <td class="glyphicon glyphicon-user">
                Username   <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server"
                    ErrorMessage="*" ControlToValidate="txtUserName" ForeColor="Red"/>
            </td>
            <td >
                <asp:TextBox ID="txtUserName" class="txtBox" runat="server" required="required" placeholder=" Your User Name"></asp:TextBox>
              
            </td>
        </tr>
        <tr class="warning">
            <td class =" glyphicon glyphicon-envelope">
                Email  <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server"
                    ErrorMessage="*" ControlToValidate="txtEmailAddress" ForeColor="Red"  />
            </td>
            <td>
                <asp:TextBox ID="txtEmailAddress" class="txtBox"  runat="server" required="required" placeholder="me@email.com"></asp:TextBox> 
            </td>
        </tr>
        
        <tr class="danger">
            <td class="glyphicon glyphicon-lock">
                Password   <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server"
                    ErrorMessage="*" ControlToValidate="txtPassword" ForeColor="Red" />
            </td>
            <td>
                <asp:TextBox ID="txtPassword"  TextMode="Password" class="txtBox" runat="server" required="required" placeholder="****"></asp:TextBox>
               
            </td>
        </tr>
        <tr class="success">
            <td>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server"
                    ErrorMessage="*" ControlToValidate="txtConfirmPassword" ForeColor="Red" />
            </td>
            <td>
                <asp:TextBox ID="txtConfirmPassword"  TextMode="Password" class="txtBox" runat="server" required="required" placeholder="Confirm Password"></asp:TextBox>
               
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <asp:Button ID="cmdSubmit" class="btnSignUp" runat="server" Text="Sign Up" OnClick="cmdSubmit_Click" />
            </td>
        </tr>
    </table>
</asp:Content>
