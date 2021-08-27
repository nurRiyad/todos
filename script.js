let form = document.forms['add-items'];
let list = document.querySelector('#list')
let leftItem = document.querySelector(".activeCount");
let status = document.querySelector("#status-bar")

let mainArray = [];

//Adding new element to the mainArray and Print Update
form.addEventListener('submit', (event) => {

    event.preventDefault();
    let newTask = event.target.querySelector('input[type="text"]').value;
    form.reset();

    let tmp = {
        task: newTask,
        all: true,
        checked: false
    };
    if (isValid(newTask)) {
        mainArray.push(tmp);
        printList("all");
    }
});


//Check is this task exist or is a empty task
function isValid(task) {
    let isEmpty = true;
    for (let char of task) {
        if (char != ' ') {
            isEmpty = false;
            break;
        }
    }
    let isDuplicate = false;
    for (let eachLi of mainArray) {
        if (eachLi.task == task) {
            isDuplicate = true;
            break;
        }
    }
    if (isEmpty || isDuplicate) return false;
    else return true;

}

//Create A new element for the Object
function createLi(obj) {

    let newli = document.createElement('li');
    let taskSpan = document.createElement('span');
    let deleteSpan = document.createElement('span');
    let checkbox = document.createElement('input');

    let task = obj.task;
    if (obj.checked) {
        task = "<del>" + obj.task + "</del>";
    }

    taskSpan.innerHTML = task;
    taskSpan.setAttribute("class", "task");
    deleteSpan.textContent = "Delete";
    deleteSpan.setAttribute("class", "delete");
    checkbox.type = "checkbox";
    checkbox.name = "complete";
    checkbox.id = "compelete";
    if (obj.checked) {
        checkbox.checked = true;
    }


    newli.appendChild(checkbox);
    newli.appendChild(taskSpan);
    newli.appendChild(deleteSpan);
    return newli;
}


//Printing the list function
function printList(status) {

    list.innerHTML = '';
    if (status == "all") {
        for (eachLi of mainArray) {
            let tmpLi = createLi(eachLi);
            list.appendChild(tmpLi);
        }
    }
    else if (status == "active") {
        for (eachLi of mainArray) {
            if (!eachLi.checked) {
                let tmpLi = createLi(eachLi);
                list.appendChild(tmpLi);
            }
        }
    }
    else if (status == "complete") {
        for (eachLi of mainArray) {
            if (eachLi.checked) {
                let tmpLi = createLi(eachLi);
                list.appendChild(tmpLi);
            }
        }
    }
}


// Delete functionality 
list.addEventListener('click', (event) => {
    if (event.target.className == 'delete') {
        let li = event.target.parentElement;
        let task = li.querySelector(".task").textContent;
        //console.log(task);
        for (eachLi of mainArray) {
            if (eachLi.task == task) {
                let index = mainArray.indexOf(eachLi);
                //console.log("index = ", index);
                if (index > -1) {
                    mainArray.splice(index, 1);
                    //Update the list view
                    if (document.getElementById("ac").classList.contains("activePhase")) printList("active");
                    if (document.getElementById("al").classList.contains("activePhase")) printList("all");
                    if (document.getElementById("cp").classList.contains("activePhase")) printList("complete");
                }
            }
        }
    }
});


//Added checked and unchecked functionality
list.addEventListener('change', (event) => {
    let parentli = event.target.parentElement;
    let task = parentli.querySelector(".task").textContent;
    for (let i = 0; i < mainArray.length; i++) {
        if (mainArray[i].task == task) {
            if (mainArray[i].checked) mainArray[i].checked = false;
            else mainArray[i].checked = true;
            if (document.getElementById("ac").classList.contains("activePhase")) printList("active");
            if (document.getElementById("al").classList.contains("activePhase")) printList("all");
            if (document.getElementById("cp").classList.contains("activePhase")) printList("complete");
            break;
        }
    }
});

//update the complete all and active status
status.addEventListener('click', (event) => {
    let x = event.target.value;
    let arr = list.querySelectorAll("li");
    if (x == "all") {
        document.getElementById("al").classList.add("activePhase");
        document.getElementById("ac").classList.remove("activePhase");
        document.getElementById("cp").classList.remove("activePhase");
        printList("all");
    }
    else if (x == "active") {
        document.getElementById("ac").classList.add("activePhase");
        document.getElementById("al").classList.remove("activePhase");
        document.getElementById("cp").classList.remove("activePhase");
        printList("active");
    }
    else if (x == "complete") {
        document.getElementById("cp").classList.add("activePhase");
        document.getElementById("al").classList.remove("activePhase");
        document.getElementById("ac").classList.remove("activePhase");
        printList("complete");
    }
    else {

        let newArry = [];
        for (let i = 0; i < mainArray.length; i++) {
            if (mainArray[i].checked == false) newArry.push(mainArray[i]);
        }
        mainArray = newArry;
        if (document.getElementById("cp").classList.contains("activePhase")) printList("complete");
        if (document.getElementById("al").classList.contains("activePhase")) printList("all");
        if (document.getElementById("ac").classList.contains("activePhase")) printList("active");
    }
});


function updateItemLeft() {
    let allLi = list.querySelectorAll("li");
    let count = 0;
    for (let eachLi of allLi) {
        if (!isChecked(eachLi)) {
            count += 1;
        }
    }
    leftItem.textContent = (count > 1) ? `${count} items left` : `${count} item left`;
}