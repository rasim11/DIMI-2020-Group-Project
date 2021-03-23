const LOCAL_URL_USER_PROFILE = API + VERSION + USER_MANAGEMENT + USER_GET + BY_ID;

const maxCountComments = 10;
const inputTaskId = "input-task-id";
const textareaCommentTextId = "textarea-comment-text";
const divCommentBoxId = "div-comment-box"
const divPrintCommentsId = "div-print-comments";
const divCommentClass = "div-any-comment";
const divImagesId = "div-images";
let taskId;
let taskComments = [];


function postComment() {
    const commentText = document.getElementById(textareaCommentTextId);
    const xhr = new XMLHttpRequest();
    const strArray = commentText.value + '&' + taskId;

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