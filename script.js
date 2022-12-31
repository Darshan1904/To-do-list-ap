
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

if(localStorage.getItem('tasks')){
    tasks.map((task)=>{
        addTask(task);
    })
}

const todoForm = document.querySelector('#todoForm');

todoForm.addEventListener('submit',(e)=>{

    e.preventDefault();

    const input = document.getElementById('input').value;

    if(input==""){
        alert('Please enter a task.');
    }

    else{
        const task = {
            id: new Date().getTime(),
            name: input,
        }

        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
        addTask(task);
        todoForm.reset();
    }
})

function addTask(task){
    const taskEle = document.createElement('li');
    taskEle.className = 'listItem';
    taskEle.id = task.id;
    taskEle.innerHTML = `<h4 style="padding:5px 10px; margin-bottom:5px;">${task.name}</h4> <button id="btn3" onclick="editTask(this)"><i class="fas fa-edit"></i></button><button id="btn2" onclick="removeTask(this)"><i class="fas fa-trash "></i></button>`;
    const ul = document.getElementById('list');
    ul.appendChild(taskEle);
}

function removeTask(curEle){
    const taskId = curEle.parentElement.id;
    tasks = tasks.filter((task)=> task.id != taskId);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    curEle.parentElement.remove();
}

let id = 1;

function editTask(curEle){
    if(id){
        curEle.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
        const ibox = document.createElement('input');
        id = 0;
        ibox.type = 'text';
        ibox.id = 'input2';
        ibox.placeholder = 'Add here.....';
        ibox.style = "border: 1px solid;"
        const replace = curEle.parentElement.children[0];
        curEle.parentElement.replaceChild(ibox,replace);
    }
    else{
        id = 1;
        curEle.innerHTML = `<i class="fas fa-edit"></i>`;
        const task = document.createElement('h4');
        const update = document.getElementById('input2').value;
        task.textContent = update;
        if(task.textContent == ""){
            alert('Please enter task !!');
        }
        else{
            const taskId = curEle.parentElement.id;
            tasks.map((task)=>{
                if(task.id == taskId){
                    task.name = update;
                }
            })
            localStorage.setItem('tasks',JSON.stringify(tasks));
            task.style = "padding: 5px 10px;"
            const replace = curEle.parentElement.children[0];
            curEle.parentElement.replaceChild(task,replace);
        }
    }
}