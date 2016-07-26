<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="svgTest.aspx.cs" Inherits="SoccerProject.svgTest" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-3.1.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('.svg-convert').shapeSvgConvert();
        });
    </script>
    <style>
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div class="column">
  <h2>SVG (After Convert)</h2>
  <i>
    <img src="https://dl.dropboxusercontent.com/u/2009184/codepen-logo.svg" class="svg-convert" />
  </i>
</div>
    </div>
    </form>
</body>
</html>
