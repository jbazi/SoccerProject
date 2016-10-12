<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="rssFeed.aspx.cs" Inherits="SoccerProject.rssFeed" %>

﻿<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="content-language" content="en" />
    <title>FeedEk jQuery RSS/ATOM Feed Plugin Demo | jQuery RSS/ATOM Parser Plugin FeedEk Demo</title>
    <link href="Content/feedEk.css" rel="stylesheet" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://momentjs.com/downloads/moment-with-langs.min.js"></script>
    <script type="text/javascript" src="Scripts/feedEk.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#divRss').FeedEk({
                FeedUrl: 'http://feeds.bbci.co.uk/sport/football/rss.xml?edition=int',
            });


        });
    </script>
    <style>
        body {
            font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
            background-color: #efefef;
            font-size: 13px;
            line-height: 17px !important;
        }

        .rssDiv {
            float: left;
            padding-right: 35px;
        }

        ul {
            width: 300px !important;
        }
    </style>
</head>
<body>
    <div style="padding:10px;">
        <h1>Man United Latest News</h1>
        <div>
            <div class="rssDiv">
                <div id="divRss"></div>
            </div>
        </div>
    </div>


</body>
</html>