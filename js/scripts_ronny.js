var gcm = "";

function setGCM(val) {
    gcm = val;
}
function setName(val) {
    name = val;
}

$(document).on("pageshow", "#home", function() {
    $('.details').hide();
    $('.ui-btn-text').click(function() {
        $(this).find('.details').slideToggle(200);
    });

    $.ajax({
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/viewWeek.php',
        method: 'POST',
        cache: false,
        data: {
            //todo
        },
        success: function(data) {
            //alert(data);
            var json = JSON.parse(data);
            var day = 0;
            $.each(json.data, function(i, val) {
                $("#day" + day + " h3").text("");
                $("#day" + day + " h3").append(json.data[i].date);
                $("#day" + day + " .details").text("");
                $("#day" + day + " ul").text("");
                if (json.data[i].tasks.count > 0) {
                    var output = "";
                    $.each(json.data[i].tasks.data, function(j, val) {
                        output += '<li>' + json.data[i].tasks.data[j].course_name + '</li>';
                        if (j + 1 == json.data[i].tasks.count) {
                            $("#day" + day + " .details").append("<b><u><a href='GroupDetails.html' id='task" + i + "_" + j + "'>" + json.data[i].tasks.data[j].course_name + "</a></u><br/><br/>" +
                                    json.data[i].tasks.data[j].task_name + "</b><br/><br/>" + json.data[i].tasks.data[j].due_date);
                        } else {
                            $("#day" + day + " .details").append("<b><u><a href='GroupDetails.html' id='task" + i + "_" + j + "'>" + json.data[i].tasks.data[j].course_name + "</a></u><br/><br/>" +
                                    json.data[i].tasks.data[j].task_name + "</b><br/><br/>" + json.data[i].tasks.data[j].due_date + "<br/><hr>");
                        }
                        if (json.data[i].tasks.count < 2) {
                            $("#day" + day + " img").attr("src", "images/easy.png")
                        } else {
                            $("#day" + day + " img").attr("src", "images/hard.png")
                        }

                        $('#task' + i + "_" + j).click(function() {
                            setCurrentCourseId(json.data[i].tasks.data[j].course_id);
                            setCurrentTaskId(json.data[i].tasks.data[j].index);
                        });
                    });
                    $("#day" + day + "-ul").append(output).trigger('create');
                } else {
                    $("#day" + day + " img").attr("src", "images/fun.png");
                }
                day++;
            });
            if (json.status == 2) {
                $("#empty").popup();
                $("#empty").trigger("create");
                $("#empty").popup("open");
            }
        },
        error: function() {
        }
    });
});

$(document).on("pageshow", "#profilePage", function() {
    $.ajax({
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/userProfile.php',
        method: 'POST',
        data: {
            dataUser: "yes"
        },
        success: function(data) {
            var json = JSON.parse(data);
            console.log(data);
            if (json.success == 1) {
                $("#nameProfile").text(json.user_name);
                parseProfile(json, true);
                $('#imgProfile').attr('src', 'https://graph.facebook.com/' + localStorage.getItem("ID") + '/picture?width=120&height=120');

            }
        },
        error: function() {
            alert(data);
        }
    });
    $('select').on('change', function() {

        $.ajax({
            url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/userProfile.php',
            method: 'POST',
            data: {
                field: this.id,
                value: this.value,
                dataUser: "yes"
            },
            success: function(data) {
                var json = JSON.parse(data);
                if (json.success == 1) {
                    parseProfile(json, true);
                }
            },
            error: function() {
                alert(data.message);
            }
        });
    });
});

