using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Security;

namespace SoccerProject
{
    public partial class Home : System.Web.UI.Page
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {

            //if (!this.Page.User.Identity.IsAuthenticated)
            //Response.Redirect("RegisterUser.aspx");
            //FormsAuthentication.RedirectToLoginPage();

            if (Session["WelcomeMessage"] != null)
            {
                lblMessage.Text = Session["WelcomeMessage"].ToString();
            }

            //if (Session["UserId"] == null)
            //{
            //    lblMessage.Visible = true;
            //    lblMessage.Text = "You must login to the website first";
            //    //cmdSubmit.Enabled = false;
            //}
            //else
            //{
            //    lblMessage.Visible = false;
            //    //cmdSubmit.Enabled = true;
            //}
            
        }
    }
}