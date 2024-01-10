// Sección de Prompt, Confirm y Alert
const BOTON_PROMPT = document.querySelector("#botonPrompt"); // Selecciona el botón de prompt
BOTON_PROMPT.addEventListener("click", mostrarPrompt); // Asigna evento click al botón

function mostrarPrompt() {
  let nombreCorrecto = false; // Controla si el nombre ingresado es correcto
  let ingreseNombrePrompt; // Almacena el nombre ingresado

  while (!nombreCorrecto) {
    ingreseNombrePrompt = prompt("Ingrese su nombre"); // Prompt para ingresar nombre
    if (ingreseNombrePrompt === null) {
      return; // Sale de la función si se presiona "Cancelar"
    }
    nombreCorrecto = confirm(
      `¿El nombre "${ingreseNombrePrompt}" es correcto?`
    ); // Confirm para verificar el nombre
    if (nombreCorrecto) {
      alert(`Bienvenido ${ingreseNombrePrompt} !`); // Alerta de bienvenida si el nombre es correcto
      console.log(ingreseNombrePrompt); // Muestra el nombre en la consola
      console.log(typeof ingreseNombrePrompt); // Muestra el tipo de dato en la consola
    }
  }
}

// Sección de Mostrar Imágenes de Código
function mostrarImagenCodigo(selectorBoton, selectorImagen, claseImagen) {
  const botonMostarImagen = document.querySelector(selectorBoton); // Selecciona el botón
  if (botonMostarImagen) {
    botonMostarImagen.addEventListener("click", function () {
      let imagCod = document.querySelector(selectorImagen); // Selecciona la imagen
      if (imagCod) {
        imagCod.classList.toggle(claseImagen); // Alterna la clase para mostrar/ocultar
      } else {
        console.log("Imagen no encontrada:", selectorImagen); // Mensaje si la imagen no se encuentra
      }
    });
  } else {
    console.log("Botón no encontrado:", selectorBoton); // Mensaje si el botón no se encuentra
  }
}

// Llamadas a la función para diferentes botones e imágenes
mostrarImagenCodigo("#botonCodigo3", ".classImgCod3", "classImgCod3");
mostrarImagenCodigo("#botonCodigoCuil", ".classImgCodCuil", "classImgCodCuil");
mostrarImagenCodigo(
  "#botonCodigoSueldoNeto",
  ".CodSueldoNeto",
  "CodSueldoNeto"
);

//BOTON MOSTRAR CODIGOS EN PDF

document.querySelectorAll(".mostrar-pdf").forEach(function (img) {
  img.addEventListener("click", function () {
    let pdfUrl = this.getAttribute("data-pdf-url") + "#zoom=125";
    let containerId = this.getAttribute("data-container-id");
    let container = document.getElementById(containerId);
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", pdfUrl);
    iframe.style.width = "60%";
    iframe.style.height = "800px"; // Ajusta según tus necesidades
    container.innerHTML = ""; // Limpiar el contenedor
    container.appendChild(iframe);
  });
});

//FIN BOTON MOSTRAR CODIGOS EN PDF

// Sección de Cálculo de CUIL
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("botonCuil").addEventListener("click", function () {
    calcularCuil(); // Calcula el CUIL al hacer clic
  });
  document
    .getElementById("botonCodigoCuil")
    .addEventListener("click", function () {
      mostrarCodigo(); // Muestra el código al hacer clic
    });
});

function calcularCuil() {
  let numeroDocumento = document.getElementById("numeroDocumento").value; // Obtiene el número de documento
  numeroDocumento = Number(numeroDocumento); // Convierte el valor a número
  let generoSeleccionado = document.querySelector(
    'input[name="genero"]:checked'
  ).value; // Obtiene el género seleccionado

  let resultado = calcularZ(generoSeleccionado, numeroDocumento); // Calcula el prefijo y dígito verificador del CUIL
  let resultadoCuil = resultado.xy + "-" + numeroDocumento + "-" + resultado.z; // Forma el CUIL completo

  // Muestra el resultado en el DOM
  document.getElementById("resultadoCuil").innerText =
    "DNI: " +
    numeroDocumento +
    "   Género: " +
    generoSeleccionado +
    "   CUIL: " +
    resultadoCuil;
}

