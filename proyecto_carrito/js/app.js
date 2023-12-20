// Selecciona el carrito de compras desde el DOM
const carrito = document.querySelector('#carrito');
// Selecciona la lista de cursos desde el DOM
const listaCursos = document.querySelector('#lista-cursos');
// Selecciona el cuerpo de la tabla dentro del carrito desde el DOM
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
// Selecciona el botón para vaciar el carrito desde el DOM
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
// Inicializa un array vacío para almacenar los artículos del carrito
let articulosCarrito = [];

// Función que carga todos los event listeners
function cargarEventListeners() {
     // Agrega evento click a la lista de cursos para agregar un curso al carrito
     listaCursos.addEventListener('click', agregarCurso);

     // Agrega evento click al carrito para poder eliminar un curso
     carrito.addEventListener('click', eliminarCurso);

     // Agrega evento click al botón de vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     // Evento que se ejecuta al cargar la página para cargar el carrito desde el almacenamiento local
     document.addEventListener('DOMContentLoaded', () => {
          // Carga los artículos del carrito desde el almacenamiento local o inicializa un array vacío si no hay nada almacenado
          articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
          // Llama a la función para mostrar los cursos en el carrito
          carritoHTML();
     });
}

// Llama a la función para cargar los event listeners
cargarEventListeners();

// Función que se ejecuta al hacer clic en un curso para agregarlo al carrito
function agregarCurso(e) {
     // Previene el comportamiento por defecto del evento
     e.preventDefault();
     // Comprueba si el clic se hizo en un botón de agregar al carrito
     if(e.target.classList.contains('agregar-carrito')) {
          // Accede al elemento padre más cercano que representa el curso completo
          const curso = e.target.parentElement.parentElement;
          // Llama a la función para leer los datos del curso seleccionado
          leerDatosCurso(curso);
     }
}

// Función para leer los datos del curso seleccionado y agregarlo al carrito
function leerDatosCurso(curso) {
     // Crea un objeto con la información del curso
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     };

     // Verifica si el curso ya está en el carrito
     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
     if(existe) {
          // Si el curso ya está, aumenta la cantidad
          articulosCarrito = articulosCarrito.map(curso => {
               if(curso.id === infoCurso.id) {
                    curso.cantidad++;
                    return curso;
               } else {
                    return curso;
               }
          });
     } else {
          // Si el curso no está, lo agrega al carrito
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // Actualiza el carrito en el DOM
     carritoHTML();
}

// Función para eliminar un curso del carrito
function eliminarCurso(e) {
     // Previene el comportamiento por defecto del evento
     e.preventDefault();
     // Comprueba si el clic se hizo en un botón de eliminar curso
     if(e.target.classList.contains('borrar-curso')) {
          // Obtiene el ID del curso a eliminar
          const cursoId = e.target.getAttribute('data-id');
          // Filtra el array del carrito eliminando el curso por su ID
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
          // Actualiza el carrito en el DOM
          carritoHTML();
     }
}

// Función para mostrar los cursos del carrito en el DOM
function carritoHTML() {
     // Limpia el contenido actual del carrito en el DOM
     vaciarCarrito();

     // Recorre cada curso en el carrito y los muestra en el DOM
     articulosCarrito.forEach(curso => {
          // Crea un elemento tr (fila de tabla)
          const row = document.createElement('tr');
          // Construye el HTML para cada curso en el carrito
          row.innerHTML = `
               <td><img src="${curso.imagen}" width="100"></td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad}</td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          // Agrega la fila al contenedor del carrito en el DOM
          contenedorCarrito.appendChild(row);
     });

     // Guarda el estado actual del carrito en el almacenamiento local
     sincronizarStorage();
}

// Función para sincronizar el carrito con el almacenamiento local
function sincronizarStorage() {
     // Convierte el carrito a un string en formato JSON y lo guarda en el almacenamiento local
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Función para vaciar el carrito en el DOM
function vaciarCarrito() {
     // Mientras haya un primer hijo en el contenedor del carrito, lo elimina
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

