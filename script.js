document.addEventListener("DOMContentLoaded",() =>{
    //DOM manipulation 

const todoInput = document.getElementById("todo-input")
const addTaskButton = document.getElementById("add-task-btn")
const todoList = document.getElementById("todo-list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

tasks.forEach(task => rendertask(task))

addTaskButton.addEventListener("click" , () =>{
    const taskText = todoInput.value.trim()
    if(taskText =="") return

    const newTask = {
        id:Date.now(),
        text:taskText,
        completed:false,
    }
    tasks.push(newTask)
    savetasks()
    rendertask(newTask)
    todoInput.value = "" //clear Input
    console.log(tasks);
})

function rendertask(task){
   const li =  document.createElement("li")
   li.setAttribute('data-id',task.id)
   if(task.completed) li.classList.add('completed')
   li.innerHTML = `
   <span>${task.text}</span>
   <button>Delete</button>
   `
   li.addEventListener('click', (e) =>{
    if(e.target.tagName === 'BUTTON') return;
    task.completed = !task.completed
    li.classList.toggle('completed')
    savetasks()
   })

   li.querySelector('button').addEventListener('click',(e) => {
    e.stopPropagation() // prevent toggle from firing
    tasks = tasks.filter(t => t.id !== t.id) 
    li.remove()
    savetasks();
   })
   todoList.appendChild(li);
}

function savetasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
})

//localstorage : store elements in local storage of browser