const LOCAL_URL_USER_PROFILE = API + VERSION + USER_MANAGEMENT + USER_GET + BY_ID;

const maxCountComments = 10;
const inputTaskId = "input-task-id";
const inputCurUserId = "input-cur-user-id";
const divFeedbackId = "div-feedback";
const textareaCommentTextId = "textarea-comment-text";
const textareaFeedbackId = "textarea-feedback";
const divCommentBoxId = "div-comment-box"
const divPrintCommentsId = "div-print-comments";
const divCommentClass = "div-any-comment";
const btnSaveFeedbackId = "btn-save-feedback";
const btnCancelTaskId = "btn-cancel-task";
const spanCommentsCountId = "span-comments-count";
const spanStatusId = "span-status";
const aDropdownMenuProblemsId = "a-dropdown-menu-problems";
const btnSaveId = "btn-save";
let taskId;
let curUserId;
let taskFeedback = [];
let taskComments = [];
let subscriptionCount;


function postComment(elementId = textareaCommentTextId, tag = "") {
    const commentText = document.getElementById(elementId);
    const xhr = new XMLHttpRequest();
    const strArray = [commentText.value, taskId, tag].join("&&&");

    xhr.open('POST', URL_POST_COMMENT, false);
    xhr.send(strArray);

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        commentText.value = "";
    }
}

function getTaskComments(taskId) {
    const commentBox = document.getElementById(divCommentBoxId);
    if (!commentBox) {
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_GET_COMMENT_BY_TASK_ID + "/" + taskId, false);
    xhr.send();

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
        return null;
    } else {
        taskComments = JSON.parse(xhr.responseText);
    }
}

function cancelCommentBtn() {
    const commentText = document.getElementById(textareaCommentTextId);
    commentText.value = "";
}

function printComments() {
    getTaskComments(taskId);

    const allComments = document.getElementById(divPrintCommentsId);
    allComments.innerHTML = "";

    for (let i = 0; i < taskComments.length; i++) {
        const anyComment = document.createElement("div");
        anyComment.style.display = "flex";
        anyComment.style.width = "100%";

        if (!taskComments[i].tag) {
            anyComment.className = divCommentClass + " pb-4";
            allComments.prepend(anyComment);
        } else {
            const divFeedback = document.createElement("div");
            divFeedback.className = "bg-success mb-4";
            divFeedback.style.borderRadius = "15px";
            divFeedback.style.padding = "10px";
            allComments.prepend(divFeedback);

            const feedbackTitle = document.createElement("h5");
            if (taskComments[i].tag === "Отзыв") {
                feedbackTitle.textContent = "Отзыв автора";
            } else if (taskComments[i].tag === "Отменена") {
                feedbackTitle.textContent = "Причина отмены";
            } else {
                feedbackTitle.textContent = "Причина отклонения";
            }
            divFeedback.append(feedbackTitle);

            anyComment.className = divCommentClass;
            anyComment.style.padding = "10px";
            anyComment.style.borderRadius = "15px";
            anyComment.style.backgroundColor = "white";
            divFeedback.append(anyComment);
        }

        let aUserProfile = null;
        if (taskComments[i].author) {
            aUserProfile = document.createElement("a");
            aUserProfile.href = LOCAL_URL_USER_PROFILE + "/" + taskComments[i].author.id;
            aUserProfile.style.width = "40px";
            anyComment.append(aUserProfile);
        }

        const userImage = document.createElement("img");
        userImage.className = "comment-author-img";

        if (aUserProfile) {
            userImage.src = taskComments[i].author.userImage;
            aUserProfile.append(userImage);
        } else {
            userImage.src = "/img/default-user.png";
            userImage.style.width = "40px";
            anyComment.append(userImage);
        }

        const commentCreatorInfo = document.createElement("div");
        commentCreatorInfo.style.width = "100%";
        commentCreatorInfo.className = "pl-2";
        anyComment.append(commentCreatorInfo);

        const divUserName = document.createElement("div");
        divUserName.style.display = "inline-block";
        commentCreatorInfo.append(divUserName);

        const authorFirstname = document.createElement("span");
        authorFirstname.textContent = taskComments[i].author ? taskComments[i].author.firstname : "Аккаунт удалён";
        authorFirstname.className = "font-weight-bold";
        divUserName.append(authorFirstname);

        if (taskComments[i].author) {
            const authorRole = document.createElement("span");
            authorRole.textContent = " (" + getRoleName(taskComments[i].author.role) + ")";
            divUserName.append(authorRole);

            if (taskComments[i].author.appointment) {
                const authorAppointment = document.createElement("span");
                authorAppointment.textContent = " " + taskComments[i].author.appointment;
                commentCreatorInfo.append(authorAppointment);

                divUserName.style.display = "block";
            }
        }

        const commentDateTime = document.createElement("span");
        let regDate = new Date(taskComments[i].publishDate);
        commentDateTime.textContent = ("0" + (regDate.getDate())).slice(-2) + "." +
            ("0" + (regDate.getMonth() + 1)).slice(-2) + "." +
            regDate.getFullYear() + " " + ("0" + (regDate.getHours())).slice(-2) + ":" +
            ("0" + (regDate.getMinutes())).slice(-2);
        commentDateTime.className = "ml-3";
        commentDateTime.style.float = "right";
        commentCreatorInfo.append(commentDateTime);

        const commentText = document.createElement("textarea");
        commentText.className = "form-control";
        commentText.value = taskComments[i].comment;
        commentText.disabled = true;
        commentText.style.minHeight = "70px";
        commentText.style.cursor = "text";
        commentText.style.backgroundColor = "ghostwhite";
        commentCreatorInfo.append(commentText);
    }

    const spanComments = document.getElementById(spanCommentsCountId);
    if (spanComments) {
        spanComments.textContent = "Всего комментариев: " + taskComments.length;
    }

    activationScrollBarExt();
}

