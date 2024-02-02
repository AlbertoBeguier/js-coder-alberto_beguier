// Selecciona elementos del DOM.
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const botonComprar = document.querySelector("#boton-comprar");

// Inicializa un array vacío para almacenar los artículos del carrito.
let articulosCarrito = [];

// Función para buscar y filtrar cursos
function buscarCurso(e) {
  e.preventDefault();

  const textoBuscador = document.querySelector("#buscador").value.toLowerCase();
  const cursos = document.querySelectorAll(".card");

  let cursosCoincidentes = [];
  let cursosNoCoincidentes = [];

  cursos.forEach(curso => {
    const tituloCurso = curso.querySelector("h4").textContent.toLowerCase();
    if (tituloCurso.includes(textoBuscador)) {
      cursosCoincidentes.push(curso);
    } else {
      cursosNoCoincidentes.push(curso);
    }
  });

  const contenedorCursos = document.querySelector("#lista-cursos");

  const filasCursos = contenedorCursos.querySelectorAll(".row");
  filasCursos.forEach(fila => fila.remove());

  function agregarCursos(cursos) {
    let fila = document.createElement("div");
    fila.className = "row";

    cursos.forEach((curso, index) => {
      if (index % 3 === 0 && index !== 0) {
        contenedorCursos.appendChild(fila);
        fila = document.createElement("div");
        fila.className = "row";
      }

      const contenedorCurso = document.createElement("div");
      contenedorCurso.className = "four columns";
      contenedorCurso.appendChild(curso.cloneNode(true)); // Clona el nodo para evitar problemas al reinsertar
      fila.appendChild(contenedorCurso);

      if (index === cursos.length - 1) {
        contenedorCursos.appendChild(fila);
      }
    });
  }

  // Agrega primero los cursos coincidentes, luego los no coincidentes
  agregarCursos([...cursosCoincidentes, ...cursosNoCoincidentes]);
}

// Event listener para el formulario de búsqueda
document.querySelector("#busqueda").addEventListener("submit", buscarCurso);

// Event listener para el botón de búsqueda
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
  actualizarContadorCarrito();
});

// Función que carga todos los event listeners.
function cargarEventListeners() {
  // Agrega evento click a la lista de cursos para agregar un curso al carrito.
  listaCursos.addEventListener("click", agregarCurso);
  // Agrega evento click al carrito para poder eliminar un curso.
  carrito.addEventListener("click", eliminarCurso);
  // Agrega evento click al botón de vaciar el carrito.
  vaciarCarritoBtn.addEventListener("click", confirmarVaciarCarrito);
}

// Función que se ejecuta al hacer clic en un curso para agregarlo al carrito.
function agregarCurso(e) {
  e.preventDefault();

  // Verifica si el elemento clickeado (o uno de sus padres) tiene la clase 'agregar-carrito'
  let elemento = e.target;
  while (elemento != null && !elemento.classList.contains("agregar-carrito")) {
    elemento = elemento.parentElement;
  }

  // Si se encontró un elemento con la clase 'agregar-carrito', procesa el clic
  if (elemento != null) {
    Toastify({
      text: "Curso agregado",
      duration: 1500,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to center, #f0f8ff, #5f9ea0)",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "4px",
        border: "2px solid blue",
      },
      onClick: function () {},
    }).showToast();

    const curso = elemento.parentElement.parentElement;
    leerDatosCurso(curso);
    actualizarContadorCarrito();
  }
}

// Función para leer los datos del curso seleccionado y agregarlo al carrito.
function leerDatosCurso(curso) {
  let precioTexto = curso.querySelector(".precio span").textContent;

  // Elimina el símbolo del dólar y las comas, y convierte el precio a número
  let precio = parseFloat(precioTexto.replace("$", "").replace(",", ""));

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: precio, // Ya es un número aquí
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Verifica si el curso ya existe en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if (existe) {
    // Incrementa la cantidad
    articulosCarrito = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
      }
      return curso;
    });
  } else {
    // Si no existe, lo añade al array de carrito
    articulosCarrito.push(infoCurso);
  }

  // Actualiza el HTML del carrito
  carritoHTML();
}

// Función para calcular el precio total de todas las compras.
function calcularTotal() {
  return articulosCarrito.reduce(
    (total, curso) => total + curso.precio * curso.cantidad,
    0
  );
}

// Función para eliminar un curso del carrito.

