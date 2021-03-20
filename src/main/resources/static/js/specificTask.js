const maxCountComments = 10;
const textareaCommentTextId = "textarea-comment-text";
const divCommentBoxId = "div-comment-box"
const divPrintCommentsId = "div-print-comments";
const divCommentClass = "div-any-comment";
let taskComments = [];


function postComment(taskId) {
    const commentText = document.getElementById(textareaCommentTextId);
    const xhr = new XMLHttpRequest();
    const strArray = commentText.value + '&' + taskId;

    xhr.open('POST', URL_POST_COMMENT, false);
    xhr.send(strArray);

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
        return null;
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
    const allComments = document.getElementById(divPrintCommentsId);
    allComments.innerHTML = "";

    for (let i = 0; i < taskComments.length; i++) {
        const anyComment = document.createElement("div");
        anyComment.className = divCommentClass + " pb-4";
        allComments.append(anyComment);

        const userImage = document.createElement("img");
        userImage.className = "comment-author-img";
        userImage.src = taskComments[i].author.userImage;
        anyComment.append(userImage);

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
}

function calledOnLoad(taskId) {
    const commentBox = document.getElementById(divCommentBoxId);
    if (!commentBox) {
        return;
    }

    getTaskComments(taskId);
    printComments();
    commentBox.querySelector("h4").textContent = "Всего комментариев: " + taskComments.length;

    activationScrollBarExt();
}

function activationScrollBarExt() {
    const divPrintCommentsElements = document.querySelectorAll("#" + divPrintCommentsId + "> *");
    if (divPrintCommentsElements.length > 0) {
        activationScrollBar(divPrintCommentsId, maxCountComments, divCommentClass, divPrintCommentsElements.length);
    }
}