function calledOnLoad() {
    const inputTask = document.getElementById(inputTaskId);
    taskId = inputTask.value;
    inputTask.remove();

    const inputTaskFeedback = document.getElementById(divFeedbackId);
    if (inputTaskFeedback) {
        const elements = inputTaskFeedback.querySelectorAll("input");
        for (let i = 0; i < elements.length; i++) {
            taskFeedback[i] = elements[i].value;
        }
        inputTaskFeedback.remove();
    }

    const commentBox = document.getElementById(divCommentBoxId);
    if (commentBox) {
        printComments();
    }

    subscriptionCount = getAllObjectsFromRequest(URL_GET_SUBSCRIPTIONS_BY_TASK_ID +
        "/" + taskId).length;
    const inputCurUser = document.getElementById(inputCurUserId);
    if (inputCurUser) {
        const btnSubscription = document.createElement("button");
        btnSubscription.type = "button";
        inputCurUser.after(btnSubscription);

        curUserId = inputCurUser.value;
        inputCurUser.remove();

        getSubscriptionByTaskId(btnSubscription);
    } else {
        const spanSubscription = document.createElement("span");
        spanSubscription.className = "btn btn-secondary mb-2";
        spanSubscription.textContent = subscriptionCount + " | Подписано";
        spanSubscription.style.cursor = "text";
        spanSubscription.style.userSelect = "auto";
        document.getElementById("div-btn-actions").append(spanSubscription);
    }

    const divHistory = document.getElementById("history-box");
    const aHistory = document.getElementById("nav-history-tab");
    if (aHistory && !document.getElementById("nav-comment-tab")) {
        aHistory.className += " active";
        divHistory.className += " active";
    }
}

function activationScrollBarExt() {
    const divPrintCommentsElements = document.querySelectorAll("#" + divPrintCommentsId + "> *");
    if (divPrintCommentsElements.length > maxCountComments) {
        activationScrollBar(divPrintCommentsId, maxCountComments, divCommentClass);
    }
}

