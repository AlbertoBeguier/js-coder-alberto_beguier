// Selecciona elementos del DOM.
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

// Inicializa un array vacío para almacenar los artículos del carrito.
let articulosCarrito = [];

// Función para buscar y filtrar cursos

function buscarCurso(e) {
  e.preventDefault();

  // Obtiene el término de búsqueda del campo de entrada
  const textoBuscador = document.querySelector("#buscador").value.toLowerCase();

  // Selecciona todos los cursos
  const cursos = document.querySelectorAll(".card");
  let cursosVisibles = 0;

  cursos.forEach(curso => {
    const tituloCurso = curso.querySelector("h4").textContent.toLowerCase();
    // Verifica si el título del curso incluye el texto buscado
    if (tituloCurso.includes(textoBuscador)) {
      curso.style.display = "block"; // Muestra el curso si coincide
      cursosVisibles++;
    } else {
      curso.style.display = "none"; // Oculta el curso si no coincide
    }
  });

  // Ajusta el estilo de la grilla de cursos basado en la cantidad de cursos visibles
  if (cursosVisibles === 1) {
    listaCursos.style.flexDirection = "column"; // O cualquier estilo que prefieras para una sola fila
  } else {
    listaCursos.style.flexDirection = "row"; // Estilo por defecto para múltiples filas
  }
}

// Event listener para el formulario de búsqueda
document.querySelector("#busqueda").addEventListener("submit", buscarCurso);

// Event listener para el botón de búsqueda (si tienes uno)
const botonBuscar = document.querySelector("#submit-buscador");
if (botonBuscar) {
  botonBuscar.addEventListener("click", buscarCurso);
}

// Espera a que se cargue el DOM antes de ejecutar cualquier script.
document.addEventListener("DOMContentLoaded", () => {
  // Carga los artículos del carrito desde el almacenamiento local o inicializa un array vacío si no hay nada almacenado.
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  // Llama a la función para mostrar los cursos en el carrito.
  carritoHTML();
  // Llama a la función para cargar los event listeners.
  cargarEventListeners();
});

// Función que carga todos los event listeners.
function cargarEventListeners() {
  // Agrega evento click a la lista de cursos para agregar un curso al carrito.
  listaCursos.addEventListener("click", agregarCurso);
  // Agrega evento click al carrito para poder eliminar un curso.
  carrito.addEventListener("click", eliminarCurso);
  // Agrega evento click al botón de vaciar el carrito.
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

// Función que se ejecuta al hacer clic en un curso para agregarlo al carrito.
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

// Función para leer los datos del curso seleccionado y agregarlo al carrito.
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

// Función para eliminar un curso del carrito.
function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Encuentra el curso en el carrito
    const curso = articulosCarrito.find(curso => curso.id === cursoId);

    // Reduce la cantidad o elimina el curso si la cantidad es 1
    if (curso && curso.cantidad > 1) {
      // Reduce la cantidad en 1
      curso.cantidad--;
    } else {
      // Elimina el curso del carrito si la cantidad es 1 o menos
      articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    }

    // Actualiza el carrito en el DOM
    carritoHTML();
  }
}

// Función para mostrar los cursos del carrito en el DOM.
function carritoHTML() {
  // Limpia el contenido actual del carrito en el DOM antes de mostrar los nuevos elementos.
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }

  // Recorre cada curso en el carrito y los muestra en el DOM.
  articulosCarrito.forEach(curso => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
    contenedorCarrito.appendChild(row);
  });

  // Guarda el estado actual del carrito en el almacenamiento local.
  sincronizarStorage();
}

// Función para sincronizar el carrito con el almacenamiento local.
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// Función para vaciar el carrito en el DOM.
function vaciarCarrito() {
  // Vacía el array de artículos del carrito.
  articulosCarrito = [];
  // Limpia el DOM del carrito.
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  // Actualiza el estado del carrito en el almacenamiento local.
  sincronizarStorage();
}
