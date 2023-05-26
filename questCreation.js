let variantsContainer = document.querySelector(".cont-quest");
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

$("#typeQuest").change(
    function (){
        let allAnswCheckBox = document.getElementsByName("answCheckBox");
        let myVal = this.value;

        if (myVal == "Одиночный выбор"){
            for (let i = 0; i < allAnswCheckBox.length; i++){
                allAnswCheckBox[i].onclick = function (){
                    DropAnsw();
                    this.checked = true;
                }
            }
        }
        else if (myVal == "Множественный выбор"){
            for (let i = 0; i < allAnswCheckBox.length; i++){
                allAnswCheckBox[i].onclick = function (){
                };
            }
        }

        DropAnsw();
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

window.onload = function (){
    let all = document.getElementsByName("answCheckBox");

    for (let i = 0; i < all.length; i++){
        all[i].onclick = function (){
            DropAnsw();
            this.checked = true;
        }
    }
}



function InputContainerCreator(){
    let Container = document.createElement("div");
    let inpContainer = document.createElement("div");
    let inp = document.createElement("input");
    let label = document.createElement("label");
    let text = document.createElement("textarea");
    let ansCont = document.createElement("div");
    let trueVar = document.createElement("input");
    let trueVarLabel = document.createElement("label");
    let btn = document.createElement("button");

    Container.className = "form-group small-box";

    inpContainer.className = "custom-control custom-checkbox pl-0";

    ansCont.className = "custom-control";

    inp.className = "custom-control-input float-right";
    inp.type = "checkbox";
    inp.name = "delCheckBox";
    inp.id = `customCheckbox${numOfVariant}`;
    inp.onclick = function (){
        DropSelectedVariants();
    }

    label.className = "custom-control-label float-right";
    label.htmlFor = `customCheckbox${numOfVariant}`;

    text.className = "custom-select bg-dark col-lg-5 col-sm-8 col-8";
    text.name = "text-variant";
    text.rows = "3";
    text.placeholder = "Ввод";
    text.style = "height: 70px;";

    trueVar.className = "custom-control-input";
    trueVar.name = "answCheckBox";
    trueVar.type = "checkbox";
    trueVar.id = `answCheckBox${numOfVariant}`;
    if (document.getElementById("typeQuest").value == "Одиночный выбор"){
        trueVar.onclick = function (){
            DropAnsw();
            this.checked = true;
        }
    }

    trueVarLabel.className = "custom-control-label";
    trueVarLabel.htmlFor = `answCheckBox${numOfVariant}`;
    trueVarLabel.textContent = `Ответ`;
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

    ansCont.append(trueVar);
    ansCont.append(trueVarLabel);

    inpContainer.append(text);
    inpContainer.append(btn);
    inpContainer.append(inp);
    inpContainer.append(label);
    inpContainer.append(ansCont);

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

function DropAnsw(){
    let allAnsw = document.getElementsByName('answCheckBox');

    for (let i = 0; i < allAnsw.length; i++){
        allAnsw[i].checked = false;
    }
}