function showFeedbackWindow(btn, text) {
    let placeholder, tag, user = getAllObjectsFromRequest(URL_GET_CUR_USER);
    user = [user.userImage, user.firstname];

    if (btn.id === btnSaveFeedbackId) {
        tag = "Отзыв";
        placeholder = "Текст отзыва";
    } else if (btn.id === btnCancelTaskId) {
        tag = "Отменена";
        placeholder = "Причина отмены";
    } else {
        tag = "Отклонена";
        placeholder = "Причина отклонения";
    }

    const divMainBlock = document.getElementById(divMainBlockId);

    const divMainWindow = document.createElement("div");
    divMainWindow.className = "custom-modal-window";
    divMainBlock.append(divMainWindow);

    const divFeedbackWindow = document.createElement("div");
    divFeedbackWindow.style.textAlign = "center";
    divFeedbackWindow.id = divDynamicWindowId;
    divMainWindow.append(divFeedbackWindow);

    addCloseBtn(divFeedbackWindow, divMainWindow);

    const windowTitle = document.createElement("h3");
    windowTitle.innerText = text;
    divFeedbackWindow.append(windowTitle);

    const userImg = document.createElement("img");
    userImg.src = user[0];
    userImg.className = "comment-author-img";
    divFeedbackWindow.append(userImg);

    const divFeedbackText = document.createElement("div");
    divFeedbackText.style.display = "inline-block";
    divFeedbackText.style.marginLeft = "10px";
    divFeedbackText.style.textAlign = "start";
    userImg.after(divFeedbackText);

    const spanAuthor = document.createElement("span");
    spanAuthor.className = "font-weight-bold";
    spanAuthor.textContent = user[1];
    divFeedbackText.append(spanAuthor);

    const textareaFeedback = document.createElement("textarea");
    textareaFeedback.id = textareaFeedbackId;
    textareaFeedback.className = "form-control";
    textareaFeedback.style.width = "600px";
    textareaFeedback.style.minHeight = "100px";
    textareaFeedback.style.maxHeight = "400px";
    textareaFeedback.style.overflow = "auto";
    textareaFeedback.placeholder = placeholder;
    textareaFeedback.oninput = checkEmpty.bind(null, textareaFeedback);
    divFeedbackText.append(textareaFeedback);

    const btnSave = document.createElement("button");
    btnSave.type = "button";
    btnSave.className = "btn btn-primary mt-4";
    btnSave.textContent = "Сохранить";
    btnSave.onclick = function () {
        if (textareaFeedback.value) {
            postComment(textareaFeedbackId, tag);

            if (btn.value) {
                const xhr = new XMLHttpRequest();
                const strArray = [taskId, btn.value].join("&&&");
                xhr.open('PUT', URL_CHANGE_TASK_STATUS, false);
                xhr.send(strArray);

                if (xhr.status !== 200) {
                    alert(xhr.status + ': ' + xhr.statusText);
                }
            }

            window.location.reload();
        } else {
            setInvalidFormat(textareaFeedback, "Текст отсутствует");
        }
    };
    divFeedbackWindow.append(btnSave);

    setTimeout(function () {
        divMainWindow.classList.add('show');
    }, 10);
}

function isCommentValid(comment) {
    const btn = document.querySelector(".comment").querySelectorAll("button");
    btn[0].disabled = !(comment.value && comment.value.trim() !== "");
    btn[1].disabled = btn[0].disabled;
}

function getSubscriptionByTaskId(btn) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_GET_SUBSCRIPTION_BY_TASK_USER_IDS + "/" + taskId + "&" + curUserId, false);
    xhr.send();

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        if (xhr.responseText) {
            const subscription = JSON.parse(xhr.responseText);

            btn.textContent = subscriptionCount + " | Отписаться";
            btn.className = "btn btn-outline-danger";
            btn.onclick = function () {
                subscriptionCount = getAllObjectsFromRequest(URL_GET_SUBSCRIPTIONS_BY_TASK_ID +
                    "/" + taskId).length - 1;

                const xhr = new XMLHttpRequest();
                xhr.open('DELETE', URL_DELETE_SUBSCRIPTION_BY_ID + "/" + subscription.id, false);
                xhr.send();

                if (xhr.status !== 200) {
                    alert(xhr.status + ': ' + xhr.statusText);
                } else {
                    getSubscriptionByTaskId(btn);
                }
            }
        } else if (!["Устранена", "Отменена", "Отклонена", "Отменена как дубликат"].includes(
            document.getElementById(spanStatusId).innerText.split(": ")[1])) {
            btn.textContent = subscriptionCount + " | Подписаться";
            btn.className = "btn btn-outline-success";
            btn.onclick = function () {
                subscriptionCount = getAllObjectsFromRequest(URL_GET_SUBSCRIPTIONS_BY_TASK_ID +
                    "/" + taskId).length + 1;

                const xhr = new XMLHttpRequest();
                const strArray = [taskId, curUserId].join("&&&");
                xhr.open('POST', URL_POST_SUBSCRIPTION, false);
                xhr.send(strArray);

                if (xhr.status !== 200) {
                    alert(xhr.status + ': ' + xhr.statusText);
                } else {
                    getSubscriptionByTaskId(btn);
                }
            }
        } else {
            const divActionsElements = btn.parentNode.parentNode;
            btn.parentNode.remove();

            if (divActionsElements.querySelectorAll("*").length === 0) {
                document.getElementById("div-actions").parentNode.remove();
            }
        }
    }
}

function changeAttr(btn, obj) {
    let url;
    if (obj === "deputy") {
        url = URL_CHANGE_TASK_DEPUTY;
    } else if (obj === "priority") {
        url = URL_CHANGE_TASK_PRIORITY;
    } else {
        url = URL_CHANGE_TASK_STATUS;
    }

    const xhr = new XMLHttpRequest();
    const strArray = [taskId, btn.value].join("&&&");
    xhr.open('PUT', url, false);
    xhr.send(strArray);

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        window.location.reload();
    }
}

