// Selectors
const todoInput = document.getElementById('todo-input');
const todoAddBtn = document.getElementById('todo-add-btn');
const todoList = document.getElementById('todo-list');
const todoSelect = document.getElementById('todo-select');

// UI Class
class UI {
    // Method that creates a list based on user input which will be called down later in the functions section
    static addToList() {
        // Create and add todos to the UI
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        // Create and append li
        let li = document.createElement('li');
        li.classList.add('todo-list-item');
        li.textContent = todoInput.value;
        todoDiv.appendChild(li);
        // Create and append check button and icon
        let checkBtn = document.createElement('button');
        checkBtn.classList.add('checked');
        checkBtn.innerHTML = `
            <svg id="check" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
        `;
        todoDiv.appendChild(checkBtn);
        // Create and append delete button and icon
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.innerHTML = `
            <svg id="trash" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
            </svg>
        `;
        todoDiv.appendChild(deleteBtn);
        // Append created div to the ul in the browser
        todoList.appendChild(todoDiv);
        // Add todo item to localStorage
        Storage.addToStorage(todoInput.value);
        // Clear input fields and refocus
        todoInput.value = '';
        todoInput.focus();
    }

    static deleteFromList(el) {
        // The el represents whatever will be passed in the method when called which is the delete button itself
        if(el.classList.contains('delete')) {
            el.parentElement.remove();
        }
    }

    static checkFromList(el) {
        // The el represents whatever will be passed in the method when called which is the check button itself
        if(el.classList.contains('checked')) {
            el.previousElementSibling.classList.toggle('completed');
            el.parentElement.classList.toggle('opacityClass');
        }
    }

    static completedAndUncompletedTodo(el) {
        // Put all the childNodes of the todoList a.k.a the ul. That means the childNodes are the all the todoDiv's created
        const todos = todoList.childNodes;
        // forEach method can be used on nodeLists. so we use this function to check all the toDiv's individually if they have the opacityClass, the rest is easy to figure
        todos.forEach(function(todo) {
            if(el === 'completed') {
                if(todo.classList.contains('opacityClass')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
            } else if(el === 'uncompleted') {
                if(todo.classList.contains('opacityClass')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
            } else {
                todo.style.display = 'flex';
            }
        });
    }
}

// Storage Class
class Storage {
    static getTodosFromStorage() {
        // Declare variable to house the array of todoItems to be created and stored in localStorage
        let todos;
        // Check if localStorage is empty
        if(localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        return todos;
    }

    static addToStorage(todo) {
        let todos = Storage.getTodosFromStorage();
        todos.push(todo);
        // Mandatory setting of the items in the local storage
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static showTodosInStorage() {
        let todos = Storage.getTodosFromStorage();
       
        todos.forEach(function(todo) {
            // Create and add todos to the UI
            let todoDiv = document.createElement('div');
            todoDiv.classList.add('todo-div');

            let li = document.createElement('li');
            li.classList.add('todo-list-item');
            li.textContent = todo;
            todoDiv.appendChild(li);

            let checkBtn = document.createElement('button');
            checkBtn.classList.add('checked');
            checkBtn.innerHTML = `
            <svg id="check" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            `;
            todoDiv.appendChild(checkBtn);

            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete');
            deleteBtn.innerHTML = `
            <svg id="trash" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
            </svg>
            `;
            todoDiv.appendChild(deleteBtn);

            todoList.appendChild(todoDiv);
        });
    }

    static deleteTodosFromStorage(el) {
        let todos = Storage.getTodosFromStorage();
        // Loop through the array gotten from the localStorage, then comparing the individual array element with the value on what was clicked 'el' if its a match splice or remove it from the localStorage and update it so that it'll reflect.
        todos.forEach(function(todo) {
            if(todo === el) {
                let todoIndex = todos.indexOf(todo);
                todos.splice(todoIndex, 1);
            }
            // Updating so that it will reflect
            localStorage.setItem('todos', JSON.stringify(todos));
        });
    }
}

// Events
todoAddBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', remove);
todoList.addEventListener('click', checkTodo);
todoSelect.addEventListener('click', checkIfCompleted);
// This event automatically loads and shows the todos in the local storage
document.addEventListener('DOMContentLoaded', function() {
    Storage.showTodosInStorage();
});

// Functions
function addTodo(e) {
    e.preventDefault();
    // Displays the todo item
    UI.addToList();
}

function remove(e) {
    // Delete from list
    UI.deleteFromList(e.target);
    if(e.target.classList.contains('delete') ) {
        // Delete from localStorage
        Storage.deleteTodosFromStorage(e.target.previousElementSibling.previousElementSibling.textContent);
    }
}

function checkTodo(e) {
    UI.checkFromList(e.target);
}

function checkIfCompleted(e) {
    UI.completedAndUncompletedTodo(e.target.value);
}