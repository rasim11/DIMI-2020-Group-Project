function setFilterParamAuth() {
    document.getElementById("ch0").checked = document.getElementById("checkbox0").checked;
    document.getElementById("ch1").checked = document.getElementById("checkbox1").checked;
    document.getElementById("ch2").checked = document.getElementById("checkbox2").checked;
    document.getElementById("ch3").checked = document.getElementById("checkbox3").checked;
    document.getElementById("ch4").checked = document.getElementById("checkbox4").checked;
    document.getElementById("ch5").checked = document.getElementById("checkbox5").checked;
    document.getElementById("ch6").checked = document.getElementById("checkbox6").checked;
    document.getElementById("ch7").checked = document.getElementById("checkbox7").checked;
    document.getElementById("ch8").checked = document.getElementById("checkbox8").checked;
     document.getElementById("da1").value = document.getElementById("date1").value
    document.getElementById("da2").value = document.getElementById("date2").value

    document.getElementById("inpAuthForm").value = document.getElementById("InputAuthor").value
    document.getElementById("inpRespForm").value = document.getElementById("InputResponse").value

    var radio;

    radio = document.getElementById("radioAllProblems");
    if (radio != undefined) document.getElementById("radioAP").checked = radio.checked;

    radio = document.getElementById("radioMyProblems");
    if (radio != undefined) document.getElementById("radioMP").checked = radio.checked;

    radio = document.getElementById("radioSubscribeProblems");
    if (radio != undefined) document.getElementById("radioSP").checked = radio.checked;

    radio = document.getElementById("radioMyProblemsForStaff");
    if (radio != undefined) document.getElementById("radioMAP").checked = radio.checked;

}

function resetChecked() {
    document.getElementById("checkbox0").checked = false;
    document.getElementById("checkbox1").checked = false;
    document.getElementById("checkbox2").checked = false;
    document.getElementById("checkbox3").checked = false;
    document.getElementById("checkbox4").checked = false;
    document.getElementById("checkbox5").checked = false;
    document.getElementById("checkbox6").checked = false;
    document.getElementById("checkbox7").checked = false;
    document.getElementById("checkbox8").checked = false;

    document.getElementById("date1").value = "";
    document.getElementById("date2").value = "";

    document.getElementById("InputAuthor").value = ""
    document.getElementById("InputResponse").value = ""

    document.getElementById("radioAllProblems").checked = true
    document.getElementById("radioMyProblems").checked = false
    document.getElementById("radioSubscribeProblems").checked = false
}


function setPage(val) {
    var page = document.getElementById("page");
    page.value = val;

    console.log("pageButtonClick")
    if (isEmpty()) {
        console.log("isEmpty")
        var str = $("#pageForm").serialize();
        $.ajax({
            method: 'post',
            dataType: 'html',
            data: str,
            success: function (data) {
                $('#listTaskId').html(data);
            }
        });
    } else {
        console.log("is not Empty")
        var str = $("#formFilterConst, #pageForm").serialize();

        $.ajax({
            method: 'post',
            dataType: 'html',
            data: str,
            url: "/api/v1/main-page/filter",
            success: function (data) {
                $('#listTaskId').html(data);
                // document.getElementById("tasks").value = document.getElementById("testMap");
            }
        });
    }
}