function checkedStatus(btn) {
    if (["CANCELED_AS_DUPLICATE", "BLOCKED"].includes(btn.value)) {
        linkedTask(btn, true);
    } else {
        changeAttr(btn, "status");
    }
}

function linkedTask(btn, isChangeStatus) {
    const tasks = getAllObjectsFromRequest(URL_GET_TASKS);
    let selectedTaskIds = [], selectedTask;

    if (tasks.length !== 1) {
        const divMainBlock = document.getElementById(divMainBlockId);

        const divMainWindow = document.createElement("div");
        divMainWindow.className = "custom-modal-window";
        divMainBlock.append(divMainWindow);

        const divDynamicWindow = document.createElement("div");
        divDynamicWindow.id = divDynamicWindowId;
        divDynamicWindow.style.width = window.getComputedStyle(document.querySelector(".form-data"),
            null).width;
        divMainWindow.append(divDynamicWindow);

        addCloseBtn(divDynamicWindow, divMainWindow);

        const windowTitle = document.createElement("h3");
        divDynamicWindow.append(windowTitle);

        const hr = document.createElement("hr");
        divDynamicWindow.append(hr);

        const divBody = document.createElement("div");
        divBody.className = "mb-4";
        divBody.style.display = "flex";
        divBody.style.width = "100%";
        divDynamicWindow.append(divBody);

        const spanDescription = document.createElement("span");
        spanDescription.className = "mr-2";
        spanDescription.innerText = "Выбирите проблемы из списка:";
        spanDescription.style.whiteSpace = "nowrap";
        divBody.append(spanDescription);

        const divSelectedProblems = document.createElement("div");
        divSelectedProblems.className = "form-control";
        divSelectedProblems.style.height = "auto";
        divBody.append(divSelectedProblems);

        if (btn.value === "CANCELED_AS_DUPLICATE") {
            windowTitle.textContent = "Выбор дублируемых проблем";
            selectedTask = getAllObjectsFromRequest(URL_GET_ORIGIN_BY_DUPLICATE + "/" + taskId);
        } else if (btn.value === "BLOCKED") {
            windowTitle.textContent = "Выбор блокирующих проблем";
            selectedTask = getAllObjectsFromRequest(URL_GET_FIRST_BY_BLOCKED + "/" + taskId);
        } else {
            windowTitle.textContent = "Выбор связанных проблем";
            selectedTask = getAllObjectsFromRequest(URL_GET_LINKED_TASKS + "/" + taskId);
        }

        if (selectedTask.length !== 0) {
            selectedTaskIds = selectedTask.map(a => a.id);

            for (let i = 0; i < selectedTask.length; i++) {
                addLinkedTask(divBody, divSelectedProblems, selectedTask[i].taskName, selectedTask[i].id, isChangeStatus);
            }
        }
        selectedTaskIds.push(Number(taskId));

        if (tasks.length !== selectedTaskIds.length) {
            addListProblems(divBody);
            const divListProblems = divBody.querySelector(".dropdown-menu");

            for (let i = 0; i < tasks.length; i++) {
                if (selectedTaskIds.includes(tasks[i].id)) {
                    continue;
                }

                const btnTask = document.createElement("button");
                btnTask.className = "dropdown-item";
                btnTask.type = "button";
                btnTask.value = tasks[i].id;
                btnTask.textContent = tasks[i].taskName;
                btnTask.onclick = onClickBtnDropdownProblems.bind(null, divBody, divSelectedProblems, btnTask,
                    isChangeStatus);
                divListProblems.append(btnTask);
            }
        }

        const btnSave = document.createElement("button");
        btnSave.disabled = isChangeStatus && divSelectedProblems.querySelectorAll("*").length === 0;
        btnSave.type = "button";
        btnSave.id = btnSaveId;
        btnSave.className = "btn btn-primary mb-4";
        btnSave.textContent = "Сохранить";
        btnSave.style.display = "block";
        btnSave.style.margin = "0 auto";
        btnSave.onclick = function () {
            let url;
            if (btn.value === "CANCELED_AS_DUPLICATE") {
                url = URL_POST_DUPLICATES_TASKS;
            } else if (btn.value === "BLOCKED") {
                url = URL_POST_BLOCKED_TASKS;
            } else {
                url = URL_POST_LINKED_TASKS;
            }

            const xhr = new XMLHttpRequest();
            let strArr = taskId + "&&&";

            const selectedProblems = divSelectedProblems.querySelectorAll("button");
            for (let i = 0; i < selectedProblems.length; i++) {
                strArr += selectedProblems[i].value + "&&&";
            }

            xhr.open('POST', url, false);
            xhr.send(strArr);

            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                if (!btn.value) {
                    window.location.reload();
                } else {
                    changeAttr(btn, "status");
                }

            }
        };
        divDynamicWindow.append(btnSave);

        setTimeout(function () {
            divMainWindow.classList.add('show');
        }, 10);
    }

}