function calcularZ(genero, numeroDocumento) {
  let xy = genero === "Hombre" ? 20 : 27; // Asigna el prefijo según el género
  let digitosXY = xy.toString().split("").map(Number); // Separa los dígitos del prefijo
  let digitosDocumento = numeroDocumento.toString().split("").map(Number); // Separa los dígitos del documento

  // Factores para calcular el dígito verificador
  let factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let suma = 0;
  for (let i = 0; i < digitosXY.length; i++) {
    suma += digitosXY[i] * factores[i]; // Suma los productos de los dígitos del prefijo
  }
  for (let i = 0; i < digitosDocumento.length; i++) {
    suma += digitosDocumento[i] * factores[i + 2]; // Suma los productos de los dígitos del documento
  }

  // Calcula el resto y determina el dígito verificador
  let resto = suma % 11;
  let z;
  if (resto === 0) {
    z = 0;
  } else if (resto === 1) {
    if (genero === "Hombre") {
      z = 9;
      xy = 23;
    } else if (genero === "Mujer") {
      z = 4;
      xy = 23;
    }
  } else {
    z = 11 - resto;
  }
  return { xy: xy, z: z };
}

// Sección de Cálculo de Sueldo

// Función para calcular el sueldo neto basado en la categoría seleccionada
function obtenerSueldoBasico() {
  // Obtiene el valor seleccionado en el dropdown de categorías
  let seleccion = document.getElementById("ListaCatagorias").value;

  // Verifica si se ha seleccionado una categoría
  if (seleccion === "") {
    // Oculta la tabla de sueldos si no hay selección
    document.getElementById("tablaSueldos").style.display = "none";
    return; // Sale de la función si no se ha seleccionado ninguna categoría
  }

  // Muestra la tabla de sueldos si hay una categoría seleccionada
  document.getElementById("tablaSueldos").style.display = "table";

  // Variables para almacenar los componentes del sueldo
  let sueldoBasico,
    zonaDesfavorable,
    adicionalFeriado,
    adicionalTurnosRotHsNoc,
    adicionalPresentismo,
    sueldoBruto,
    jubilacion,
    ley19032,
    obraSocial,
    sueldoNeto;

  // Asigna el valor de sueldo básico en base a la categoría seleccionada
  switch (seleccion) {
    case "c1":
      sueldoBasico = 352620.35; // Sueldo básico para categoría c1
      break;
    case "c2":
      sueldoBasico = 388391.0; // Sueldo básico para categoría c2
      break;
    case "c3":
      sueldoBasico = 424161.71; // Sueldo básico para categoría c3
      break;
    case "c4":
      sueldoBasico = 459932.43; // Sueldo básico para categoría c4
      break;
    case "c5":
      sueldoBasico = 510217.76; // Sueldo básico para categoría c5
      break;
    default:
      sueldoBasico = 0.0; // Sueldo básico por defecto
      break;
  }

  // Cálculo de los adicionales y deducciones sobre el sueldo
  zonaDesfavorable = sueldoBasico * 0.2; // 20% de sueldo básico para zona desfavorable
  adicionalFeriado = sueldoBasico * 0.03; // 3% de sueldo básico para adicional por feriado
  adicionalTurnosRotHsNoc = sueldoBasico * 0.1; // 10% de sueldo básico para adicional por turnos rotativos o nocturnos
  adicionalPresentismo = sueldoBasico * 0.05; // 5% de sueldo básico para adicional por presentismo
  sueldoBruto =
    sueldoBasico +
    zonaDesfavorable +
    adicionalFeriado +
    adicionalTurnosRotHsNoc +
    adicionalPresentismo; // Suma de sueldo básico y adicionales
  jubilacion = sueldoBruto * 0.11; // 11% del sueldo bruto para jubilación
  ley19032 = sueldoBruto * 0.03; // 3% del sueldo bruto para aporte a la ley 19032
  obraSocial = sueldoBruto * 0.03; // 3% del sueldo bruto para obra social
  sueldoNeto = sueldoBruto - jubilacion - ley19032 - obraSocial; // Cálculo final del sueldo neto

  // Configuración para el formato de moneda argentina
  let formato$arg = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  // Actualiza los elementos en el DOM con los valores calculados, formateados como moneda
  document.getElementById("SueldoBasico").innerText =
    formato$arg.format(sueldoBasico);
  document.getElementById("ZonaDesfavorable").innerText =
    formato$arg.format(zonaDesfavorable);
  document.getElementById("AdicionalFeriado").innerText =
    formato$arg.format(adicionalFeriado);
  document.getElementById("AdicionalTurRotNoc").innerText = formato$arg.format(
    adicionalTurnosRotHsNoc
  );
  document.getElementById("AdicionalPresentismo").innerText =
    formato$arg.format(adicionalPresentismo);
  document.getElementById("SueldoBruto").innerText =
    formato$arg.format(sueldoBruto);
  document.getElementById("Jubilacion").innerText =
    formato$arg.format(jubilacion);
  document.getElementById("Ley19032").innerText = formato$arg.format(ley19032);
  document.getElementById("ObraSocial").innerText =
    formato$arg.format(obraSocial);
  document.getElementById("SueldoNeto").innerText =
    formato$arg.format(sueldoNeto);
}

