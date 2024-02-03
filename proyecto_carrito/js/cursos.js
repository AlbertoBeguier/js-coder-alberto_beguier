// Array de cursos

const cursosArray = [
  {
    id: "1",
    imagen: "img/curso1.jpg",
    precio: "$180",
    titulo: "HTML5, CSS3, JS - Principiantes",
  },
  {
    id: "2",
    imagen: "img/curso2.jpg",
    precio: "$180",
    titulo: "Curso de Comida Vegetariana",
  },

  {
    id: "3",
    imagen: "img/curso3.jpg",
    precio: "$250",
    titulo: "Guitarra para Principiantes",
  },

  {
    id: "4",
    imagen: "img/curso4.jpg",
    precio: "$800",
    titulo: "Huerto en tu casa",
  },
  {
    id: "5",
    imagen: "img/curso5.jpg",
    precio: "$250",
    titulo: "Decoración  de tu hogar",
  },
  {
    id: "6",
    imagen: "img/curso1.jpg",
    precio: "$85",
    titulo: "Diseño Web - Principiantes",
  },
  {
    id: "7",
    imagen: "img/curso2.jpg",
    precio: "$120",
    titulo: "Cheff Spress",
  },

  {
    id: "8",
    imagen: "img/curso3.jpg",
    precio: "$150",
    titulo: "Estudio Musical en  casa",
  },

  {
    id: "9",
    imagen: "img/curso4.jpg",
    precio: "$188",
    titulo: "Cosecha hortalizas en casa",
  },

  {
    id: "10",
    imagen: "img/curso5.jpg",
    precio: "$90",
    titulo: "Prepara galletas caseras",
  },

  {
    id: "11",
    imagen: "img/curso1.jpg",
    precio: "$177",
    titulo: "JavaScript Moderno con ES6",
  },

  {
    id: "12",
    imagen: "img/curso2.jpg",
    precio: "$200",
    titulo: "100 Recetas de Comida Natural",
  },

  {
    id: "13",
    imagen: "img/curso3.jpg",
    precio: "$108",
    titulo: "Guitarra Nivel Intermedio",
  },
  {
    id: "14",
    imagen: "img/curso1.jpg",
    precio: "$97",
    titulo: "Diseño Web Nivel Intermedio",
  },
  {
    id: "15",
    imagen: "img/curso5.jpg",
    precio: "$150",
    titulo: "Decoración de interiores",
  },
  {
    id: "16",
    imagen: "img/curso5.jpg",
    precio: "$250",
    titulo: "Aromaterapia en el hogar",
  },
  {
    id: "17",
    imagen: "img/curso3.jpg",
    precio: "$125",
    titulo: "Teoría Musical ",
  },
  {
    id: "18",
    imagen: "img/curso1.jpg",
    precio: "$211",
    titulo: "Fundamentos de Programación ",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  cargarCursos();
  cargarEventListeners();
});

function cargarCursos() {
  const contenedorCursos = document.getElementById("lista-cursos");
  contenedorCursos.innerHTML = ""; // Limpia el contenido anterior

  let htmlCursos = "";
  let row = document.createElement("div");
  row.className = "row";

  cursosArray.forEach((curso, index) => {
    const htmlCurso = `
    <div class="four columns">
      <div class="card">
        <img src="${curso.imagen}" class="imagen-curso u-full-width" />
        <div class="info-card">
          <h4>${curso.titulo}</h4>
          <p class="precio">Precio: <span>${curso.precio}</span></p>
          <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${curso.id}">Agregar Al Carrito</a>
        </div>
      </div>
    </div>`;

    row.innerHTML += htmlCurso;

    if ((index + 1) % 3 === 0) {
      contenedorCursos.appendChild(row);
      row = document.createElement("div");
      row.className = "row";
    }
  });

  // Añade la última fila si no está vacía y si no coincide exactamente con un múltiplo de 3
  if (cursosArray.length % 3 !== 0) {
    contenedorCursos.appendChild(row);
  }
}

function cargarEventListeners() {
  // Agrega cursos al carrito
  document
    .getElementById("lista-cursos")
    .addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  document.querySelector("#carrito").addEventListener("click", eliminarCurso);

  // Vaciar el carrito
  document
    .querySelector("#vaciar-carrito")
    .addEventListener("click", vaciarCarrito);
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Añade el curso al carrito
  articulosCarrito = [...articulosCarrito, infoCurso];
  carritoHTML();
}
