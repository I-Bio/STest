// var csrf = $("input[name=csrfmiddlewaretoken]").val();

var testQuest = new Splide( '#inTest', {
	direction: 'ttb',
	height   : '10rem',
	wheel    : true,
	perPage : 4,
	arrows : false,
} );
var bankQuest = new Splide( '#inBank', {
	direction: 'ttb',
	height   : '10rem',
	wheel    : true,
	perPage : 4,
	arrows : false,
} );

testQuest.mount();
bankQuest.mount();

$("#dateFrom").datetimepicker(
	{
		format: 'DD.MM.YYYY HH:mm',
		inline: false,
		locale: 'ru',
	}
);
$("#dateTo").datetimepicker(
	{
		format: 'DD.MM.YYYY HH:mm',
		inline: false,
		locale: 'ru',
	}
);

$('button[name="addButton"]').click(
	function (){
		ListContentUpdater(this, 0);
	}
);

$('button[name="removeButton"]').click(
	function (){
		ListContentUpdater(this, 1);
	}
);

$("#searchField").keyup(SearchFunc);

$("#submitButton").click(SubmitForm);

function ListContentUpdater(myButton, type){
	let newItemId, containerId;
	let id = myButton.id;

	if (type == 1){
		newItemId = "AddQuestToTest";
		containerId = "BankList";
	}
	else {
		newItemId = "RemoveFromQuest";
		containerId = "TestList";
	}

	let newItem = document.getElementById(newItemId).content.cloneNode(true);
	let inputGroup = myButton.parentNode.parentNode;

	newItem.querySelector("button").id = id;
	newItem.querySelector("p").textContent = inputGroup.querySelector("p").textContent;
	inputGroup.parentNode.remove();

	if (type == 1){
		newItem.querySelector("button").onclick = function (){
			ListContentUpdater(this, 0);
		};
	}
	else {
		newItem.querySelector("button").onclick = function (){
			ListContentUpdater(this, 1);
		};
	}

	document.getElementById(containerId).append(newItem);

	UpdateContentInLists();
}

function UpdateContentInLists(){
	testQuest.destroy();
	bankQuest.destroy();
	testQuest.mount();
	bankQuest.mount();
}

function SubmitForm(){
	let id = document.getElementsByName("name_id")[0].value;
	let description = document.getElementsByName("condition")[0].value;
	let dateFrom = document.getElementById("dateFrom").querySelector(".form-control").value;
	let dateTo = document.getElementById("dateTo").querySelector(".form-control").value;
	let questions = document.getElementsByName("removeButton");
	let questionsId = [];

	for (let i = 0 ; i < questions.length; i++){
		questionsId.push(questions[i].id);
	}

	$.ajax({
		url: '',
		type: "post",
		data: {
			name: id,
			description : description,
			questions : questionsId,
			dateFrom : dateFrom,
			dateTo : dateTo,
			//csrfmiddlewaretoken: csrf,
		},
		success: function (response){
			console.log("Удаление завершено");
		}
	});
}