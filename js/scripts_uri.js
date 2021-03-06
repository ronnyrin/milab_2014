var currentCoursePage = "";
var currentCourseId = "";
var currentTaskId = "";





function setCurrentCoursePage(val) {
    currentCoursePage = val;
}

function setCurrentCourseId(val) {
    currentCourseId = val;
}

function setCurrentTaskId(val) {
    currentTaskId = val;
}


function arrowLeft() {
    var num = document.getElementById("customAlert").innerHTML;
    if (num == 1)
        return;
    document.getElementById("customAlert").innerHTML = --num;
}

function arrowRight() {
    var num = document.getElementById("customAlert").innerHTML;
    if (num == 20)
        return;
    document.getElementById("customAlert").innerHTML = ++num;
}

$(document).on("pageshow", "#courseDetails", function() {
    
    if(currentCourseId == -1) {
        $("#personalSentence").html("<i>Any sheet you post here will be visible only for you</i>");
    }

    function add() {
        if ($(this).val() === ' ') {
            $(this).val($(this).attr('placeholder')).addClass('placeholder');
        }
    }

    function remove() {
        if ($(this).val() === $(this).attr('placeholder')) {
            $(this).val('').removeClass('placeholder');
        }
    }

    // Select the elements that have a placeholder attribute
    $('textarea[placeholder]').blur(add).focus(remove).each(add);

    // Remove the placeholder text before the form is submitted
    $('form').submit(function() {
        $(this).find('textarea[placeholder]').each(remove);
    });

    $("#deletetask").parent().hide();

    fetchTasks();

    $("#submit").click(function() {

        if ($("#taskName").val() == "" || $("#date1").val() == "" || $("#taskTime").val() == "") {
            return false;
        }

        var that = this;
        $(this).attr("disabled", true);
        setTimeout(function() {
            enableSubmit(that)
        }, 5000);

        $.ajax({
            url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/insertTask.php',
            method: 'POST',
            data: {
                taskName: $("#taskName").val(),
                date1: $("#date1").val(),
                taskTime: $("#taskTime").val(),
                radiodifficulty: $("input:radio[name=radiodifficulty]:checked").val(),
                taskdetails: $("#taskdetails").val(),
                courseID: currentCourseId,
                taskID: $("#editFlag").val()
            },
            success: function(data) {
                var json = JSON.parse(data);
                if (json.success == 1) {
                    fetchTasks();
                    $('#addTaskForm').get(0).reset();
                    $('textarea[placeholder]').blur(add).focus(remove).each(add);
                    scrollAfterEdit("#friends");
                }
            },
            error: function() {
                alert(data.message);
            }
        });


    });

    var enableSubmit = function(ele) {
        $(ele).removeAttr("disabled");
    }

    $('#join-course').click(function() {
        joinCourse(currentCourseId);
    });

    $('#leavenow').click(function() {
        $.ajax({
            //add full 
            url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/coursesActions.php',
            method: 'GET',
            data: {
                action: "leave",
                courseID: currentCourseId
            },
            success: function(data) {
                var json = JSON.parse(data);
                if (json.success == 0) {
                    setCurrentCoursePage('join');
                    $.mobile.changePage("Groups.html?b");
                }
            },
            error: function() {
                alert(data.message);
            }
        });
        $('#leave').hide();
    });

    $("#deletetask").click(function() {
        $.ajax({
            url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/deleteTask.php',
            method: 'POST',
            data: {
                id: currentTaskId,
                courseID: currentCourseId
            },
            success: function(data) {
                var json = JSON.parse(data)
                if (json.success == 1) {
                    // $("#deleteAlert").show();
                    //$('#deleteAlert').fadeOut('slow');
                    fetchTasks();
                    $('#addTaskForm').get(0).reset();
                    scrollAfterEdit("#friends");
                    $("#deletetask").parent().hide();
                } else {
                    alert("error parsing json");

                }
            },
            error: function() {
                alert.data(data.message);
            }
        });
    });
});

