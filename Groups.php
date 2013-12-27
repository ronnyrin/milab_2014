<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Groups Screen</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
    </head>
    <body>
        <div data-role="page" class="ui-responsive-panel">
            <div data-role="header" data-theme="f">
                <h1>Groups</h1>
                <a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
            </div>
            <?php
            include_once 'Menu.php';
            ?>
            <div data-role="content">
                <div data-role="collapsible">
                    <h3>Linear Algebra</h3>
                    <p>Teacher: Mr. Shamai <br>
                        Email: yossi@algebra.com <br>
                        Members: 30 <br>
                    </p>
                </div>
                <div data-role="collapsible">
                    <h3>Processing</h3>
                    <p>Teacher: Mr. Hoffman <br>
                        Email: hofman@processing.com <br>
                        Members: 25 <br>
                    </p>
                </div>
                <div data-role="collapsible">
                    <h3>Finance</h3>
                    <p>Teacher: Mr. Sharoni <br>
                        Email: itay@finance.com <br>
                        Members: 0 <br>
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>