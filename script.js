let form = document.forms['add-items'];
let list = document.querySelector('#list')
let leftItem = document.querySelector(".activeCount");

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

list.addEventListener('click', function (event) {
    if (event.target.className == 'delete') {
        const li = event.target.parentElement;
        li.parentElement.removeChild(li);
        updateItemLeft();
    }
});


function updateItemLeft() {
    let count = list.childElementCount;
    leftItem.textContent = (count > 1) ? `${count} items left` : `${count} item left`;
}