$(document).on("pageshow", "#courses", function() {
    $("#noCourses").hide();

    $("#search").keyup(function(e) {

        //try bind event with blur cuz maybe keyCode 13 wont work on mobile! 
        if (e.keyCode == 13) {
            e.preventDefault();
            $.ajax({
                url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/search.php',
                method: 'POST',
                data: {
                    keyword: $(this).val()
                },
                success: function(data) {
                    $("#noCourses").hide();
                    $("#coursesSug").hide();
                    $("#coursesMy").hide();
                    $('#but-my').removeClass('ui-btn-active').trigger('create');
                    $('#but-sug').addClass('ui-btn-active').trigger('create');
                    var json = JSON.parse(data)
                    if (json.success == 1) {
                        createCoursesButtons(json.searchResult, "coursesSearch");
                        $("#coursesSearch").show();
                    } else {
                        createCoursesButtons("", "coursesSearch");
                        $("#noCourses").show();
                    }
                },
                error: function() {
                    alert.data(data.message);
                }
            });
        }
    });


    if (currentCoursePage == "join") {
        $('#but-my').removeClass('ui-btn-active').trigger('create');
        $('#but-sug').addClass('ui-btn-active').trigger('create');
        $("#coursesMy").hide();
        $("#coursesSug").show();
    } else {
        $('#but-sug').removeClass('ui-btn-active').trigger('create');
        $('#but-my').addClass('ui-btn-active').trigger('create');
        $("#coursesSug").hide();
        $("#coursesMy").show();
    }

    $("#but-sug").click(function() {

        $('#but-my').removeClass('ui-btn-active').trigger('create');
        $('#but-sug').addClass('ui-btn-active').trigger('create');
        $("#coursesMy").hide();
        $("#coursesSug").show();
        $("#newGroup").hide();
        $('#MeBtn').show();
        $("#coursesSearch").hide();
    });

    $("#but-my").click(function() {

        $('#but-sug').removeClass('ui-btn-active').trigger('create');
        $('#but-my').addClass('ui-btn-active').trigger('create');
        $("#coursesSug").hide();
        $("#coursesMy").show();
        $("#newGroup").hide();
        $('#MeBtn').show();
        $("#coursesSearch").hide();
    });


    $.ajax({
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/fetchCourses.php',
        method: 'POST',
        success: function(data) {
            //alert(data);
            var json = JSON.parse(data);
            if (json.success == 1) {
                createCoursesButtons(json.userCourses, "coursesMy");
            }
            createCoursesButtons(json.courses, "coursesSug");
        },
        error: function() {
            console.log("error 1");
        }
    });

    //$("#coursesMy").hide();
});


function createCoursesButtons(coursesList, div) {

    var mainDiv = document.getElementById(div);

    mainDiv.innerHTML = "";
    console.log(mainDiv.id);
    // button for create new group
    var subDiv = document.createElement("div");
    subDiv.className = "ui-block-a";
    var courseNewdiv = document.createElement("a");
    courseNewdiv.id = "newCourseBtn";
    courseNewdiv.className = "newCourse";
    courseNewdiv.href = "";
    courseNewdiv.onclick = function() {
        $("#coursesSug").hide();
        $("#coursesMy").hide();
        $("#newGroup").show();
    };
    courseNewdiv.innerHTML = "Add a Course";

    subDiv.appendChild(courseNewdiv);
    mainDiv.appendChild(subDiv);

    if (coursesList.length == 0) {
        $('#' + div + ' a').attr("data-role", "button");
        $('#' + div).trigger('create');
        return;
    }

    var mod = 1;
    //button for the ME group
    if (div == "coursesMy") {
        mod = 0;
        var subDiv = document.createElement("div");
        var courseNewdiv = document.createElement("a");
        courseNewdiv.id = "MeBtn";
        subDiv.className = "ui-block-b";
        courseNewdiv.href = "GroupDetails.html";

        courseNewdiv.onclick = function() {
            setCurrentCourseId($(this).attr("data-ID"));
        };
        $(courseNewdiv).attr("data-ID", "-1");
        courseNewdiv.innerHTML = "<img src='images/man.png'/><br/>Personal";
        courseNewdiv.className = "courseBtn courseBtnPurple";

        subDiv.appendChild(courseNewdiv);
        mainDiv.appendChild(subDiv);
    }

    for (var i = 0; i < coursesList.length; i++) {
        var subDiv = document.createElement("div");
        var courseDiv = document.createElement("a");
        if (i % 2 == mod) {
            subDiv.className = "ui-block-a";
        } else {
            subDiv.className = "ui-block-b";
        }
        courseDiv.href = "GroupDetails.html";
        courseDiv.id = "a" + coursesList[i].courseID;
        courseDiv.onclick = function() {
            setCurrentCourseId($(this).attr("data-ID"));
        };
        $(courseDiv).attr("data-ID", coursesList[i].courseID);
        courseDiv.innerHTML = coursesList[i].name;

        var br = document.createElement("br");
        var subsubDiv = document.createElement("div");
        if (coursesList[i].count > 0) {
            subsubDiv.innerHTML = "<img src='images/man.png'/> <b>" + coursesList[i].count + "</b> Mutual Friends";
        }
        subsubDiv.className = "count_friend";
        subDiv.id = "count";

        if (i % 3 == 0) {
            courseDiv.className = "courseBtn courseBtnRed";
        } else if (i % 3 == 1) {
            courseDiv.className = "courseBtn courseBtnBlue";
        } else {
            courseDiv.className = "courseBtn courseBtnPurple";
        }
        courseDiv.appendChild(br);
        courseDiv.appendChild(subsubDiv);
        subDiv.appendChild(courseDiv);
        mainDiv.appendChild(subDiv);
    }

    $('#' + div + ' a').attr("data-role", "button");
    $("#a div").attr("class", "count_friend");
    $('#' + div).trigger('create');
}

