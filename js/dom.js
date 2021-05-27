const UNCOMPLETED_LIST_TODO_ID = "bookself";
const COMPLETED_LIST_TODO_ID = "completed-bookself";
const TODO_ITEMID = "itemId";

function makeTodo(nama, penulis, tahun, isCompleted) {

    const textnama = document.createElement("h2");
    textnama.innerText = nama;

    const textpenulis = document.createElement("p");
    textpenulis.innerText = penulis;

    const texttahun = document.createElement("h4");
    texttahun.innerText = tahun;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textnama, textpenulis, texttahun);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}


function addTodo() {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textnama = document.getElementById("nama").value;
    const textpenulis = document.getElementById("penulis").value;
    const texttahun = document.getElementById("tahun").value;

    const todo = makeTodo(textnama, textpenulis, texttahun, false);
    const TodoObject = composeTodoObject(textnama, textpenulis, texttahun, false);

    todo[TODO_ITEMID] = TodoObject.id;
    todos.push(TodoObject);

    uncompletedTODOList.append(todo);
    updateDataToStorage();

}
function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const textnama = taskElement.querySelector(".inner > h2").innerText;
    const textpenulis = taskElement.querySelector(".inner > p").innerText;
    const texttahun = taskElement.querySelector(".inner > h4").innerText;

    const newTodo = makeTodo(textnama, textpenulis, texttahun, true);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {
    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textnama = taskElement.querySelector(".inner > h2").innerText;
    const textpenulis = taskElement.querySelector(".inner > p").innerText;
    const texttahun = taskElement.querySelector(".inner > h4").innerText;

    const newTodo = makeTodo(textnama, textpenulis, texttahun, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    for (todo of todos) {
        const newTodo = makeTodo(todo.textnama, todo.textpenulis, todo.texttahun, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        if (todo.isCompleted) {
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
}

// function pencarianList(e){
//     const cariList = e.target.value.toLowerCase();
//     let itemList = document.querySelectorAll(".list_item")

//     itemList.forEach((item) =>{
//         const isiItem = item.firstChild.textContent.toLowerCase();
        
//         if(isiItem.toLowerCase().indexOf(e.target.value) !=-1){
//             item.setAttribute("style", "display: block;")
//         }else{
//             item.setAttribute("style", "display: none !important;");
//         }
//     })
// }