function isEmpty() {
    let arr = new Array();
    arr.push(document.getElementById("ch0"));
    arr.push(document.getElementById("ch1"));
    arr.push(document.getElementById("ch2"));
    arr.push(document.getElementById("ch3"));
    arr.push(document.getElementById("ch4"));
    arr.push(document.getElementById("ch5"));
    arr.push(document.getElementById("ch6"));
    arr.push(document.getElementById("ch7"));
    arr.push(document.getElementById("ch8"));

    let arrDate = new Array();
    arrDate.push(document.getElementById("da1"));
    arrDate.push(document.getElementById("da2"));


    var filterEmpty = true;

    var size = arr.length;
    for (var i = 0; i < size; ++i) {
        if (arr[i].checked == true) {
            filterEmpty = false;
            break;
        }
    }

    size = arrDate.length;
    console.log("size arrDate " + size);

    for (var i = 0; i < size; ++i) {
        console.log("filterEmpty arrDate " + i + " " + arrDate[i].value);
        if (arrDate[i].value != null) {
            if (arrDate[i].value.length > 0) {
                filterEmpty = false;
                break;
            }
        }
    }


    if (document.getElementById("inpAuthForm").value != "") {
        filterEmpty = false;
        console.log("  inpAuthForm empty = false; ");
    }

    if (document.getElementById("inpRespForm").value != "") {
        filterEmpty = false;
        console.log("  inpRespForm empty = false; ");
    }

    if (document.getElementById("radioAllProblems").checked == false)
        filterEmpty = false;

    return filterEmpty;
}


function pageButtonClick() {
    console.log("pageButtonClick")
    if (isEmpty()) {
        var str = $("#pageForm").serialize();
        $.ajax({
            method: 'post',
            dataType: 'html',
            data: str,
            success: function (data) {
                $('#listTaskId').html(data);
            }
        });
    }
}

function findFormPost() {

    var textFind = document.getElementById("textFind")

    if (textFind.value != "") {
        var str = $("#findForm").serialize();

        $.ajax({
            method: 'post',
            dataType: 'html',
            data: str,
            url: "/api/v1/main-page/find",
            success: function (data) {
                $('#listTaskId').html(data);
            }
        });
    } else {
        setPage(1);
    }
}

function getMyTaskList() {
    var userIdVal = document.getElementById("userId");
    console.log("getMyTaskList")
    $.ajax({
        method: 'get',
        dataType: 'html',
        data: {userId: userIdVal.value},
        url: "/api/v1/main-page/filterMyProblems",
        success: function (data) {
            $('#listTaskId').html(data);
        }
    });

    var radio = document.getElementById("radioMyProblems");
    if (radio != undefined) radio.checked = true;
    radio = document.getElementById("radioMP");
    if (radio != undefined) radio.checked = true;
}

function getMySubsList() {
    var userIdVal = document.getElementById("userId");
    console.log("getMyTaskList")
    $.ajax({
        method: 'get',
        dataType: 'html',
        data: {userId: userIdVal.value},
        url: "/api/v1/main-page/filterSubsProblems",
        success: function (data) {
            $('#listTaskId').html(data);
        }
    });

    var radio = document.getElementById("radioSubscribeProblems");
    if (radio != undefined) radio.checked = true;
    radio = document.getElementById("radioSP");
    if (radio != undefined) radio.checked = true;

}

function getMyTasksStaff() {
    var userIdVal = document.getElementById("userId");
    console.log("getMyTaskList")
    $.ajax({
        method: 'get',
        dataType: 'html',
        data: {userId: userIdVal.value},
        url: "/api/v1/main-page/filterMyProblemsStaff",
        success: function (data) {
            $('#listTaskId').html(data);
        }
    });

    var radio = document.getElementById("radioMyProblemsForStaff");
    if (radio != undefined) radio.checked = true;
    radio = document.getElementById("radioMAP");
    if (radio != undefined) radio.checked = true;
}

function getOtherUserTasks(valueId) {
    var userIdVal = valueId
    console.log("otherUserTasks")
    $.ajax({
        method: 'get',
        dataType: 'html',
        data: {userId: userIdVal},
        url: "/api/v1/main-page/otherUserTasks",
        success: function (data) {
            $('#listTaskId').html(data);
        }
    });

    var radio = document.getElementById("radioMyProblemsForStaff");
    if (radio != undefined) radio.checked = true;
    radio = document.getElementById("radioMAP");
    if (radio != undefined) radio.checked = true;
}

