const inputTarea = document.getElementById("nuevaTarea"); 
const btnAgregar = document.getElementById("agregarBtn"); 
const listaTareas = document.getElementById("listaDeTareas"); 
const inputBuscar = document.getElementById("buscarTarea"); 
const btnBuscar = document.getElementById("buscarBtn"); 
const mensajeVacio = document.getElementById("mensajeVacio");
const animacion = document.querySelector('.leaveAnimated');
const boxSearch = document.querySelector(".boxSearch");


const cantidadHojas = 25; 
let tareas = []; 

//localstorage
function guardarEnLocalStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas)); //convierto el array a texto
}

function cargarDesdeLocalStorage() {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")); //texto guardado pasa a array
  if (tareasGuardadas) {
    tareas = tareasGuardadas;
  }
  mostrarTareas(); // mostrar tareas 
}

function agregarTarea(event) {
  event.preventDefault();
  const texto = inputTarea.value.trim(); // eliminar espacios en blanco
  if (texto === "") {
    alert("Por favor, escribe una tarea");
    return; 
  }

  const nuevaTarea = {
    id: Date.now(), 
    texto,
    completada: false,
    color:"#ffffff"
  };

  tareas.push(nuevaTarea);
  guardarEnLocalStorage();
  mostrarTareas();
  formulario.reset() = ""; //formulario.reset()
}

// eliminar una tarea
function eliminarTarea(id) {
  tareas = tareas.filter(function (tarea) {
    return tarea.id !== id;
  }); 

  guardarEnLocalStorage();
  mostrarTareas();
}

function eliminarTodasTareas() {
  if (tareas.length === 0) return;
  const confirmacion = confirm("¿Seguro que quieres eliminar todas las tareas?");
  if (confirmacion) {
    tareas = [];
    guardarEnLocalStorage();
    mostrarTareas();
  }
}

const btnEliminarTodas = document.createElement("button");
btnEliminarTodas.textContent = "Eliminar todas";
btnEliminarTodas.classList.add("btnDeleteAllTask");
btnEliminarTodas.addEventListener("click", eliminarTodasTareas);

boxSearch.appendChild(btnEliminarTodas);


// tarea finalizada
function tareaCompletada(id) {
  const index = tareas.findIndex(function (tarea) {
    if (tarea.id === id) {
      return true
    } return false
  });

  tareas[index].completada = !tareas[index].completada
  guardarEnLocalStorage();
  mostrarTareas();
}

//editar colores
function cambiarColor (id, nuevocolor) {
  const tarea = tareas.find(t => t.id === id);
  tarea.color = nuevocolor;
  guardarEnLocalStorage();
  mostrarTareas();
}

// mostrar tareas 
function mostrarTareas(filtro = "") {
  listaTareas.innerHTML = "";
  filtro = filtro.toLowerCase();// hace una sola vez tlc
  const tareasFiltradas = tareas.filter(function (tarea) {
    return tarea.texto.toLowerCase().includes(filtro); 
  });
  if (tareasFiltradas.length === 0) {
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }

  tareasFiltradas.forEach(function (tarea) {
    const li = document.createElement("li");
    li.style.backgroundColor = tarea.color;
    const span = document.createElement("span");
    if (tarea.completada) {
      span.style.textDecoration = "line-through"; //crear span texto 
      span.style.color = "gray";
    }

    span.textContent = tarea.texto;
    li.appendChild(span);

    //elegir color btn

    const btnColor = document.createElement("button");
    btnColor.type = "button";
    btnColor.textContent = "\u{1F3A8}";  
    btnColor.style.marginLeft = "10px";
    btnColor.style.fontSize = "20px";
    btnColor.style.border = "none";
    btnColor.style.background = "none";
    btnColor.style.cursor = "pointer";
    btnColor.setAttribute("aria-label", "Elegir color");

    const inputColor = document.createElement("input");
    inputColor.type = "color";
    inputColor.value = tarea.color || "#ffffff";
    inputColor.style.visibility = "hidden";
    btnColor.addEventListener("click", () => {
      inputColor.click();
    });
    inputColor.addEventListener("change", () => {
      cambiarColor(tarea.id, inputColor.value);
    });

    const btnCompletado = document.createElement("button");  // boton tarea completa
    btnCompletado.textContent = "\u2714";
    btnCompletado.style.marginLeft = "10px";
    btnCompletado.addEventListener("click", function () {
      tareaCompletada(tarea.id);
    });

    const btnEliminar = document.createElement("button"); // boton para eliminar tarea
    btnEliminar.textContent = "\u274C";
    btnEliminar.style.marginLeft = "5px";
    btnEliminar.addEventListener("click", function () {
      eliminarTarea(tarea.id);
    });

    li.appendChild(btnCompletado);
    li.appendChild(btnEliminar);
     li.appendChild(btnColor);
    li.appendChild(inputColor); 
    listaTareas.appendChild(li);
  });
}

// buscar tareas
function buscarTareas() {
  const textoBuscado = inputBuscar.value.trim(); 
  mostrarTareas(textoBuscado);
}


for (let i = 0; i < cantidadHojas; i++) {
  const leave = document.createElement("div");
  leave.classList.add("leave");
  leave.style.left = Math.random() * 100 + "vw";
  const size = 10 + Math.random() * 25;
  leave.style.width = size + "px";
  leave.style.height = size + "px";
  leave.style.animationDuration = (5 + Math.random() * 5) + "s";
  leave.style.animationDelay = Math.random() * 5 + "s";
  const colores = ["#2e2e2e", "#3b3b3b", "#1f1f1f", "#4a4a4a"];
  leave.style.background = colores[Math.floor(Math.random() * colores.length)];

  animacion.appendChild(leave);
}

// e

const formulario = document.querySelector(".boxTask");
formulario.addEventListener("submit", agregarTarea);

btnBuscar.addEventListener("click", function (e) {
  e.preventDefault();
  buscarTareas();
});

inputBuscar.addEventListener("keyup", function () {
  buscarTareas();
});

document.addEventListener("DOMContentLoaded", cargarDesdeLocalStorage);