// var csrf = $("input[name=csrfmiddlewaretoken]").val();

let RemoveButton = document.getElementById("RemoveButton");

$('button[name="delButton"]').click(TranslateDataToModal);

$('button[name="editButton"]').click(EditQuestion);

function TranslateDataToModal(event){
	let button = event.target;
	let text = button.parentNode.parentNode.querySelector("p").textContent;
	let modalText = document.getElementById("modalText");

	modalText.textContent = `Вы точно хотите удалить вопрос ${text}?`

	RemoveButton.removeEventListener('click', DeleteQuestion);
	RemoveButton.setAttribute("data-name", button.id);
	RemoveButton.addEventListener('click', DeleteQuestion);
}

function DeleteQuestion(event){
	let removeButton = event.target;
	let id = removeButton.getAttribute("data-name");
	let node = document.getElementById(id).parentNode.parentNode.parentNode;

	$.ajax({
		url: '',
		type: "post",
		data: {
			'toDelete': id,
			//csrfmiddlewaretoken: csrf,
		},
		success: function (response){
			node.remove();

			console.log("Удаление завершено");
		}
	});
}

function EditQuestion(event){
	let buttonId = event.target.parentNode.parentNode.querySelector(".bg-danger").id;

	$.ajax({
		url: '',
		type: "post",
		data: {
			'toEdit': buttonId,
			//csrfmiddlewaretoken: csrf,
		},
		success: function (response){
			console.log("Редактируем");
		}
	});
}