function reformatDate(date)
{
    dateArray = date.split("-");
    return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0].substring(2);
}

function buildTasks(allTasks) {
    var table = document.getElementById("tasks-table-custom");
    table.innerHTML = "";
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < allTasks.length; i++) {
        var row = document.createElement("tr");
        var cell1Div = document.createElement("div");
        cell1Div.setAttribute("class", "btn-task");
        cell1Div.setAttribute("id", allTasks[i].index);
        var cell1 = document.createElement("td");
        var heading2 = document.createElement("h3");
        heading2.innerHTML = allTasks[i].name;
        var heading2Div = document.createElement("div");
        heading2Div.id = "diffiImg";
        var difficulty = "";
        if (allTasks[i].difficulty == 1) {
            difficulty = "<img src='images/hard_1.png'>";
        } else {
            difficulty = "<img src='images/easy_1.png'>";
        }

        heading2Div.innerHTML = difficulty;
        var dateTimeArray = (allTasks[i].due_date).split(" ");
        var date = dateTimeArray[0];
        var time = dateTimeArray[1];
        var cellText2 = document.createElement("span");
        cellText2.innerHTML = "<b>" + date + "</b> &nbsp;&nbsp;&nbsp;&nbsp;" + time;
        var cell2Div = document.createElement("div");
        cell2Div.appendChild(document.createTextNode(allTasks[i].description));
        cell1.appendChild(cellText2);
        cell1.appendChild(heading2Div);
        cell1.appendChild(heading2);
        cell1.appendChild(cell2Div);
        cell1Div.appendChild(cell1);

        var cell3Div = document.createElement("div");
        cell3Div.setAttribute("class", "actions");

        var cell2 = document.createElement("td");
        var editLink = document.createElement("a");
        $(editLink).attr('id', allTasks[i].index);
        editLink.href = "";
        editLink.innerHTML = "<img src='images/edit.png'/>";

        $(editLink).click(function() {

            $("#editFlag").val($(this).attr('id'));
            $(document).load();
            $.ajax({
                url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/editTask.php',
                method: 'POST',
                data: {
                    id: $(this).attr('id'),
                    courseID: currentCourseId
                },
                success: function(data) {
                    var json = JSON.parse(data)

                    if (json.success == 1) {
                        fillUpFieldsAfterEdit(json.tasks[0]);
                        $("#deletetask").parent().show();
                        setCurrentTaskId(json.tasks[0].index);
                        scrollAfterEdit("#elementsToOperateOn");
                    } else {
                        alert("error parsing json");
                    }
                },
                error: function(data) {
                    alert(data.message);
                }
            });
        });


        cell2.appendChild(editLink);
        cell3Div.appendChild(cell2);
        cell1Div.appendChild(cell3Div);
        row.appendChild(cell1Div);
        tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
}

function scrollAfterEdit(target) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1000);
}

function fillUpFieldsAfterEdit(json) {

    $("#taskName").val(json.name);
    $("#date1").val(json.date);
    $("#taskTime").val(json.time);
    $("#taskdetails").val(json.description);
    if (json.difficulty == 1) {
        $('#hard').attr('checked', 'checked');
    }
    else {
        $('#easy').attr('checked', 'checked');
    }
    $("input[name='radiodifficulty']").checkboxradio("refresh");
}

