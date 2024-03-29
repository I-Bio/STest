// var csrf = $("input[name=csrfmiddlewaretoken]").val();

let submitButton = $("#submitButton")[0];
let filename = $("#filename")[0];
let fileContainer = document.getElementById("fileContainer");
let fileTemplate = document.getElementById("fileTemplate")
let filesToUpload = new Map();

$("#file").change(
	function (){
		for (let i = 0; i < this.files.length; i++){
			if (!filesToUpload.has(this.files[i])){
				filesToUpload.set(this.files[i].name, this.files[i]);

				let item = fileTemplate.content.cloneNode(true);
				let text = item.querySelector("p");
				text.textContent = this.files[i].name;

				item.querySelector("button").onclick = RemoveFile;

				fileContainer.append(item);
			}
		}
	}
);

$("#submitButton").click(Submit);

function RemoveFile(event){
	let fileElement = event.target.parentNode.parentNode.parentNode.parentNode;
	let name = fileElement.querySelector("p").textContent;

	if (filesToUpload.has(`${name}`)){
		filesToUpload.delete(name);
		fileElement.remove();
	}
}

function Submit(){
	let formData = new FormData();

	for (let key in filesToUpload){
		formData.append("file[]", filesToUpload[key]);
	}


	$.ajax({
		url: '',
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		data: {
			files : formData,
			//csrfmiddlewaretoken: csrf,
		},
		dataType : 'json',
		success: function (response){
		}
	});
}

