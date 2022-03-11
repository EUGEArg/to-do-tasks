import checkComplete from "./checkComplete.js";
import deleteIcon from "./deleteIcon.js";
import { displayTasks } from "./readTasks.js";

// Función que recibe el evento, el cual genera el formulario
export const addTask = (evento) => {
    evento.preventDefault();

       const list = document.querySelector("[data-list]"); // Lista de tareas
       const input = document.querySelector("[data-form-input]"); // Para que el usuario agregue tarea
       const calendar = document.querySelector("[data-form-date]"); //Fecha seleccionada

       const value = input.value; //Texto que agregó el usuario
       const date = calendar.value; //Fecha seleccionada
       const dateFormat = moment(date).format("DD/MM/YYYY"); //Formato de la fecha

       if(value === '' || date === ''){
          return;
       }

        input.value = ""; 
        calendar.value = "";

       const complete = false;

       const taskObjet = { //Objeto donde almacenamos ambos datos
            value,
            dateFormat,
            complete,
            id: uuid.v4()
       };

       list.innerHTML = '';

       const taskList = JSON.parse(localStorage.getItem("tasks")) || []; // || pipe-short circuit evaluation
             taskList.push(taskObjet);
             localStorage.setItem("tasks", JSON.stringify(taskList));

             displayTasks();
};

//Texto y fecha que pone el usuario
export const createTask = ({ value, dateFormat, complete, id }) => {
  const task = document.createElement("li");
        task.classList.add("card");

  const taskContent = document.createElement("div");

const check = checkComplete(id);

if(complete) {
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
     
}
  const titleTask = document.createElement("span");
        titleTask.classList.add("task");
        titleTask.innerText = value; //texto o valor que agrega el usuario
        taskContent.appendChild(check);
        taskContent.appendChild(titleTask);

  const dateElement = document.createElement("span"); // crear span para fecha
        dateElement.innerHTML = dateFormat;

        task.appendChild(taskContent);
        task.appendChild(dateElement);
        task.appendChild(deleteIcon(id));
 return task;
};
