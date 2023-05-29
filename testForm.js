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


$('button[name="addButton"]').click(
	function (){
		ListContentUpdater(this, 0);
	}
);

$("#searchField").keyup(
	function (){
		Search();
	}
);

function ListContentUpdater(myButton, type){
	let newItemId, containerId;

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

function Search() {
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