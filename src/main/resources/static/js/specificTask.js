const LOCAL_URL_USER_PROFILE = API + VERSION + USER_MANAGEMENT + USER_GET + BY_ID;
const LOCAL_URL_GET_TASK_BY_ID = API + VERSION + TASK_MANAGEMENT + TASK_GET + BY_ID;

const maxCountComments = 10;
const inputTaskId = "input-task-id";
const divFeedbackId = "div-feedback";
const divAuthorId = "div-author";
const textareaCommentTextId = "textarea-comment-text";
const divCommentBoxId = "div-comment-box"
const divPrintCommentsId = "div-print-comments";
const divCommentClass = "div-any-comment";
const divImagesId = "div-images";
const divMainBlockId = "div-main-block";
const divMainWindowId = "div-main-window";
const divFeedbackWindowId = "div-feedback-window";
const btnSaveFeedbackId = "btn-save-feedback";
const btnShowFeedbackId = "btn-show-feedback";
const btnCancelTaskId = "btn-cancel-task";
const btnCancellationReasonId = "btn-cancellation-reason";
let taskId;
let taskFeedback = [];
let taskComments = [];
let authorAtr = [];


function postComment() {
    const commentText = document.getElementById(textareaCommentTextId);
    const xhr = new XMLHttpRequest();
    const strArray = commentText.value + '&&&' + taskId;

    xhr.open('POST', URL_POST_COMMENT, false);
    xhr.send(strArray);

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
        return null;
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
        anyComment.className = divCommentClass + " pb-4";
        allComments.prepend(anyComment);

        const aUserProfile = document.createElement("a");
        aUserProfile.href = LOCAL_URL_USER_PROFILE + "/" + taskComments[i].author.id;
        anyComment.append(aUserProfile);

        const userImage = document.createElement("img");
        userImage.className = "comment-author-img";
        userImage.src = taskComments[i].author.userImage;
        aUserProfile.append(userImage);

        const commentCreatorInfo = document.createElement("div");
        commentCreatorInfo.style.display = "inline-block";
        commentCreatorInfo.style.marginLeft = "10px";
        commentCreatorInfo.style.textAlign = "start";
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
        commentText.style.width = "650px";
        commentText.value = taskComments[i].comment;
        commentText.readOnly = true;
        commentText.style.minHeight = "70px";
        commentCreatorInfo.append(commentText);
    }

    const commentBox = document.getElementById(divCommentBoxId);
    commentBox.querySelector("h4").textContent = "Всего комментариев: " + taskComments.length;

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

    const divImages = document.getElementById(divImagesId).querySelectorAll("img");
    if (divImages.length === 1) {
        const btn = document.getElementById(divImagesId).querySelectorAll("button");
        for (let i = 0; i < btn.length; i++) {
            btn[i].remove();
        }
        divImages[0].style.display = "inline-block";
    } else {
        imgResize(divImages[0]);
    }

    const commentBox = document.getElementById(divCommentBoxId);
    if (commentBox) {
        printComments();
    }
}

function activationScrollBarExt() {
    const divPrintCommentsElements = document.querySelectorAll("#" + divPrintCommentsId + "> *");
    if (divPrintCommentsElements.length > 0) {
        activationScrollBar(divPrintCommentsId, maxCountComments, divCommentClass, divPrintCommentsElements.length);
    }
}

function imgResize(image) {
    const btn = document.getElementById(divImagesId).querySelectorAll("button");

    image.style.display = "inline-block";
    const btnHeight = parseFloat(window.getComputedStyle(image, null).height) + "px";

    for (let i = 0; i < btn.length; i++) {
        btn[i].style.height = btnHeight;
    }
}

function previousImage() {
    const divImages = document.getElementById(divImagesId).querySelectorAll("img");
    const btn = document.getElementById(divImagesId).querySelectorAll("button");

    for (let i = 0; i < divImages.length; i++) {
        if (divImages[i].style.display === "inline-block") {
            divImages[i - 1].style.display = "inline-block";
            divImages[i].style.display = "none";
            if (i - 1 === 0) {
                btn[0].disabled = true;
            }
            break;
        }
    }

    btn[1].disabled = false;
}

function nextImage() {
    const divImages = document.getElementById(divImagesId).querySelectorAll("img");
    const btn = document.getElementById(divImagesId).querySelectorAll("button");

    for (let i = 0; i < divImages.length; i++) {
        if (divImages[i].style.display === "inline-block") {
            divImages[i + 1].style.display = "inline-block";
            divImages[i].style.display = "none";
            if (i + 1 === divImages.length - 1) {
                btn[1].disabled = true;
            }
            break;
        }
    }

    btn[0].disabled = false;
}

function showFeedbackWindow(btn, text) {
    const divMainBlock = document.getElementById(divMainBlockId);

    const divMainWindow = document.createElement("div");
    divMainWindow.id = divMainWindowId;
    divMainWindow.className = "feedback-window";
    divMainBlock.append(divMainWindow);

    const divFeedbackWindow = document.createElement("div");
    divFeedbackWindow.style.textAlign = "center";
    divFeedbackWindow.id = divFeedbackWindowId;
    divMainWindow.append(divFeedbackWindow);

    const buttonWindowClose = document.createElement("button");
    buttonWindowClose.className = "close-custom";
    buttonWindowClose.style.outline = "none";
    buttonWindowClose.title = "Закрыть";
    buttonWindowClose.innerText = "X";
    buttonWindowClose.addEventListener("click", function () {
        divMainWindow.classList.remove('show');
        document.querySelector("body").onmousedown = null;
        setTimeout(function () {
            divMainWindow.remove();
        }, 1000);
    });
    divFeedbackWindow.append(buttonWindowClose);

    document.querySelector("body").onmousedown = function (e) {
        const mainDiv = $("#" + divFeedbackWindowId);
        if (!mainDiv.is(e.target)
            && mainDiv.has(e.target).length === 0) {
            buttonWindowClose.click();
        }
    };

    const windowTitle = document.createElement("h3");
    windowTitle.innerText = text;
    divFeedbackWindow.append(windowTitle);

    const formFeedback = document.createElement("form");
    formFeedback.className = "mb-4";
    formFeedback.method = "get";
    formFeedback.action = LOCAL_URL_GET_TASK_BY_ID + "/" + taskId;
    formFeedback.onsubmit = function (e) {
        e.preventDefault();
        if (textareaFeedback.value) {
            postFeedback(divMainWindow, btn);
            e.target.submit();
        } else {
            setInvalidFormat(textareaFeedback, "Текст отсутствует");
        }
    }
    divFeedbackWindow.append(formFeedback);

    const userImg = document.createElement("img");
    userImg.src = authorAtr[0];
    userImg.className = "comment-author-img";
    formFeedback.append(userImg);

    const divFeedbackText = document.createElement("div");
    divFeedbackText.style.display = "inline-block";
    divFeedbackText.style.marginLeft = "10px";
    divFeedbackText.style.textAlign = "start";
    formFeedback.append(divFeedbackText);

    const spanAuthor = document.createElement("span");
    spanAuthor.className = "font-weight-bold";
    spanAuthor.textContent = authorAtr[1];
    divFeedbackText.append(spanAuthor);

    const textareaFeedback = document.createElement("textarea");
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

    if ([btnSaveFeedbackId, btnCancelTaskId].includes(btn.id)) {
        const btnSave = document.createElement("button");
        btnSave.type = "submit";
        btnSave.className = "btn btn-primary mt-4";
        btnSave.textContent = "Сохранить";
        formFeedback.append(btnSave);
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