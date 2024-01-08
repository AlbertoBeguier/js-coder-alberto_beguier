// Sección para mostrar imágenes al presionar un botón

// Selecciona el botón con el ID 'botonCodigo' del DOM
const BOTON_CODIGO = document.querySelector("#botonCodigo");
// Agrega un oyente de eventos 'click' al botón seleccionado
BOTON_CODIGO.addEventListener("click", mostrarCodigo);

// Función que se ejecuta cuando se hace clic en el botón BOTON_CODIGO
function mostrarCodigo() {
  // Selecciona la imagen con la clase 'classImgCod1' del DOM
  let imagCod = document.querySelector(".classImgCod1");
  // Elimina la clase 'classImgCod1' de la imagen seleccionada, haciéndola visible
  imagCod.classList.remove("classImgCod1");
}

// Selecciona otro botón con el ID 'botonCodigo1' del DOM
const BOTON_CODIGO1 = document.querySelector("#botonCodigo1");
// Agrega un oyente de eventos 'click' a este segundo botón
BOTON_CODIGO1.addEventListener("click", mostrarCodigo1);

// Función que se ejecuta cuando se hace clic en el botón BOTON_CODIGO1
function mostrarCodigo1() {
  // Selecciona otra imagen con la clase 'classImgCod2' del DOM
  let imagCod = document.querySelector(".classImgCod2");
  // Elimina la clase 'classImgCod2' de la imagen seleccionada, haciéndola visible
  imagCod.classList.remove("classImgCod2");
}
// Fin de la sección para mostrar imágenes al presionar un botón

// Sección de función para abrir un archivo PDF

// Función para abrir un archivo PDF
function abrirPDF() {
  // Abre una nueva pestaña en el navegador y carga el archivo PDF 'ApuntesJS.pdf'
  window.open("files/ApuntesJS.pdf", "_blank");
}
function abrirPDF1() {
  // Abre una nueva pestaña en el navegador y carga el archivo PDF 'ApuntesJS.pdf'
  window.open("files/js-notesByMajoLedesma.pdf", "_blank");
}
function abrirPDF2() {
  // Abre una nueva pestaña en el navegador y carga el archivo PDF 'ApuntesJS.pdf'
  window.open(
    "files/Clean_JavaScript_Aprende_a_Aplicar_Codigo_Limpio_SOLID_y_Testing.pdf",
    "_blank"
  );
}

// Fin de la sección de función para abrir un archivo PDF
