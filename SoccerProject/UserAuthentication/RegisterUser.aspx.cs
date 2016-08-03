using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SoccerProject.UserAuthentication
{
    public partial class RegisterUser : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void cmdSubmit_Click(object sender, EventArgs e)
        {
            string FIRST_NAME = txtFirstName.Text;
            string LAST_NAME = txtLastName.Text;
            string COUNTRY = txtCountry.Text;
            string USERNAME = txtUserName.Text;
            string EMAIL = txtEmailAddress.Text;
            string PASSWORDHASHED = txtPassword.Text;

            

            //add connection string
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SoccerAppSqlConn"].ConnectionString);

            //create query to store insert data into RegisterUser table
            string insertIntoRegisterUser = @"INSERT INTO RegisterUser
                                          (  [FIRST_NAME]
                                             ,[LAST_NAME]
                                             ,[COUNTRY]
                                             ,[USERNAME]
                                             ,[EMAIL]
                                             ,[PASSWORDHASHED]
                                          )
                                          VALUES
                                          (
                                              @FIRST_NAME
                                             ,@LAST_NAME
                                             ,@COUNTRY
                                             ,@USERNAME
                                             ,@EMAIL
                                             ,@PASSWORDHASHED
                                          )
                                          Select @@IDENTITY";

            //Connect and save data to the database
            SqlCommand command = new SqlCommand(insertIntoRegisterUser);
            command.CommandType = CommandType.Text;
            command.Connection = conn;
            conn.Open();
            command.Parameters.AddWithValue("@FIRST_NAME", FIRST_NAME);
            command.Parameters.AddWithValue("@LAST_NAME", LAST_NAME);
            command.Parameters.AddWithValue("@COUNTRY", COUNTRY);
            command.Parameters.AddWithValue("@USERNAME", USERNAME);
            command.Parameters.AddWithValue("@EMAIL", EMAIL);
            command.Parameters.AddWithValue("@PASSWORDHASHED", PASSWORDHASHED);
            int UserID = Convert.ToInt32(command.ExecuteScalar());
            conn.Close();

            //Populate the session parameter
            Session["UserID"] = UserID;

            //Redirect to apply loan page
            Session["WelcomeMessage"] = string.Concat("Welcome ", FIRST_NAME, LAST_NAME, ". You have now been registered.");
            Response.Redirect("../Home.aspx");
        }
    }
}