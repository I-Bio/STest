let variantsContainer = document.querySelector(".cont-quest");
let allVariants = document.getElementById("firstSel");
let numOfVariant = 2;

$("#allCheckBox").click(
    function (){
        let mainInputCheckbox = document.getElementById("allCheckBox");
        let allInputCheckbox = document.getElementsByName("delCheckBox");
        let flag = mainInputCheckbox.checked;

        for (let i = 0; i < allInputCheckbox.length; i++){
            allInputCheckbox[i].checked = flag;
        }

        mainInputCheckbox.checked = AllSelected();
    }
);

$("#addQuestButton").click(
    function (){
        variantsContainer.append(InputContainerCreator());

        ValidQuestionCheck();
        DropSelectedVariants();
    }
);

$("#delQuestButton").click(
    function (){
        let allSelectedInputs = document.getElementsByName("delCheckBox");
        let lstToRemove = [];

        for (let i = 0; i < allSelectedInputs.length; i++){
            if (allSelectedInputs[i].checked){
                lstToRemove.push(parseInt(i));
            }
        }

        for (let i = lstToRemove.length - 1; i >= 0; i--){
            let fatherOfSel = allSelectedInputs[lstToRemove[i]].parentNode;
            fatherOfSel.remove();
            console.log(i + " deleted");
        }

        ValidQuestionCheck();
        DropSelectedVariants();
    }
);

$('button[name ="delThisFieldButton"]').click(
    function (){
        let toDel = this.parentNode.parentNode;
        toDel.remove();

        ValidQuestionCheck();
        DropSelectedVariants();
    }
);

$('input[name="delCheckBox"]').click(
    function (){
        DropSelectedVariants();
    }
);

function InputContainerCreator(){
    let Container = document.createElement("div");
    let inpContainer = document.createElement("div");
    let inp = document.createElement("input");
    let label = document.createElement("label");
    let select = allVariants.cloneNode(true);
    let btn = document.createElement("button");

    Container.className = "form-group small-box";

    inpContainer.className = "custom-control custom-checkbox pl-0";

    inp.className = "custom-control-input";
    inp.type = "checkbox";
    inp.name = "delCheckBox";
    inp.id = `customCheckbox${numOfVariant}`;
    inp.onclick = function (){
        DropSelectedVariants();
    }

    label.className = "custom-control-label";
    label.htmlFor = `customCheckbox${numOfVariant}`;
    numOfVariant++;

    btn.className = "btn btn-danger float-right";
    btn.name = "delThisFieldButton";
    btn.type = "button";
    btn.textContent = "Удалить";
    btn.onclick = function (){
        let toDel = btn.parentNode.parentNode;
        toDel.remove();

        ValidQuestionCheck();
        DropSelectedVariants();
    }

    inpContainer.append(inp);
    inpContainer.append(label);
    inpContainer.append(select);
    inpContainer.append(btn);

    Container.append(inpContainer);

    return Container;
}

function ValidQuestionCheck(){
    let submitButton = document.getElementById("submitButton");

    if (variantsContainer.childElementCount < 2){
        document.getElementById("warning").textContent = "Необходимо минимум 2 задания";
        submitButton.setAttribute("disabled","");
    }
    else {
        document.getElementById("warning").textContent = "";
        submitButton.removeAttribute("disabled");
    }
}

function DropSelectedVariants(){
    let mainInputCheckbox = document.getElementById("allCheckBox");
    mainInputCheckbox.checked = AllSelected();
}

function AllSelected(){
    let allInputCheckbox = document.getElementsByName("delCheckBox");

    if (allInputCheckbox.length == 0) return false;

    for (let i = 0; i < allInputCheckbox.length; i++){
        if (!allInputCheckbox[i].checked) return false;
    }

    return true;
}