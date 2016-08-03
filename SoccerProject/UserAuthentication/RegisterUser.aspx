<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/User.Master" AutoEventWireup="true" CodeBehind="RegisterUser.aspx.cs" Inherits="SoccerProject.UserAuthentication.RegisterUser" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h1>Register As A Fan</h1>
            <p>Do It!!!</p>

            <p>C'mon</p>
        </div>
    </div>

    <table id="registerTable">
        <tr class="success">
            <td>
                First Name<asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server"
                    ErrorMessage="*" ControlToValidate="txtFirstName"  ForeColor="Red" />
            </td>
            <td>
                <asp:TextBox ID="txtFirstName"  class="txtBox" runat="server" required="required" placeholder="Your First Name"></asp:TextBox>
            </td>
        </tr>
        <tr class="danger">
            <td>
                Last Name<asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server"
                    ErrorMessage="*" ControlToValidate="txtLastName" ForeColor="Red" />
            </td>
            <td>
                <asp:TextBox ID="txtLastName" class="txtBox" runat="server" required="required" placeholder="Your Last Name"></asp:TextBox>
            </td>
        </tr>
        <tr class="success">
            <td>
                Country<asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server"
                    ErrorMessage="*" ControlToValidate="txtCountry"  ForeColor="Red" />
            </td>
            <td>
                <asp:TextBox ID="txtCountry"  class="txtBox" runat="server" required="required" placeholder="Your Country"></asp:TextBox>
            </td>
        </tr>
        <tr class="info">
            <td>
                User Name   <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server"
                    ErrorMessage="*" ControlToValidate="txtUserName" ForeColor="Red"/>
            </td>
            <td>
                <asp:TextBox ID="txtUserName" class="txtBox" runat="server" required="required" placeholder=" Your User Name"></asp:TextBox>
              
            </td>
        </tr>
        <tr class="warning">
            <td>
                Email address  <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server"
                    ErrorMessage="*" ControlToValidate="txtEmailAddress" ForeColor="Red" />
            </td>
            <td>
                <asp:TextBox ID="txtEmailAddress" class="txtBox"  runat="server" required="required" placeholder="me@email.com"></asp:TextBox> 
            </td>
        </tr>
        <tr class="success">
            <td>
                Confirm email address   <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server"
                    ErrorMessage="*" ControlToValidate="txtCofirmEmail" ForeColor="Red" />
            </td>
            <td>
                <asp:TextBox ID="txtCofirmEmail"  class="txtBox" runat="server" required="required" placeholder="me@email.com"></asp:TextBox>
               
            </td>
        </tr>
        <tr class="danger">
            <td>
                Password   <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server"
                    ErrorMessage="*" ControlToValidate="txtPassword" ForeColor="Red" />
            </td>
            <td>
                <asp:TextBox ID="txtPassword"  class="txtBox" runat="server" required="required" placeholder="****"></asp:TextBox>
               
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <asp:Button ID="cmdSubmit" class="btnSignUp" runat="server" Text="Sign Up" OnClick="cmdSubmit_Click" />
            </td>
        </tr>
    </table>
</asp:Content>
