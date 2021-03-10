
var taskTextButton =  document.getElementById("height100");
taskTextButton.onclick = taskTextOverflov;

function taskTextOverflov() {
    var text = document.getElementById("taskText");

    if (text.style.overflow == 'auto')
    {
        text.style.overflow = 'hidden';
    } else text.style.overflow = 'auto';
}