// Sección diferencia entre dos fechas

// Espera a que se cargue todo el contenido del DOM.
document.addEventListener("DOMContentLoaded", function () {
  // Una vez cargado el DOM, agrega un listener al botón con ID 'calcular'.
  document
    .getElementById("calcular")
    .addEventListener("click", calcularDiferencia);
});

// Función para calcular la diferencia entre dos fechas, incluyendo ambos días.
function calcularDiferencia() {
  // Obtiene el valor del primer input de fecha.
  let fecha1 = document.getElementById("fecha1").value;
  // Obtiene el valor del segundo input de fecha.
  let fecha2 = document.getElementById("fecha2").value;

  // Convierte las cadenas de fecha a objetos Date.
  let date1 = new Date(fecha1);
  let date2 = new Date(fecha2);

  // Calcula la diferencia en milisegundos entre las dos fechas.
  let diferencia = Math.abs(date2 - date1);
  // Convierte la diferencia en milisegundos a días e incluye el día final en el conteo.
  let diasTotales = Math.round(diferencia / (1000 * 3600 * 24)) + 1;

  // Calcula la diferencia en años, meses y días.
  let años = date2.getFullYear() - date1.getFullYear();
  let meses = date2.getMonth() - date1.getMonth();
  let días = date2.getDate() - date1.getDate() + 1; // Incluye el día final en el conteo.

  // Ajusta los días si el resultado es negativo.
  if (días <= 0) {
    // Resta un mes si los días son negativos o cero.
    meses--;
    // Encuentra el último día del mes anterior.
    let ultimoDiaDelMesAnterior = new Date(
      date2.getFullYear(),
      date2.getMonth(),
      0
    ).getDate();
    // Ajusta los días sumando los días del mes anterior.
    días += ultimoDiaDelMesAnterior;
  }

  // Ajusta los meses si el resultado es negativo.
  if (meses < 0) {
    // Resta un año si los meses son negativos.
    años--;
    // Ajusta los meses sumando 12.
    meses += 12;
  }

  // Funciones para manejar correctamente el plural de días, meses y años.
  let textoDias = diasTotales === 1 ? "día" : "días";
  let textoMeses = meses === 1 ? "mes" : "meses";
  let textoAños = años === 1 ? "año" : "años";
  let textoDiasIndividuales = días === 1 ? "día" : "días";

  // Muestra el resultado en el elemento con ID 'resultado'.

  document.getElementById(
    "resultadoAnMesDias"
  ).innerHTML = `La diferencia es de ${años} ${textoAños}, ${meses} ${textoMeses} y ${días} ${textoDiasIndividuales}.`;
  document.getElementById(
    "resultado"
  ).innerHTML = `La diferencia es de ${diasTotales} ${textoDias}.`;
}

