const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");

const loadTodo = JSON.parse(localStorage.getItem("todos"));

if (loadTodo){
    loadTodo.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();

});

function addTodo(todo){
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    }

    if (todoText){
        const todoELement = document.createElement('li');
        if (todo && todo.completed){
            todoELement.classList.add("completed");
        }
        todoELement.innerHTML = todoText;
        todos.appendChild(todoELement);

        todoELement.addEventListener("click", () => {
            todoELement.classList.toggle("completed");
            updateLS();
        
        });

        todoELement.addEventListener("contextmenu", (e) =>{
            e.preventDefault();

            todoELement.remove();

            updateLS();
        });

        input.value = "";

        updateLS()
    }
}

// update local storage

function updateLS(){
    const todosElement = document.querySelectorAll('li');
    
    const todos = [];

    todosElement.forEach((todoElement) => {
        todos.push({
            text: todoElement.innerText,
            completed: todoElement.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));

}



