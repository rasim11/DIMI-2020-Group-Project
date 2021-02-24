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
		if (input.value==='') {
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