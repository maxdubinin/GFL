(function () {

    
     // Variables
    let appDiv = document.getElementById('app');
    let addButton = appDiv.querySelector('.js_add');
    let saveButton = appDiv.querySelector('.js_save');
    let cancelButton = appDiv.querySelector('.js_cancel');
    let input = appDiv.querySelector('.js_add_input');
    let todoList = appDiv.querySelector('.todo-list');
    let todoItems = appDiv.querySelectorAll('.js_todo_item');
    let tasks;

    // get item from localstorage
    let data = localStorage.getItem("taskList");

    // check if data is not empty
    if(data){
        tasks = JSON.parse(data);
    }else{
        // if data isn't empty
        tasks = [];
        
    }


    function display() {

        let tasksHtml = tasks.map((item, index) => {
            return `
            <div class="js_todo_item row" data-index="${index}">
                <div class="col-5 item_text ${item.status ? "checked" : ""}">${item.name}</div>
                <div class="col-2 js_item_action">
                    <button type="button" data-action="edit" title="Edit">Edit</button>
                    <button type="button" data-action="remove" title="Remove">Del</button>
                </div>
            </div>
            `;

        }).join('');

        todoList.innerHTML = tasksHtml;
        todoItems = appDiv.querySelectorAll('.js_todo_item');
    }

    function removeItems(index) {
         tasks.splice(index, 1);
         saveItem();
         display();
    }

    function addItem() {
        tasks.push({
            name: input.value,
            status: false
        });
        
        saveItem();
        display();
        input.value = '';
    }

    function saveItem() {
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }

    function startEdit(index) {
        let data = tasks[index];
        input.value = data.name;
        input.focus();
        saveButton.dataset.index = index;
        addButton.style.display = 'none';
        saveButton.style.display = '';
        cancelButton.style.display = '';
    }

    function saveChanges(index) {
        tasks[index].name = input.value;
        saveItem();
        endEdit();
        display();
    }

    function endEdit() {
        input.value = '';
        addButton.style.display = '';
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
    }

    appDiv.addEventListener('click', function(e){
        let target = e.target;
        let todoItem = target.closest('.js_todo_item');
        let index = -1;

        switch(target.dataset.action) {
            case 'edit': 
                index = Array.from(todoItems).indexOf(todoItem);
                startEdit(index);
                break;
            case 'remove':
                index = Array.from(todoItems).indexOf(todoItem);
                removeItems(index);
                
                break;
            default:
                break;
        }

        
        if(target.classList.contains('item_text')) {
           index = Array.from(todoItems).indexOf(todoItem);
           tasks[index].status = !tasks[index].status;
           saveItem();
           display();
        }
     });

    addButton.addEventListener('click', function(e){
        addItem();
    });
    saveButton.addEventListener('click', function(e){
        saveChanges(this.dataset.index);
    });
    cancelButton.addEventListener('click', function(e){
        endEdit();
    });
    

    input.addEventListener('keyup', function(e){
        if(e.key === "Enter") {
            console.log('you clicked on ENTER button');

            addButton.click();
        }
    
    });

    display();
























}());