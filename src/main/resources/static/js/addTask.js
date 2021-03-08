function validation(){
	const form = document.querySelector(".task_form");
	let error = formValidation(form);
	if (error===0){
		return true;
	}else {
		return false;
	}
}
function formValidation(form){
	const on = document.getElementById("on");
	const off = document.getElementById("off");
	let error = 0;
	let formReq = document.querySelectorAll('.required');
	for (var i = 0; i < formReq.length; i++) {
		const input = formReq[i];
		formDelError(input);
		if (input.value.trim()==='') {
			formAddError(input,'Заполните поле');
			error++;
		}
	}
	if(!on.checked && !off.checked){
		formAddError(on,'Выберите действие');
		error++;
	}else{
		formDelError(on);
	}
	return error;
}
function formAddError(input,message){
	const small = input.parentElement.querySelector('small');
	small.innerText=message;
	input.classList.add('error');
}
function formDelError(input){
	input.classList.remove('error');
	const small = input.parentElement.querySelector('small');
	small.innerText='';
}
/*Отображение выбранного изображения*/
let taskImage = document.getElementById("taskImage");
let preview = document.getElementById("imgPrev");
let delBtn = document.getElementById("delImage");
delBtn.style.visibility="hidden";
taskImage.addEventListener('change',()=>{
	imagePreview(taskImage.files[0]);
})
function imagePreview(file){
	var reader = new FileReader();
	reader.onload =  function (e){
		preview.setAttribute("src",e.target.result);
		delBtn.style.visibility="visible";
	};
	reader.readAsDataURL(file);
}
/*Удаление выбранного изображения*/
delBtn.addEventListener('click',e=>{
	preview.setAttribute("src","");
	taskImage.value=null;
	e.preventDefault();
	delBtn.style.visibility="hidden";
})