$(document).on("pageshow", "#courses", function() {
    $('#submit').click(function() {

        if ($("#courseName").val() == "" || $("#teacherName").val() == "") {
            return false;
        }

        $.ajax({
            //add full 
            url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/insertGroup.php',
            method: 'POST',
            data: {
                courseName: $("#courseName").val(),
                teacherName: $("#teacherName").val(),
                duration: $("input:radio[name=dur]:checked").val(),
                teacherMail: $("#teacherEmail").val()
            },
            success: function(data) {

                var json = JSON.parse(data);

                if (json.success == 1) {
                    setCurrentCourseId(json.id);
                    $.mobile.changePage("GroupDetails.html");
                } else {
                    alert("error parsing jason");
                }
            },
            error: function() {
                alert(data.message);
            }
        });
    });
});

$(document).on("pageshow", "#Notifications", function() {
    $.ajax({
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/fetchNotifications.php',
        method: 'GET',
        success: function(data) {
            var json = JSON.parse(data);

            if (json.success == 1) {

                buildNotifications(json);
            } else {
                $("#noNoti").show();
            }
        },
        error: function() {
            alert("error");
        }
    });
});

$(document).on("pageshow", "#profilePage", function() {
    $.ajax({
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/fetchProfileInfo.php',
        method: 'GET',
        success: function(data) {
            var json = JSON.parse(data);

            if (json.success == 1) {
                updateProfileInfo(json.userAlerts);
            } else {

            }
        },
        error: function() {
            alert("error");
        }
    });

    function updateProfileInfo(userAlerts) {

        if (userAlerts[0] == 1) {
            $('#flip-sound').val('on').slider("refresh");
        } else {
            $('#flip-sound').val('off').slider("refresh");
        }

        if (userAlerts[1] == 1) {
            $('#flip-custom').val('on').slider("refresh");
            var customAlert = document.getElementById("customAlert");
            customAlert.innerHTML = userAlerts[2];
        } else {
            $('#flip-custom').val('off').slider("refresh");
        }

        if (userAlerts[3] == 1) {
            $('#flip-task').val('on').slider("refresh");
        } else {
            $('#flip-task').val('off').slider("refresh");
        }

        if (userAlerts[4] == 1) {
            $('#flip-group').val('on').slider("refresh");
        } else {
            $('#flip-group').val('off').slider("refresh");
        }


    }
});

$(document).on("pagebeforehide", "#profilePage", function() {
    var sound;
    var custom;
    var days;
    var task;
    var group;

    if ($('#flip-sound').val() == "on") {
        sound = 1;
    } else {
        sound = 0;
    }

    if ($('#flip-custom').val() == 'on') {
        custom = 1;
        var customAlert = document.getElementById("customAlert");
        days = customAlert.innerHTML;
    } else {
        custom = 0;
        days = 2;
    }

    if ($('#flip-task').val() == 'on') {
        task = 1;
    } else {
        task = 0;
    }

    if ($('#flip-group').val() == 'on') {
        group = 1;
    } else {
        group = 0;
    }

    $.ajax({
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/insertProfileInfo.php',
        method: 'POST',
        data: {
            sound: sound,
            custom: custom,
            days: days,
            task: task,
            group: group,
        },
        success: function(data) {
            var json = JSON.parse(data);
            if (json.success == 1) {
                //alert("OK");
            }
            else {
                //alert("Error Inserting the Alerts");
            }
        },
        error: function() {
            alert(data.message);
        }
    });

});




function buildNotifications(data) {
//    for (var i = 0; i <= 6; i++) {
//
//        var currentDayLi = document.getElementById("" + i);
//
//        if (data[i] == null || data[i].length == 0) {
//            $(currentDayLi).hide();
//            continue;
//        }
//
//        var currentDate = new Date();
//        currentDate.setDate(currentDate.getDate() - i);
//        var currentDay = dayNumberToString(currentDate.getDay());
//        var currentMonth = monthNumberToString(currentDate.getMonth());
//        var currentMonthDay = currentDate.getDate();
//        var currentYear = currentDate.getFullYear();
//        var finalDateToDisplay = currentDay + ", " + currentMonth + " " + currentMonthDay + " " + currentYear;
//        currentDayLi.innerHTML = finalDateToDisplay;
//
//        for (var j = 0; j <= data[i].length; j++) {
//            $("#noNotifications").hide();
//            for (var j = 0; j < data[i].length; j++) {
//                currentDayLi.innerHTML += data[i][j];
//            }
//        }
//    }

    var table = document.getElementById("notifi-table-custom");
    table.innerHTML = "";
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < data.allNoti.length; i++) {
        var row = document.createElement("tr");
        var cell1Div = document.createElement("div");
        cell1Div.setAttribute("class", "btn-noti");
        var cell1 = document.createElement("td");

        cell1.innerHTML = data.allNoti[i];
        cell1Div.appendChild(cell1);

        row.appendChild(cell1Div);
        tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
    $("#notifi-table-custom").trigger('create');
}

