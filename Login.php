<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <!-- cordova -->
        <script src="cordova.js"></script>
        <!-- cordova facebook plugin -->
        <script type="text/javascript" src="cdv-plugin-fb-connect.js"></script>
        <!-- facebook js sdk -->
        <script type="text/javascript" src="facebook-js-sdk.js"></script>
        <script src="http://debug.phonegap.com/target/target-script-min.js#anonymous"></script>
    </head>
    <body>
        <form method="post"> 
            <label>Institute:</label>
            <select name="institue" id="institue" data-native-menu="false" data-theme="b">
                <option value="IDC"> IDC </option>
                <option value="TAU"> TAU </option>
                <option value="BGU"> BGU </option>
                <option value="TECH"> Technion </option>
            </select>
            <br/>
            Degree:
            <select name="degree" id="degree" data-native-menu="false" data-theme="b">
                <option value="Computer Science"> Computer Science </option>
                <option value="Communications"> Communications </option>
                <option value="Law"> Law </option>
                <option value="Accounting"> Accounting </option>
            </select><br/>
            Year:
            <select name="year" id="year" data-native-menu="false" data-theme="b">
                <option value="2013"> 2013 </option>
                <option value="2012"> 2012 </option>
                <option value="2011"> 2011 </option>
                <option value="1934"> 1934 </option>
            </select>
            <div id="fb-root"></div>

            <!-- Facebook JavaScript -->
            <script type="text/javascript">
                // Load the SDK asynchronously
                (function(d) {
                    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement('script');
                    js.id = id;
                    js.async = true;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    ref.parentNode.insertBefore(js, ref);
                }(document));


                document.addEventListener("deviceready", onDeviceReady(), false);

                function onDeviceReady() {
                    FB.init({
                        appId: '691029124265305', // App ID
                        nativeInterface: CDV.FB,
                        xfbml: true,
                        useCachedDialogs: false,
                        status: true,
                        cookie: true
                    });
                }


                function promptLogin() {
                    FB.login(function(response) {
                        if (response.authResponse) {
                            alert('im in!');
                            window.location = 'index.php';
                        } else {
                            // The person cancelled the login dialog
                        }
                    }, {scope: 'email'});
                }


            </script>
             <a onclick="promptLogin()"  data-role="button">Login with Facebook</a>
        </form>

        <div>
            This application requires access to your profile information.<br>
 Your personal information is required in order to help us identify the courses that might be relevant for you.<br>
            This application will never post on your behalf<br>
        </div>
    </body>
</html>