// CARGAR UN ARCHIVO CSV LEERLO Y DEVOLVERLO COMO UN OBJETO
// CUYAS KEYS SON LOS TILULOS DE LAS COLUMNAS Y LOS VALORES TODAS LAS RESTANTES FILAS DE ESA COLUMNA

// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script.
document.addEventListener("DOMContentLoaded", function () {
  // Agrega un manejador de evento 'change' al input de tipo 'file'.
  document
    .getElementById("input-file")
    .addEventListener("change", handleFileSelect, false);
});

// Función que se ejecuta cuando el usuario selecciona un archivo.
function handleFileSelect(event) {
  const file = event.target.files[0]; // Obtiene el archivo seleccionado por el usuario.
  const reader = new FileReader(); // Crea una nueva instancia de FileReader.

  // Evento que se dispara cuando el contenido del archivo ha sido leído.
  reader.onload = function (event) {
    const text = event.target.result; // Obtiene el contenido del archivo como texto.
    const data = parseCSVToObject(text); // Parsea el texto CSV a un objeto.
    displayTable(data); // Muestra los datos en una tabla.
    console.log(data); // verificar objeto con keys = titulos de la columna y valores = array de las restantes filas de las columnas
  };

  reader.readAsText(file); // Lee el contenido del archivo como texto.
}

// Función para parsear el texto del archivo CSV a un objeto.
function parseCSVToObject(text) {
  const lines = text.split("\n"); // Divide el texto en líneas.
  const headers = lines[0].split(";").filter(cell => cell.trim() !== ""); // Extrae los títulos de las columnas.
  const dataObject = {}; // Objeto para almacenar los datos.

  headers.forEach(header => {
    dataObject[header] = []; // Inicializa un array para cada columna.
  });

  // Itera sobre las líneas restantes para llenar el objeto.
  lines.slice(1).forEach(line => {
    if (line.trim() === "") return; // Ignora líneas vacías.
    const values = line.split(";").map(cell => cell.trim());

    // Verifica que la línea tenga el número correcto de celdas y que todas las celdas tengan datos.
    if (
      values.length === headers.length &&
      !values.some(value => value === "")
    ) {
      headers.forEach((header, index) => {
        dataObject[header].push(values[index]); // Añade el valor a la columna correspondiente.
      });
    }
  });

  return dataObject; // Retorna el objeto con los datos.
}

// Función para mostrar los datos del objeto en forma de tabla.
function displayTable(dataObject) {
  const container = document.getElementById("table-container"); // Encuentra el contenedor.
  const table = document.createElement("table"); // Crea un elemento <table>.
  table.setAttribute("border", "1");

  // Añade la fila de encabezados.
  const headerRow = document.createElement("tr");
  Object.keys(dataObject).forEach(header => {
    const headerCell = document.createElement("th");
    headerCell.textContent = header; // Establece el contenido del encabezado.
    headerRow.appendChild(headerCell);
  });
  table.appendChild(headerRow);

  // Determina el número de filas en base a la longitud de los arrays.
  const numRows = Object.values(dataObject)[0].length;

  // Añade las filas de datos.
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");
    let addRow = true; // Flag para determinar si la fila debe ser añadida.
    Object.keys(dataObject).forEach(key => {
      const cell = document.createElement("td");
      cell.textContent = dataObject[key][i] || ""; // Añade el dato o un string vacío si no hay dato.
      if (dataObject[key][i] === "") addRow = false; // Si algún valor está vacío, no añadir la fila.
      row.appendChild(cell);
    });
    if (addRow) table.appendChild(row); // Añade la fila solo si todos los valores están presentes.
  }

  container.innerHTML = ""; // Limpia cualquier contenido previo.
  container.appendChild(table); // Añade la tabla al contenedor.
}

