let submitButton = $("#submitButton")[0];
let filename = $("#filename")[0];
let textId = $("#name")[0];

submitButton.setAttribute("disabled","");

$("#file").change(
	function (){
		filename.value = this.files.length ? this.files[0].name : '';
		SubmitCheck();
	}
);

textId.onchange = SubmitCheck;

function SubmitCheck(){
	if (filename.value == null || filename.value == "" || textId.value == null || textId.value == "") {
		submitButton.setAttribute("disabled", "");
	}
	else{
		submitButton.removeAttribute("disabled");
	}
}