const formTaskAddId = "form-task";
const spanErrMsgId = "span-err-msg";
const divCommentAllowClass = "div-comment-allow";
const divImagesClass = "div-images";
const divImageClass = "div-image";
const inputLoadImgId = "input-load-img";
const taskImageName = "taskImage";
const anyImgClass = "any-img";
const btnSaveId = "btn-save";
const inputTaskName = "taskName";
const textareaTaskDescriptionName = "taskDescription";
const inputTaskLocationName = "taskLocation";
const inputTaskCommentAllowName = "commentAllow";
let n = 3;
let defaultTaskName;
let defaultTaskDescription;
let defaultTaskLocation;
let defaultTaskCommentAllow;
let isImgDefault = true;


function isEmpty(element) {
    if ((!element.value) || (element.value.trim() !== "")) {
        setValidFormat(element);
    } else {
        setInvalidFormat(element, "Введено некорректное значение");
    }
}

function isCommentAllowChecked() {
    const inputCommentAllow = document.getElementsByName(inputTaskCommentAllowName);
    if (inputCommentAllow[0].checked || inputCommentAllow[1].checked) {
        const spanErrMsg = document.getElementById(spanErrMsgId);
        if (spanErrMsg) {
            spanErrMsg.remove();
        }
        return true;
    } else {
        let spanErrMsg = document.getElementById(spanErrMsgId);
        if (!spanErrMsg) {
            spanErrMsg = document.createElement("span");
            spanErrMsg.textContent = "Выберите действие";
            spanErrMsg.style.color = "red";
            spanErrMsg.style.display = "block";
            spanErrMsg.id = spanErrMsgId;
            document.querySelector("." + divCommentAllowClass).prepend(spanErrMsg);
        }
        return false;
    }
}

function loadTask() {
    const formTaskAdd = document.getElementById(formTaskAddId);
    formTaskAdd.onsubmit = function (e) {
        e.preventDefault();
        if (isNoEmpty(formTaskAdd) & isCommentAllowChecked()) {
            const inputTaskImages = document.createElement("input");
            inputTaskImages.name = taskImageName;
            inputTaskImages.type = "hidden";

            const listImages = document.querySelectorAll("." + anyImgClass);
            for (let i = 0; i < listImages.length; i++) {
                listImages[i].src = compress(listImages[i]).src;
                inputTaskImages.value += listImages[i].src + " ";
            }
            formTaskAdd.prepend(inputTaskImages);

            e.target.submit();
        }
    }
}

function loadTaskEdit() {
    loadTask();

    const divImages = document.querySelectorAll("." + divImageClass);
    n -= divImages.length;

    defaultTaskName = document.getElementsByName(inputTaskName)[0].value;
    defaultTaskDescription = document.getElementsByName(textareaTaskDescriptionName)[0].value;
    defaultTaskLocation = document.getElementsByName(inputTaskLocationName)[0].value;
    defaultTaskCommentAllow = document.getElementsByName(inputTaskCommentAllowName)[0].checked === true ?
        document.getElementsByName(inputTaskCommentAllowName)[0] :
        document.getElementsByName(inputTaskCommentAllowName)[1];
}


function loadImages() {
    const inputLoadImg = document.getElementById(inputLoadImgId);
    inputLoadImg.click();
}

function processingImages(inputImages) {
    const count = inputImages.files.length > n ? n : inputImages.files.length;
    for (let i = 0; i < count; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const divImages = document.querySelector("." + divImagesClass);

            const divImage = document.createElement("div");
            divImage.className = divImageClass + " mr-2 mb-2";
            divImage.style.position = "relative";
            divImage.style.display = "inline-block";
            divImages.prepend(divImage);

            const inputNewImgTask = document.createElement("img");
            inputNewImgTask.src = e.target.result.toString();
            inputNewImgTask.style.width = "100px";
            inputNewImgTask.className = anyImgClass;
            divImage.append(inputNewImgTask);

            const btnDelete = document.createElement("button");
            btnDelete.type = "button";
            btnDelete.className = "del-img";
            btnDelete.style.outline = "none";
            btnDelete.title = "Удалить";
            btnDelete.innerText = "X";
            btnDelete.onclick = function () {
                divImage.remove();
                n++;

                const btnSave = document.getElementById(btnSaveId);
                if (btnSave) {
                    isImgDefault = document.querySelectorAll("." + divImageClass).length === 0;
                    isNoDuplicate();
                }
            }
            divImage.append(btnDelete);
        };
        reader.readAsDataURL(inputImages.files[i]);
    }

    if (n > 0) {
        const btnSave = document.getElementById(btnSaveId);
        if (btnSave) {
            btnSave.disabled = false;
            isImgDefault = false;
        }
        n -= count;
    }
}

function taskDivImgRemove(divImgId) {
    document.getElementById(divImgId).remove();
    n++;

    isImgDefault = false;
    isNoDuplicate();
}

function isNoDuplicate() {
    const btnSave = document.getElementById(btnSaveId);
    const taskCommentAllow = document.getElementsByName(inputTaskCommentAllowName)[0].checked === true ?
        document.getElementsByName(inputTaskCommentAllowName)[0] :
        document.getElementsByName(inputTaskCommentAllowName)[1];

    btnSave.disabled = !(document.getElementsByName(inputTaskName)[0].value !== defaultTaskName ||
        document.getElementsByName(textareaTaskDescriptionName)[0].value !== defaultTaskDescription ||
        document.getElementsByName(inputTaskLocationName)[0].value !== defaultTaskLocation ||
        taskCommentAllow.id !== defaultTaskCommentAllow.id || !isImgDefault);
}