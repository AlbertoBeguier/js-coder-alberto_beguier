// Sección para mostrar imágenes al presionar un botón

document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el botón con el ID 'botonCodigo' del DOM
  const BOTON_CODIGO = document.querySelector("#botonCodigo");
  // Verifica si el botón existe antes de agregar el oyente de eventos
  if (BOTON_CODIGO) {
    BOTON_CODIGO.addEventListener("click", mostrarCodigo);
  }

  // Función que se ejecuta cuando se hace clic en el botón BOTON_CODIGO
  function mostrarCodigo() {
    // Selecciona la imagen con la clase 'classImgCod1' del DOM
    let imagCod = document.querySelector(".classImgCod1");
    // Verifica si la imagen existe antes de modificar su clase
    if (imagCod) {
      imagCod.classList.remove("classImgCod1");
    }
  }

  // Selecciona otro botón con el ID 'botonCodigo1' del DOM
  const BOTON_CODIGO1 = document.querySelector("#botonCodigo1");
  // Verifica si el segundo botón existe antes de agregar el oyente de eventos
  if (BOTON_CODIGO1) {
    BOTON_CODIGO1.addEventListener("click", mostrarCodigo1);
  }

  // Función que se ejecuta cuando se hace clic en el botón BOTON_CODIGO1
  function mostrarCodigo1() {
    // Selecciona otra imagen con la clase 'classImgCod2' del DOM
    let imagCod = document.querySelector(".classImgCod2");
    // Verifica si la segunda imagen existe antes de modificar su clase
    if (imagCod) {
      imagCod.classList.remove("classImgCod2");
    }
  }
});

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