function dayNumberToString(number)
{
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[number];
}

function monthNumberToString(number)
{
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return month[number];
}

function fetchTasks() {

    $.ajax({
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/fetchTasks.php',
        method: 'GET',
        data: {
            courseID: currentCourseId
        },
        success: function(data) {
            var json = JSON.parse(data);

            if (json.success == 1) {
                buildTasks(json.allTasks);
            } else {
                $("#tasks-table-custom").text("");
            }

            $('#images').text("");

            if (json.is_user == "1") {
                $("#join-course").hide();
                $("#addTask").show();
                $("#leave-course").show();
            } else {
                $("#leave-course").hide();
                $("#addTask").hide();
                $('.actions').hide();
                $('.share').hide();
                $("#join-course").show();
            }
            if (currentCourseId == -1) {
                $("#leave-course").hide();
                $("#inviteDiv").hide();

                if (datePv != "") {
                    $("#date1").val(datePv);
                    setDatePv("");
                }
            }

            $('#name').text(json.courseDetails.name);
            var temp = json.courseDetails.lecturer == null ? "" : json.courseDetails.lecturer;
            $('#teac_name').text(temp);

            if (currentCourseId != -1) {
                temp = json.courseDetails.teacherEmail == null ? "" : " / " + json.courseDetails.teacherEmail;
                $('#email').text(temp);

                if (json.is_user == "1") {
                    $('#images').append('<img src="https://graph.facebook.com/' + localStorage.getItem("ID") + '/picture?width=60&height=60" class="FBimg"/>');
                }
                $.each(json.friends, function(i, val) {
                    if (i == 2) {
                        $('#images').append("<div id='moreFBdiv'></div>");
                        $('#moreFBdiv').append('<img src="https://graph.facebook.com/' + val + '/picture?width=60&height=60" class="FBimg"/>');
                    } else if (i > 2) {
                        $('#moreFBdiv').append('<img src="https://graph.facebook.com/' + val + '/picture?width=60&height=60" class="FBimg"/>');
                    } else {
                        $('#images').append('<img src="https://graph.facebook.com/' + val + '/picture?width=60&height=60" class="FBimg"/>');
                    }
                });

                if (json.friends.length > 2) {
                    $('#images').append("<a href='' data-role='button' data-inline='true' id='moreFB' onclick='more(true)'><img src='images/man_purple.png'><br/> + " + (json.friends.length - 2) + "</a>");
                    $('#moreFBdiv').append("<br/><a href='' id='closeFB' onclick='more(false);'>X Close</a>");
                }
                if (json.is_user == "1") {
                    $('#images').append("<a href='' data-role='button' data-inline='true' id='addFB' onclick='invite()'> Add friends</a>");
                }
                $('#images').trigger('create');

            }

            if (currentTaskId != "") {
                setCurrentTaskId("");
            }


        },
        error: function() {
            alert("error in fetch tasks");
        }
    });
}

function more(bool) {
    if (bool) {
        $('#moreFBdiv').show();
        $('#moreFB').hide();
        $('#addFB').hide();
    } else {
        $('#moreFBdiv').hide();
        $('#moreFB').show();
        $('#addFB').show();
    }
}

function joinCourse(id) {
    $.ajax({
        //add full 
        url: 'http://ronnyuri.milab.idc.ac.il/milab_2014/php/coursesActions.php',
        method: 'GET',
        data: {
            action: "join",
            courseID: id
        },
        success: function(data) {
            var json = JSON.parse(data);
            if (json.success == 0) {
                setCurrentCourseId(id);
                $.mobile.changePage("GroupDetails.html?a");
            }
        },
        error: function() {
            alert(data.message);
        }
    });
}