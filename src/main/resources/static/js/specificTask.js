const LOCAL_URL_USER_PROFILE = API + VERSION + USER_MANAGEMENT + USER_GET + BY_ID;
const LOCAL_URL_GET_TASK_BY_ID = API + VERSION + TASK_MANAGEMENT + TASK_GET + BY_ID;

const maxCountComments = 10;
const inputTaskId = "input-task-id";
const inputCurUserId = "input-cur-user-id";
const divFeedbackId = "div-feedback";
const divAuthorId = "div-author";
const textareaCommentTextId = "textarea-comment-text";
const textareaFeedbackId = "textarea-feedback";
const divCommentBoxId = "div-comment-box"
const divPrintCommentsId = "div-print-comments";
const divCommentClass = "div-any-comment";
const btnSaveFeedbackId = "btn-save-feedback";
const btnShowFeedbackId = "btn-show-feedback";
const btnCancelTaskId = "btn-cancel-task";
const btnCancellationReasonId = "btn-cancellation-reason";
const btnSubscriptionId = "btn-subscription";
const spanStatusId = "span-status";
let taskId;
let curUserId;
let taskFeedback = [];
let taskComments = [];
let authorAtr = [];


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
        anyComment.style.display = "table";
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
            feedbackTitle.textContent = taskComments[i].tag === "Причина" ? "Причина отмены" : "Отзыв автора";
            divFeedback.append(feedbackTitle);

            anyComment.className = divCommentClass;
            anyComment.style.padding = "10px";
            anyComment.style.borderRadius = "15px";
            anyComment.style.backgroundColor = "white";
            divFeedback.append(anyComment);
        }


        const aUserProfile = document.createElement("a");
        aUserProfile.href = LOCAL_URL_USER_PROFILE + "/" + taskComments[i].author.id;
        aUserProfile.style.display = "table-cell";
        aUserProfile.style.width = "40px";
        anyComment.append(aUserProfile);

        const userImage = document.createElement("img");
        userImage.className = "comment-author-img";
        userImage.src = taskComments[i].author.userImage;
        aUserProfile.append(userImage);

        const commentCreatorInfo = document.createElement("div");
        commentCreatorInfo.style.display = "table-cell";
        commentCreatorInfo.className = "pl-2";
        anyComment.append(commentCreatorInfo);

        const authorFirstname = document.createElement("span");
        authorFirstname.textContent = taskComments[i].author.firstname;
        authorFirstname.className = "font-weight-bold";
        commentCreatorInfo.append(authorFirstname);

        const commentDateTime = document.createElement("span");
        let regDate = new Date(taskComments[i].publishDate);
        commentDateTime.textContent = ("0" + (regDate.getDate())).slice(-2) + "." +
            ("0" + (regDate.getMonth() + 1)).slice(-2) + "." +
            regDate.getFullYear() + " " + ("0" + (regDate.getHours())).slice(-2) + ":" +
            ("0" + (regDate.getMinutes())).slice(-2);
        commentDateTime.className = "ml-3";
        commentCreatorInfo.append(commentDateTime);

        const commentText = document.createElement("textarea");
        commentText.className = "form-control";
        commentText.value = taskComments[i].comment;
        commentText.readOnly = true;
        commentText.style.minHeight = "70px";
        commentCreatorInfo.append(commentText);
    }

    const commentBox = document.getElementById(divCommentBoxId);
    commentBox.querySelector("span").textContent = "Всего комментариев: " + taskComments.length;

    activationScrollBarExt();
}

function calledOnLoad() {
    const inputTask = document.getElementById(inputTaskId);
    taskId = inputTask.value;
    inputTask.remove();

    const divAuthor = document.getElementById(divAuthorId);
    if (divAuthor) {
        const elements = divAuthor.querySelectorAll("input");
        for (let i = 0; i < elements.length; i++) {
            authorAtr[i] = elements[i].value;
        }
        divAuthor.remove();
    } else {
        authorAtr[0] = "/img/default-user.png";
        authorAtr[1] = "Аккаунт был удалён";
    }

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

    const btnSubscription = document.getElementById(btnSubscriptionId);
    if (btnSubscription) {
        const inputCurUser = document.getElementById(inputCurUserId);
        curUserId = inputCurUser.value;
        inputCurUser.remove();

        getSubscriptionByTaskId(btnSubscription);
    }
}

function activationScrollBarExt() {
    const divPrintCommentsElements = document.querySelectorAll("#" + divPrintCommentsId + "> *");
    if (divPrintCommentsElements.length > maxCountComments) {
        activationScrollBar(divPrintCommentsId, maxCountComments, divCommentClass);
    }
}