function eliminarCurso(e) {
  e.preventDefault();

  let cursoId;

  // Verifica si el elemento clickeado es el ícono de la papelera o el enlace que lo contiene
  if (
    e.target.classList.contains("bi-trash3-fill") ||
    e.target.classList.contains("borrar-curso")
  ) {
    cursoId = e.target.closest(".borrar-curso").getAttribute("data-id");
  }

  // Continúa solo si se encontró un cursoId
  if (cursoId) {
    const curso = articulosCarrito.find(curso => curso.id === cursoId);

    if (curso.cantidad > 1) {
      // Disminuye la cantidad en 1 si hay más de uno
      curso.cantidad--;
    } else {
      // Elimina el curso del carrito si la cantidad es 1
      articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    }

    // Muestra notificación de eliminación
    Toastify({
      text: "Curso eliminado",
      duration: 1000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to left, #FF6346, #FF0000)",
        fontSize: "12px",
        fontWeight: "bold",
        borderRadius: "4px",
        border: "2px solid red",
      },
      onClick: function () {},
    }).showToast();

    // Actualiza el carrito en el DOM
    carritoHTML();
    actualizarContadorCarrito();
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
            <a href="#" class="borrar-curso" data-id="${curso.id}">
            <i class="bi bi-trash3-fill"></i>
        </a>
            </td>
        `;
    contenedorCarrito.appendChild(row);
  });

  // Calcular el precio total solo si hay elementos en el carrito
  if (articulosCarrito.length > 0) {
    const total = calcularTotal();

    // Mostrar el precio total en el carrito en negrita y formateado a pesos
    const rowTotal = document.createElement("tr");
    rowTotal.innerHTML = `
      <td colspan="2"></td>
      <td>Total:</td>
      <td><strong>$${total.toFixed(2)}</strong></td>
      <td></td>
  `;
    contenedorCarrito.appendChild(rowTotal);
  }

  // Guarda el estado actual del carrito en el almacenamiento local.
  sincronizarStorage();
}

// Función para sincronizar el carrito con el almacenamiento local.
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// Función para confirmar antes de vaciar el carrito en el DOM.
function confirmarVaciarCarrito() {
  // Verifica si el carrito está vacío antes de mostrar la alerta de confirmación
  if (articulosCarrito.length === 0) {
    // Opcionalmente, muestra una alerta indicando que el carrito ya está vacío
    Swal.fire({
      icon: "info",
      title: "Carrito Vacío",
      text: "No hay cursos en el carrito.",
      background: "#f0f8ff",
      iconColor: "black",
      color: "black",
      confirmButtonColor: "black",
    });
    return; // Sale de la función para evitar ejecutar el resto del código
  }
  // Utiliza SweetAlert2 para mostrar un mensaje de confirmación
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "black",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Vaciar Carrito",
    reverseButtons: false,
    background: "#f0f8ff",
    iconColor: "black",
    color: "black",
  }).then(result => {
    // Si el usuario confirma la acción
    if (result.isConfirmed) {
      // Vacía el array de artículos del carrito
      articulosCarrito = [];
      // Limpia el DOM del carrito
      while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
      // Actualiza el estado del carrito en el almacenamiento local
      sincronizarStorage();
      actualizarContadorCarrito();

      // Muestra una notificación de que los artículos han sido borrados
      Swal.fire({
        title: "¡Eliminado!",
        text: "Tu carrito no contiene cursos.",
        icon: "success",
        background: "#f0f8ff",
        iconColor: "black",
        color: "black",
        confirmButtonColor: "black",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Si el usuario cancela, muestra una notificación
      Swal.fire({
        title: "Cancelado",
        text: "Tu carrito no se ha modificado",
        icon: "error",
        background: "#f0f8ff",
        iconColor: "black",
        color: "black",
        confirmButtonColor: "black",
      });
    }
  });
}

// Función de flecha para actualizar el contador de cursos
const actualizarContadorCarrito = () => {
  const contador = document.querySelector("#contador-carrito");
  // Calcula el total de cursos y actualiza el texto del contador
  const totalCursos = articulosCarrito.reduce(
    (total, curso) => total + curso.cantidad,
    0
  );
  // uso ternario
  contador.textContent = totalCursos > 0 ? totalCursos : "0"; // Si no hay cursos, el contador se muestra en cero
};

if (botonComprar) {
  botonComprar.addEventListener("click", procesarCompra);
}
// Función para vaciar el carrito en el DOM.
function vaciarCarrito() {
  // Vacía el array de artículos del carrito
  articulosCarrito = [];

  // Limpia el contenido del tbody (contenedorCarrito) en el DOM
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }

  // Actualiza el carrito en el almacenamiento local
  sincronizarStorage();

  // Actualiza el contador de artículos en el carrito
  actualizarContadorCarrito();
}

// Función para procesar la compra.
function procesarCompra(e) {
  e.preventDefault(); // Previene el comportamiento por defecto del formulario, si lo hay.

  // Verifica si el carrito está vacío
  if (articulosCarrito.length === 0) {
    // Mostrar mensaje de que el carrito está vacío
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡El carrito está vacío!",
      footer: "Seleccione los cursos que desea adquirir.",
      background: "#f0f8ff",
      iconColor: "black",
      color: "black",
      confirmButtonColor: "black",
    });
  } else {
    // Mostrar mensaje de confirmación de la compra
    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Gracias por su compra!",
      text: "En breve recibirá un código para acceder al contenido adquirido !",
      showConfirmButton: false,
      timer: 4000,
      background: "#f0f8ff",
      iconColor: "black",
      color: "black",
    }).then(() => {
      // Lógica adicional para procesar la compra puede ir aquí .......

      // Vaciar el carrito después de la compra
      vaciarCarrito();
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const carritoIcon = document.querySelector("#img-carrito");
  const carritoSubmenu = document.querySelector("#carrito");
  let timer;

  const abrirSubmenu = () => {
    carritoSubmenu.style.display = "block";
    clearTimeout(timer);
  };

  const cerrarSubmenu = () => {
    timer = setTimeout(() => {
      carritoSubmenu.style.display = "none";
    }, 1000);
  };

  carritoIcon.addEventListener("mouseover", abrirSubmenu);
  carritoIcon.addEventListener("click", abrirSubmenu);

  carritoSubmenu.addEventListener("mouseover", function () {
    clearTimeout(timer);
  });

  // Evento para cerrar el submenú cuando el mouse sale del submenú o del icono del carrito
  carritoSubmenu.addEventListener("mouseout", cerrarSubmenu);
  carritoIcon.addEventListener("mouseout", cerrarSubmenu);
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("agregar-carrito")) {
    const cursoId = e.target.getAttribute("data-id");
    // Encuentra el curso en cursosArray usando cursoId
    const cursoSeleccionado = cursosArray.find(curso => curso.id === cursoId);
  }
});
