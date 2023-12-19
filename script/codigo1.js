// ver immagen al presionar un boton --> trabaja eliminando la clase que hace el elemento invisible
const BOTON_CODIGO= document.querySelector("#botonCodigo")
 BOTON_CODIGO.addEventListener("click",mostrarCodigo)
 function mostrarCodigo(){
   let imagCod = document.querySelector(".classImgCod1")
   imagCod.classList.remove("classImgCod1");
 }
 const BOTON_CODIGO1= document.querySelector("#botonCodigo1")
 BOTON_CODIGO1.addEventListener("click",mostrarCodigo1)
 function mostrarCodigo1(){
   let imagCod = document.querySelector(".classImgCod2")
   imagCod.classList.remove("classImgCod2");
 }
// fin ver immagen al presionar un boton --> trabaja eliminando la clase que hace el elemento invisible


// FUNCION QUE ABRE EL ARCHIVO PDF CON LA TEORIA
function abrirPDF() {
  window.open("files/ApuntesJS.pdf", '_blank');
}
// FIN FUNCION QUE ABRE EL ARCHIVO PDF CON LA TEORIA


