function getAllObjectsFromRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
        return null;
    } else {
        return JSON.parse(xhr.responseText);
    }
}

function deleteObject(url, isAsync){
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, isAsync);
    xhr.send();
}