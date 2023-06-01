let RemoveButton = document.getElementById("RemoveButton");

$('button[name="delButton"]').click(
	function (){
		TranslateDataToModal(this);
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
		DeleteQuestion(button.parentNode.parentNode.parentNode);
	});
}

function DeleteQuestion(node){

	$.ajax({
		url: '',
		type: "post",
		data: {
			'key': node.querySelector("p").textContent,
			//csrfmiddlewaretoken: csrf,
		},
		success: function (response){
			//$(".alert-text").text(response.seconds);
			console.log("Success");
			console.log();

			node.remove();
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