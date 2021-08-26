let form = document.forms['add-items'];
let list = document.querySelector('#list')
let leftItem = document.querySelector(".activeCount");
let status = document.querySelector("#status-bar")

form.addEventListener('submit', (event) => {

    //Getting the the from the input field and reset to defaults
    event.preventDefault();
    let newTask = form.querySelector('input[type="text"]').value;
    //console.log(newTask);
    form.reset();

    //Creating a new element
    let newli = document.createElement('li');
    let taskSpan = document.createElement('span');
    let deleteSpan = document.createElement('span');
    let checkbox = document.createElement('input');

    //Adding class and property to newly created element
    taskSpan.textContent = newTask;
    taskSpan.setAttribute("class", "task");
    deleteSpan.textContent = "Delete";
    deleteSpan.setAttribute("class", "delete");
    checkbox.type = "checkbox";
    checkbox.name = "complete";
    checkbox.id = "compelete";


    //adding new task and delete span to the li element
    newli.appendChild(checkbox);
    newli.appendChild(taskSpan);
    newli.appendChild(deleteSpan);


    //adding newly created li element to the list 
    if (!isEmpty(newTask)) {
        if (document.getElementById("cp").classList.contains("activePhase")) {
            newli.style.display = "none";
            list.appendChild(newli);
        }
        list.appendChild(newli);
        updateItemLeft();
    }

});

list.addEventListener('click', (event) => {
    if (event.target.className == 'delete') {
        const li = event.target.parentElement;
        li.parentElement.removeChild(li);
        updateItemLeft();
    }
});


list.addEventListener('change', (event) => {
    let parentli = event.target.parentElement;
    let taskli = parentli.querySelector(".task");
    //console.log(event.target.checked)
    if (event.target.checked) {
        //console.log(taskli, "is checked");
        taskli.innerHTML = "<del>" + taskli.textContent + "</del>";
        if (document.getElementById("ac").classList.contains("activePhase")) {
            event.target.parentElement.style.display = "none";
        }

    }
    else {
        //console.log(taskli, "is not checked");
        taskli.innerHTML = taskli.textContent;
        if (document.getElementById("cp").classList.contains("activePhase")) {
            event.target.parentElement.style.display = "none";
        }


    }
    updateItemLeft();
})


status.addEventListener('click', (event) => {
    let x = event.target.value;
    let arr = list.querySelectorAll("li");
    if (x == "all") {
        document.getElementById("al").classList.add("activePhase");
        document.getElementById("ac").classList.remove("activePhase");
        document.getElementById("cp").classList.remove("activePhase");
        for (let eachLi of arr) {
            eachLi.style.display = "block";
        }
    }
    else if (x == "active") {
        document.getElementById("ac").classList.add("activePhase");
        document.getElementById("al").classList.remove("activePhase");
        document.getElementById("cp").classList.remove("activePhase");
        for (let eachLi of arr) {
            if (isChecked(eachLi)) {
                eachLi.style.display = "none";
            }
            else {
                eachLi.style.display = "block";
            }
        }
    }
    else if (x == "complete") {
        document.getElementById("cp").classList.add("activePhase");
        document.getElementById("al").classList.remove("activePhase");
        document.getElementById("ac").classList.remove("activePhase");
        for (let eachLi of arr) {
            if (!isChecked(eachLi)) {
                eachLi.style.display = "none";
            }
            else {
                eachLi.style.display = "block";
            }
        }
    }
    else {
        for (let eachLi of arr) {
            if (isChecked(eachLi)) {
                eachLi.parentElement.removeChild(eachLi);
            }
        }
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

function isChecked(element) {
    let checkvalue = element.querySelector("input").checked;
    return checkvalue;
}

function isEmpty(str) {
    for (let char of str) {
        if (char != ' ') return false;
    }
    return true;
}