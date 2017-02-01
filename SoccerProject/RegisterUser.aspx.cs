using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Globalization;
using System.Web.Security;

namespace SoccerProject.UserAuthentication
{
    public partial class RegisterUser : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!Page.IsPostBack)
            {
                for (int age = 10; age <= 90; age++)
                {
                    txtAgeDropdown.Items.Add(new ListItem(age.ToString(), age.ToString()));
                }


                txtCtryDropdown.DataSource = CountryList();
                txtCtryDropdown.DataBind();

            }
        }


        public static List<string> CountryList()
        {
            
            List<string> CultureList = new List<string>();

            //the CultureInfo class will house the culture(countries). This is a .net class
            CultureInfo[] getCultureInfo = CultureInfo.GetCultures(CultureTypes.SpecificCultures);

            foreach (CultureInfo getCulture in getCultureInfo)
            {
                RegionInfo getRegionInfo = new RegionInfo(getCulture.LCID);
                //Here am adding each country name into my list
                if (!(CultureList.Contains(getRegionInfo.EnglishName)))
                    CultureList.Add(getRegionInfo.EnglishName);
            }
            //here i'll sort my list so that the countries can appear in alphabetical order for a clean visual for the end user
            CultureList.Sort();
            return CultureList;
        }


        protected void cmdSubmit_Click(object sender, EventArgs e)
        {

            int UserId = 0;
            string username = txtUserName.Text;
            string email = txtEmailAddress.Text;
            string gender = txtGenderDropdown.SelectedItem.Value;
            string age = txtAgeDropdown.SelectedItem.Value;
            string country = txtCtryDropdown.SelectedItem.Value;
            string password = txtPassword.Text;
            string constr = ConfigurationManager.ConnectionStrings["sasascoresconn"].ConnectionString;


            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand("insert_user"))
                {
                    using (SqlDataAdapter sda = new SqlDataAdapter())
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@username", username);
                        cmd.Parameters.AddWithValue("@email", email);
                        cmd.Parameters.AddWithValue("@gender", gender);
                        cmd.Parameters.AddWithValue("@age", age);
                        cmd.Parameters.AddWithValue("@country", country);
                        cmd.Parameters.AddWithValue("@password", password);
                        cmd.Connection = con;
                        con.Open();
                        UserId = Convert.ToInt32(cmd.ExecuteScalar());
                        con.Close();
                    }
                }
                string message = string.Empty;
                switch (UserId)
                {
                    case -1:
                        message = "username already exists.\\nplease choose a different username.";
                        break;
                    case -2:
                        message = "supplied email address has already been used.";
                        break;
                    default:
                        message = "registration successful.\\nuser id: " + UserId.ToString();
                        break;
                }

                ClientScript.RegisterStartupScript(GetType(), "alert", "alert('" + message + "');", true);
            }

            //Populate the session parameter
            Session["UserID"] = UserId;

            //Redirect to home page
            Session["WelcomeMessage"] = string.Concat("Welcome ", txtUserName.Text.Trim(), ", [", txtEmailAddress.Text.Trim(), "]. You have now been registered.");
            Response.Redirect("Home.aspx");
        }
    }
}