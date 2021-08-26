let form = document.forms['add-items'];
let list = document.querySelector('#list')
let leftItem = document.querySelector(".activeCount");
let status = document.querySelector("#status-bar")

form.addEventListener('submit', (event) => {

    //Getting the the from the input field and reset to defaults
    event.preventDefault();
    let newTask = form.querySelector('input[type="text"]').value;
    console.log(newTask);
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
    list.appendChild(newli);
    updateItemLeft();

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
    }
    else {
        //console.log(taskli, "is not checked");
        taskli.innerHTML = taskli.textContent;

    }
    updateItemLeft();
})


status.addEventListener('click', (event) => {
    let x = event.target.textContent;
    let arr = list.querySelectorAll("li");
    if (x == "All") {
        for (let eachLi of arr) {
            eachLi.style.display = "block";
        }
    }
    else if (x == "Active") {
        for (let eachLi of arr) {
            if (isChecked(eachLi)) {
                eachLi.style.display = "none";
            }
            else {
                eachLi.style.display = "block";
            }
        }
    }
    else if (x == "Completed") {
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