function addListProblems(parentDiv) {
    const divProblems = document.createElement("div");
    divProblems.className = "dropdown";
    parentDiv.append(divProblems);

    const aShowProblems = document.createElement("a");
    aShowProblems.className = "btn dropdown-toggle";
    aShowProblems.type = "button";
    aShowProblems.id = aDropdownMenuProblemsId;
    aShowProblems.setAttribute("data-toggle", "dropdown");
    aShowProblems.setAttribute("aria-haspopup", "true");
    aShowProblems.setAttribute("aria-expanded", "false");
    divProblems.append(aShowProblems);

    const divListProblems = document.createElement("div");
    divListProblems.className = "dropdown-menu";
    divListProblems.style.minWidth = "25rem";
    divListProblems.style.padding = ".5rem";
    divListProblems.setAttribute("aria-labelledby", aDropdownMenuProblemsId);
    divProblems.append(divListProblems);

    const inputSearchStr = document.createElement("input");
    inputSearchStr.type = "text";
    inputSearchStr.placeholder = "Введите название проблемы";
    inputSearchStr.className = "dropdown-item";
    inputSearchStr.style.paddingRight = "35px";
    inputSearchStr.oninput = function () {
        const problems = divListProblems.querySelectorAll("button");
        for (let i = 0; i < problems.length; i++) {
            problems[i].style.display =
                problems[i].innerText.toLowerCase().includes(inputSearchStr.value.toLowerCase()) ?
                    "block" : "none";
        }
    }
    divListProblems.append(inputSearchStr);

    const hr = document.createElement("hr");
    inputSearchStr.after(hr);
}

function onClickBtnDropdownProblems(divBody, divSelectedProblems, btnTask, isChangeStatus) {
    addLinkedTask(divBody, divSelectedProblems, btnTask.innerText, btnTask.value, isChangeStatus);

    document.getElementById(btnSaveId).disabled = false;
    btnTask.remove();

    if (divBody.querySelector(".dropdown-menu").querySelectorAll("button").length === 0) {
        divBody.querySelector(".dropdown").remove();
    }
}

function addLinkedTask(divBody, divSelectedProblems, taskName, selectedTaskId, isChangeStatus) {
    const divSelectedTask = document.createElement("div");
    divSelectedTask.style.display = "inline-block";
    divSelectedTask.className = "p-1 mb-2 mr-2";
    divSelectedTask.style.border = "1px solid";
    divSelectedTask.style.borderRadius = ".25rem";
    divSelectedProblems.append(divSelectedTask);

    const spanTaskName = document.createElement("span");
    spanTaskName.className = "mr-1";
    spanTaskName.textContent = taskName + " |";
    divSelectedTask.append(spanTaskName);

    const btnRemoveSelectedTask = document.createElement("button");
    btnRemoveSelectedTask.type = "button";
    btnRemoveSelectedTask.className = "btn btn-outline-secondary font-weight-bold";
    btnRemoveSelectedTask.style.fontSize = "18px";
    btnRemoveSelectedTask.style.padding = "0 .5rem";
    btnRemoveSelectedTask.style.border = "none";
    btnRemoveSelectedTask.textContent = "x";
    btnRemoveSelectedTask.value = selectedTaskId;
    btnRemoveSelectedTask.onclick = function () {
        if (!divBody.querySelector(".dropdown")) {
            addListProblems(divBody);
        }
        const divListProblems = divBody.querySelector(".dropdown-menu");

        const newBtnTask = document.createElement("button");
        newBtnTask.className = "dropdown-item";
        newBtnTask.type = "button";
        newBtnTask.value = selectedTaskId;
        newBtnTask.textContent = taskName;
        newBtnTask.onclick = onClickBtnDropdownProblems.bind(null, divBody, divSelectedProblems, newBtnTask,
            isChangeStatus);
        divListProblems.append(newBtnTask);

        divSelectedTask.remove();
        document.getElementById(btnSaveId).disabled = isChangeStatus &&
            divSelectedProblems.querySelectorAll("*").length === 0;
    };
    divSelectedTask.append(btnRemoveSelectedTask);
}