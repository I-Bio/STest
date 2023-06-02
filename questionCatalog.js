// var csrf = $("input[name=csrfmiddlewaretoken]").val();

let RemoveButton = document.getElementById("RemoveButton");

$('button[name="delButton"]').click(
	function (){
		TranslateDataToModal(this);
	}
)

$('button[name="editButton"]').click(
	function (){
		EditQuestion(this);
	}
)

$("#searchField").keyup(
	function (){
		SearchQuest();
	}
)

function TranslateDataToModal(button){
	let text = button.parentNode.parentNode.querySelector("p").textContent;
	let modalText = document.getElementById("modalText");

	modalText.textContent = `Вы точно хотите удалить вопрос ${text}?`


	RemoveButton.addEventListener('click',function (){
		DeleteQuestion(button.parentNode.parentNode.parentNode, button.id);
	});
}

function DeleteQuestion(node, id){

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

function EditQuestion(editButton){
	let buttonId = editButton.parentNode.parentNode.querySelector(".bg-danger").id;

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

function SearchQuest() {
	let input, filter, li;

	input = document.getElementById("searchField");
	filter = input.value.toUpperCase();
	li = document.getElementById("BankList").getElementsByTagName("li");

	for (let i = 0; i < li.length; i++) {
		let p = li[i].querySelector("p");
		let text = p.textContent || p.innerText;

		if (text.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		}
		else {
			li[i].style.display = "none";
		}
	}
}