function parseProfile(json, isYear) {
    var sel = $("#institue");
    sel.empty();
    for (var i = 0; i < json.schools.length; i++) {
        if (json.schools[i].name == json.user_school) {
            sel.append('<option value="' + json.schools[i].name + '" selected>' + json.schools[i].name + '</option>');
        } else {
            sel.append('<option value="' + json.schools[i].name + '">' + json.schools[i].name + '</option>');
        }
    }
    sel.selectmenu('refresh');
    var sel = $("#degree");
    sel.empty();
    for (var i = 0; i < json.degrees.length; i++) {
        if (json.degrees[i].name == json.user_degree) {
            sel.append('<option value="' + json.degrees[i].index + '" selected>' + json.degrees[i].name + '</option>');
        } else {
            sel.append('<option value="' + json.degrees[i].index + '">' + json.degrees[i].name + '</option>');
        }
    }
    sel.selectmenu('refresh');
    if (isYear) {
        var sel = $("#year");
        sel.empty();
        var year = new Date().getFullYear();
        for (var i = 2009; i <= year; i++) {
            if (i == json.user_year) {
                sel.append('<option value="' + i + '" selected>' + i + '</option>');
            } else {
                sel.append('<option value="' + i + '">' + i + '</option>');
            }
        }
        sel.selectmenu('refresh');
    }
}

$(document).on("pageshow", "#login", function() {
    $.ajax({
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/userProfile.php',
        method: 'POST',
        data: {
        },
        success: function(data) {
            //alert(data);
            var json = JSON.parse(data);
            if (json.success == 1) {
                parseProfile(json, true);
            }
        },
        error: function() {
            alert(data);
        }
    });
    $('select').on('change', function() {
        if (this.id == "institue") {
            $.ajax({
                url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/userProfile.php',
                method: 'POST',
                data: {
                    field: this.id,
                    value: this.value,
                    school: $("#institue").val()
                },
                success: function(data) {
                    var json = JSON.parse(data);
                    if (json.success == 1) {
                        parseProfile(json, true);
                    }
                },
                error: function() {
                    alert(data.message);
                }
            });
        }
    });
});

$(document).on("pageshow", function(e) {

    if (e.target.id != "login") {
        if (localStorage.getItem("Name") == null) {
            localStorage.setItem('Name', "Tom Blotman");
            localStorage.setItem('ID', "1055121807");
        }
        $.mobile.activePage.find("#nameFB").text(localStorage.getItem("Name"));
        $.mobile.activePage.find('#imgFB').attr('src', 'https://graph.facebook.com/' + localStorage.getItem("ID") + '/picture');
        $.mobile.activePage.find('#nav-panel').trigger('create');

    }
});

// result contains any message sent from the plugin call
function successHandler(result) {
    console.log('result = ' + result);
}

// result contains any error description text returned from the plugin call
function errorHandler(error) {
    console.log('error = ' + error);
}

function tokenHandler(result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    console.log('device token = ' + result);
}

function onNotificationGCM(e) {
    switch (e.event)
    {
        case 'registered':
            if (e.regid.length > 0)
            {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                //alert("regID = " + e.regid);
                setGCM(e.regid);
            }
            break;

        case 'message':
            alert('message = ' + e.payload.message);
            break;

        case 'error':
            alert('GCM error = ' + JSON.stringify(e));
            break;

        default:
            alert('An unknown GCM event has occurred');
            break;
    }
}

document.addEventListener('deviceready', function() {
    try {

        FB.init({appId: "691029124265305",
            nativeInterface: CDV.FB,
            useCachedDialogs: false,
            status: true, // check login status
            cookie: true});
        // document.getElementById('data').innerHTML = "";

        var pushNotification;
        pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android')
        {
            pushNotification.register(
                    successHandler,
                    errorHandler, {
                        "senderID": "965749566309",
                        "ecb": "onNotificationGCM"
                    });
        }
        else
        {
            pushNotification.register(
                    tokenHandler,
                    errorHandler, {
                        "badge": "true",
                        "sound": "true",
                        "alert": "true",
                        "ecb": "onNotificationAPN"
                    });
        }
    } catch (e) {
        console.log("e1");
    }
    console.log('Device is ready! ');
}, false);

function invite() {
    alert(FB);
    FB.ui({
        method: 'apprequests',
        message: 'Learn how to make your mobile web app social',
    },
            function(response) {
                alert('sendRequestBoth response: ', response);
            });
}