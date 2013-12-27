<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Settings</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
    </head>
    <body>
        <div data-role="page" class="ui-responsive-panel">
            <div data-role="header" data-theme="f">
                <h1>Settings</h1>
                <a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
            </div>
            <?php
            include_once 'Menu.php';
            ?>
            <div data-role="content">
                <h3> Tom Blotman </h3>
                <img border="0" src="http://images.globes.co.il/Images/NewGlobes/big_image/2011/693923[6.jpg" > <br> <br>


                Institue:
                <select name = "institue" id="institue" data-native-menu="false" data-theme = "b">
                    <option value="IDC"> IDC </option>
                    <option value="TAU"> TAU </option>
                    <option value="BGU"> BGU </option>
                    <option value="TECH"> Technion </option>
                </select>
                Degree:
                <select name = "degree" id="degree" data-native-menu="false" data-theme = "b">
                    <option value="Computer Science"> Computer Science </option>
                    <option value="Communications"> Communications </option>
                    <option value="Law"> Law </option>
                    <option value="Accounting"> Accounting </option>
                </select>
                Year:
                <select name = "year" id="year" data-native-menu="false" data-theme = "b">
                    <option value="2013"> 2013 </option>
                    <option value="2012"> 2012 </option>
                    <option value="2011"> 2011 </option>
                    <option value="1934"> 1934 </option>
                </select>


                <label for="flip-notifications">Flip switch:</label>
                <select name="flip-notifications" id="flip-notifications" data-role="slider" >
                    <option value="off">Off</option>
                    <option value="on">On</option>
                </select> 

                <label for="alert-days">Custom alert: </label>
                <select name="alert-days" id ="alert-days" data-native-menu="false" data-theme="b" data-inline="true">
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                    <option value="6"> 6 </option>
                    <option value="7"> 7 </option>        
                </select>

                <label for = "flip-sound"> Sound </label>
                <select name="flip-sound" id="flip-sound" data-role="slider">
                    <option value="off">Off</option>
                    <option value="on">On</option>
                </select>
            </div>
        </div>
    </body>
</html>