function showFeedbackWindow(btn, text) {
    const divMainBlock = document.getElementById(divMainBlockId);

    const divMainWindow = document.createElement("div");
    divMainWindow.className = "feedback-window";
    divMainBlock.append(divMainWindow);

    const divFeedbackWindow = document.createElement("div");
    divFeedbackWindow.style.textAlign = "center";
    divFeedbackWindow.id = divDynamicWindowId;
    divMainWindow.append(divFeedbackWindow);

    addCloseBtn(divFeedbackWindow, divMainWindow);

    const windowTitle = document.createElement("h3");
    windowTitle.innerText = text;
    divFeedbackWindow.append(windowTitle);

    let blockFeedback;
    if ([btnSaveFeedbackId, btnCancelTaskId].includes(btn.id)) {
        blockFeedback = document.createElement("form");
        blockFeedback.method = "get";
        blockFeedback.action = LOCAL_URL_GET_TASK_BY_ID + "/" + taskId;
        blockFeedback.onsubmit = function (e) {
            e.preventDefault();
            if (textareaFeedback.value) {
                postFeedback(divMainWindow, btn);
                const tag = btn.id === btnSaveFeedbackId ? "Отзыв" : "Причина";
                postComment(textareaFeedbackId, tag);
                e.target.submit();
            } else {
                setInvalidFormat(textareaFeedback, "Текст отсутствует");
            }
        }

        const btnSave = document.createElement("button");
        btnSave.type = "submit";
        btnSave.className = "btn btn-primary mt-4";
        btnSave.textContent = "Сохранить";
        blockFeedback.append(btnSave);
    } else {
        blockFeedback = document.createElement("div");
    }
    blockFeedback.className = "mb-4";
    divFeedbackWindow.append(blockFeedback);

    const userImg = document.createElement("img");
    userImg.src = authorAtr[0];
    userImg.className = "comment-author-img";
    blockFeedback.prepend(userImg);

    const divFeedbackText = document.createElement("div");
    divFeedbackText.style.display = "inline-block";
    divFeedbackText.style.marginLeft = "10px";
    divFeedbackText.style.textAlign = "start";
    userImg.after(divFeedbackText);

    const spanAuthor = document.createElement("span");
    spanAuthor.className = "font-weight-bold";
    spanAuthor.textContent = authorAtr[1];
    divFeedbackText.append(spanAuthor);

    const textareaFeedback = document.createElement("textarea");
    textareaFeedback.id = textareaFeedbackId;
    textareaFeedback.className = "form-control";
    textareaFeedback.style.width = "600px";
    textareaFeedback.style.minHeight = "100px";
    textareaFeedback.style.maxHeight = "400px";
    textareaFeedback.style.overflow = "auto";
    textareaFeedback.placeholder = [btnSaveFeedbackId, btnShowFeedbackId].includes(btn.id) ? "Текст отзыва" :
        "Причина отмены";
    textareaFeedback.oninput = checkEmpty.bind(null, textareaFeedback);
    divFeedbackText.append(textareaFeedback);

    if ([btnShowFeedbackId, btnCancellationReasonId].includes(btn.id)) {
        textareaFeedback.value = taskFeedback[0];
        textareaFeedback.readOnly = true;

        const commentDateTime = document.createElement("span");
        let regDate = new Date(taskFeedback[1]);
        commentDateTime.textContent = ("0" + (regDate.getDate())).slice(-2) + "." +
            ("0" + (regDate.getMonth() + 1)).slice(-2) + "." +
            regDate.getFullYear() + " " + ("0" + (regDate.getHours())).slice(-2) + ":" +
            ("0" + (regDate.getMinutes())).slice(-2);
        commentDateTime.className = "ml-3";
        textareaFeedback.before(commentDateTime);
    }

    setTimeout(function () {
        divMainWindow.classList.add('show');
    }, 10);
}

function postFeedback(divFrom, btnFrom) {
    const text = divFrom.querySelector("textarea").value;
    const status = btnFrom.id === btnSaveFeedbackId ? 2 : 3;
    const xhr = new XMLHttpRequest();
    const strArray = [text, taskId, status].join("&&&");

    xhr.open('POST', URL_POST_FEEDBACK, false);
    xhr.send(strArray);

    divFrom.querySelector("button").click();
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

            btn.textContent = "Отписаться";
            btn.className = "btn btn-outline-danger";
            btn.onclick = function () {
                const xhr = new XMLHttpRequest();
                xhr.open('DELETE', URL_DELETE_SUBSCRIPTION_BY_ID + "/" + subscription.id, false);
                xhr.send();

                if (xhr.status !== 200) {
                    alert(xhr.status + ': ' + xhr.statusText);
                } else {
                    getSubscriptionByTaskId(btn);
                }
            }
        } else if (!["Решённые", "Отменённые"].includes(
            document.getElementById(spanStatusId).innerText.split(": ")[1])) {
            btn.textContent = "Подписаться";
            btn.className = "btn btn-outline-success";
            btn.onclick = function () {
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