// CALCULADORA

// Declaración de variables para almacenar los valores y operaciones
let operacionActual = ""; // Almacena la cadena de la operación en curso
let resultado = null; // Almacena el resultado de la última operación

// Función para actualizar el display con la operación actual o el resultado
function actualizarDisplay() {
  let valorDisplay = operacionActual;
  // Si no hay una operación en curso, pero hay un resultado, muestra el resultado
  if (valorDisplay === "" && resultado !== null) {
    valorDisplay = formatearNumero(resultado);
  } else if (valorDisplay !== "") {
    // Si hay una operación en curso, muestra la operación formateada
    valorDisplay = formatearOperacion(operacionActual);
  }
  // Establece el valor del display
  document.getElementById("display").value = valorDisplay;
}

// Función para formatear el número con separadores de miles y decimales
function formatearNumero(numero) {
  // Utiliza Intl.NumberFormat para formatear números según el estándar alemán
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 20 }).format(
    numero
  );
}

// Función para formatear la operación, manteniendo operadores intactos
function formatearOperacion(operacion) {
  // Divide la operación en números y operadores
  return (
    operacion
      .split(/([\+\-\*\/\(\)])/)
      // Formatea cada número manteniendo los operadores como están
      .map(elem =>
        isNaN(elem) || elem === "" ? elem : formatearNumero(Number(elem))
      )
      .join("")
  ); // Une de nuevo todos los elementos formateados
}

// Función para añadir un número o símbolo a la operación
function agregarASecuencia(caracter) {
  // Si hay un resultado y se inicia una nueva operación, usa ese resultado
  if (
    resultado !== null &&
    (operacionActual === "" || isNaN(operacionActual))
  ) {
    operacionActual = resultado.toString();
    resultado = null;
  }
  // Añade el nuevo caracter a la operación actual
  operacionActual += caracter;
  // Actualiza el display
  actualizarDisplay();
}

// Función para calcular el resultado de la operación
function calcular() {
  // Verifica si hay una operación para calcular
  if (operacionActual !== "") {
    try {
      // Realiza el cálculo utilizando eval y maneja errores
      resultado = eval(operacionActual.replace(/,/g, ""));
      operacionActual = "";
    } catch (error) {
      resultado = "Error";
    }
    // Resetea la operación actual y actualiza el display
    actualizarDisplay();
  }
}

// Función para limpiar la calculadora y empezar de nuevo
function limpiar() {
  operacionActual = "";
  resultado = null;
  actualizarDisplay();
}

// Función para borrar el último caracter ingresado o retroceder en el resultado
function borrar() {
  // Verifica si hay una operación en curso
  if (operacionActual !== "") {
    // Borra el último caracter de la operación actual
    operacionActual = operacionActual.slice(0, -1);
  } else if (resultado !== null) {
    // Si no hay operación en curso, pero hay un resultado, permite retroceder en el resultado
    let resultadoStr = resultado.toString();
    if (resultadoStr !== "Error") {
      // Convierte el resultado a string y borra el último caracter
      resultadoStr = resultadoStr.slice(0, -1);
      // Convierte de nuevo a número y actualiza el resultado
      resultado = resultadoStr === "" ? null : Number(resultadoStr);
    } else {
      // Si el resultado es "Error", simplemente limpia el resultado
      resultado = null;
    }
  }
  // Actualiza el display
  actualizarDisplay();
}

// Funciones para manejar los botones de la interfaz
function presionarNumero(numero) {
  agregarASecuencia(numero);
}

function presionarOperador(operador) {
  agregarASecuencia(operador);
}

// Evento para manejar la entrada del teclado
document.addEventListener("keydown", function (event) {
  // Captura los eventos de teclado y llama a las funciones correspondientes
  if ("0123456789+-*/().".includes(event.key)) {
    agregarASecuencia(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calcular();
  } else if (event.key === "Backspace") {
    borrar();
  } else if (event.key === "Escape") {
    limpiar();
  }
});

// FIN CALCULADORA
