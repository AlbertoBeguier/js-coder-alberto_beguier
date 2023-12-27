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
        nombreCorrecto = confirm(`¿El nombre "${ingreseNombrePrompt}" es correcto?`); // Confirm para verificar el nombre
        if (nombreCorrecto) {
            alert(`Bienvenido ${ingreseNombrePrompt} !`); // Alerta de bienvenida si el nombre es correcto
            console.log(ingreseNombrePrompt); // Muestra el nombre en la consola
            console.log(typeof(ingreseNombrePrompt)); // Muestra el tipo de dato en la consola
        }
    }
}




// Sección de Mostrar Imágenes de Código
function mostrarImagenCodigo(selectorBoton, selectorImagen, claseImagen) {
    const botonMostarImagen = document.querySelector(selectorBoton); // Selecciona el botón
    if (botonMostarImagen) {
        botonMostarImagen.addEventListener("click", function() {
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
mostrarImagenCodigo("#botonCodigoSueldoNeto", ".CodSueldoNeto", "CodSueldoNeto");




// Sección de Cálculo de CUIL
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('botonCuil').addEventListener('click', function() {
        calcularCuil(); // Calcula el CUIL al hacer clic
    });
    document.getElementById('botonCodigoCuil').addEventListener('click', function() {
        mostrarCodigo(); // Muestra el código al hacer clic
    });
});

function calcularCuil() {
    let numeroDocumento = document.getElementById('numeroDocumento').value; // Obtiene el número de documento
    numeroDocumento = Number(numeroDocumento); // Convierte el valor a número
    let generoSeleccionado = document.querySelector('input[name="genero"]:checked').value; // Obtiene el género seleccionado

    let resultado = calcularZ(generoSeleccionado, numeroDocumento); // Calcula el prefijo y dígito verificador del CUIL
    let resultadoCuil = resultado.xy + "-" + numeroDocumento + "-" + resultado.z; // Forma el CUIL completo

    // Muestra el resultado en el DOM
    document.getElementById('resultadoCuil').innerText = 'DNI: ' + numeroDocumento + '   Género: ' + generoSeleccionado + '   CUIL: ' + resultadoCuil;
}

function calcularZ(genero, numeroDocumento) {
    let xy = genero === 'Hombre' ? 20 : 27; // Asigna el prefijo según el género
    let digitosXY = xy.toString().split('').map(Number); // Separa los dígitos del prefijo
    let digitosDocumento = numeroDocumento.toString().split('').map(Number); // Separa los dígitos del documento

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
        if (genero === 'Hombre') {
            z = 9; xy = 23;
        } else if (genero === 'Mujer') {
            z = 4; xy = 23;
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
    let seleccion = document.getElementById('ListaCatagorias').value;

    // Verifica si se ha seleccionado una categoría
    if (seleccion === "") {
        // Oculta la tabla de sueldos si no hay selección
        document.getElementById('tablaSueldos').style.display = 'none';
        return; // Sale de la función si no se ha seleccionado ninguna categoría
    }

    // Muestra la tabla de sueldos si hay una categoría seleccionada
    document.getElementById('tablaSueldos').style.display = 'table';

    // Variables para almacenar los componentes del sueldo
    let sueldoBasico, zonaDesfavorable, adicionalFeriado, adicionalTurnosRotHsNoc, adicionalPresentismo, sueldoBruto, jubilacion, ley19032, obraSocial, sueldoNeto;

    // Asigna el valor de sueldo básico en base a la categoría seleccionada
    switch (seleccion) {
        case 'c1':
            sueldoBasico = 352620.35; // Sueldo básico para categoría c1
            break;
        case 'c2':
            sueldoBasico = 388391.00; // Sueldo básico para categoría c2
            break;
        case 'c3':
            sueldoBasico = 424161.71; // Sueldo básico para categoría c3
            break;
        case 'c4':
            sueldoBasico = 459932.43; // Sueldo básico para categoría c4
            break;
        case 'c5':
            sueldoBasico = 510217.76; // Sueldo básico para categoría c5
            break;
        default:
            sueldoBasico = 0.00; // Sueldo básico por defecto
            break;
    }

    // Cálculo de los adicionales y deducciones sobre el sueldo
    zonaDesfavorable = sueldoBasico * 0.20; // 20% de sueldo básico para zona desfavorable
    adicionalFeriado = sueldoBasico * 0.03; // 3% de sueldo básico para adicional por feriado
    adicionalTurnosRotHsNoc = sueldoBasico * 0.10; // 10% de sueldo básico para adicional por turnos rotativos o nocturnos
    adicionalPresentismo = sueldoBasico * 0.05; // 5% de sueldo básico para adicional por presentismo
    sueldoBruto = sueldoBasico + zonaDesfavorable + adicionalFeriado + adicionalTurnosRotHsNoc + adicionalPresentismo; // Suma de sueldo básico y adicionales
    jubilacion = sueldoBruto * 0.11; // 11% del sueldo bruto para jubilación
    ley19032 = sueldoBruto * 0.03; // 3% del sueldo bruto para aporte a la ley 19032
    obraSocial = sueldoBruto * 0.03; // 3% del sueldo bruto para obra social
    sueldoNeto = sueldoBruto - jubilacion - ley19032 - obraSocial; // Cálculo final del sueldo neto

    // Configuración para el formato de moneda argentina
    let formato$arg = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });

    // Actualiza los elementos en el DOM con los valores calculados, formateados como moneda
    document.getElementById('SueldoBasico').innerText = formato$arg.format(sueldoBasico);
    document.getElementById('ZonaDesfavorable').innerText = formato$arg.format(zonaDesfavorable);
    document.getElementById('AdicionalFeriado').innerText = formato$arg.format(adicionalFeriado);
    document.getElementById('AdicionalTurRotNoc').innerText = formato$arg.format(adicionalTurnosRotHsNoc);
    document.getElementById('AdicionalPresentismo').innerText = formato$arg.format(adicionalPresentismo);
    document.getElementById('SueldoBruto').innerText = formato$arg.format(sueldoBruto);
    document.getElementById('Jubilacion').innerText = formato$arg.format(jubilacion);
    document.getElementById('Ley19032').innerText = formato$arg.format(ley19032);
    document.getElementById('ObraSocial').innerText = formato$arg.format(obraSocial);
    document.getElementById('SueldoNeto').innerText = formato$arg.format(sueldoNeto);
}



// Sección diferencia entre dos fechas

// Espera a que se cargue todo el contenido del DOM.
document.addEventListener('DOMContentLoaded', function() {
    // Una vez cargado el DOM, agrega un listener al botón con ID 'calcular'.
    document.getElementById('calcular').addEventListener('click', calcularDiferencia);
});

// Función para calcular la diferencia entre dos fechas, incluyendo ambos días.
function calcularDiferencia() {
    // Obtiene el valor del primer input de fecha.
    let fecha1 = document.getElementById('fecha1').value;
    // Obtiene el valor del segundo input de fecha.
    let fecha2 = document.getElementById('fecha2').value;

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
        let ultimoDiaDelMesAnterior = new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
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
    let textoDias = diasTotales === 1 ? 'día' : 'días';
    let textoMeses = meses === 1 ? 'mes' : 'meses';
    let textoAños = años === 1 ? 'año' : 'años';
    let textoDiasIndividuales = días === 1 ? 'día' : 'días';

    // Muestra el resultado en el elemento con ID 'resultado'.

    document.getElementById('resultadoAnMesDias').innerHTML = `La diferencia es de ${años} ${textoAños}, ${meses} ${textoMeses} y ${días} ${textoDiasIndividuales}.`;
    document.getElementById('resultado').innerHTML = `La diferencia es de ${diasTotales} ${textoDias}.`;
}


// Sección cargar un archivo csv y leer los datos 

// Se espera a que todo el contenido del DOM esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', function() {
    // Agrega un manejador de evento 'change' al input de tipo 'file'.
    document.getElementById('input-file').addEventListener('change', handleFileSelect, false);
});

// Función que se ejecuta cuando el usuario selecciona un archivo.
function handleFileSelect(event) {
    // Obtiene el archivo seleccionado por el usuario.
    const file = event.target.files[0];

    // Crea una nueva instancia de FileReader para leer el contenido del archivo.
    const reader = new FileReader();

    // Define lo que ocurre cuando el contenido del archivo ha sido leído por FileReader.
    reader.onload = function(event) {
        // Obtiene el contenido del archivo como una cadena de texto.
        const text = event.target.result;

        // Parsea el texto CSV a un array de arrays y luego muestra estos datos en una tabla.
        const data = parseCSV(text);
        displayTable(data);
    };

    // Lee el contenido del archivo como texto.
    reader.readAsText(file);
}

// Función para parsear el texto del archivo CSV.
function parseCSV(text) {
    // Divide el texto en líneas, usando el salto de línea como separador.
    return text.split('\n').map(line => {
        // Divide cada línea en celdas, usando ';' como separador, y filtra las celdas vacías.
        return line.split(';').filter(cell => cell.trim() !== '');
    }).filter(row => row.length > 0); // Filtra y elimina las filas que están completamente vacías.
}

// Función para mostrar los datos parseados en forma de tabla en el HTML.
function displayTable(data) {
    // Encuentra el contenedor en el DOM donde se mostrará la tabla.
    const container = document.getElementById('table-container');

    // Crea un elemento <table> para mostrar los datos.
    const table = document.createElement('table');
    table.setAttribute('border', '1');

    // Itera sobre cada fila de datos.
    data.forEach(row => {
        // Crea un elemento <tr> para cada fila de datos.
        const tableRow = document.createElement('tr');

        // Itera sobre cada celda en la fila de datos.
        row.forEach(cell => {
            // Crea un elemento <td> para cada celda de datos.
            const tableCell = document.createElement('td');
            // Establece el contenido de la celda con el valor de la celda.
            tableCell.textContent = cell;
            // Añade la celda a la fila de la tabla.
            tableRow.appendChild(tableCell);
        });

        // Añade la fila completa a la tabla.
        table.appendChild(tableRow);
    });

    // Limpia cualquier contenido previo en el contenedor y añade la nueva tabla.
    container.innerHTML = '';
    container.appendChild(table);
}

// CALCULADORA
// Declaración de variables para almacenar los valores de la operación
let operacionActual = '';   // Almacena el número que se está ingresando actualmente
let operacionAnterior = ''; // Almacena el número ingresado antes de seleccionar una operación
let operacion = undefined;  // Almacena la operación que se va a realizar

// Función para manejar cuando se presiona un número
function presionarNumero(numero) {
    operacionActual = operacionActual.toString() + numero.toString();
    actualizarDisplay();
}

// Función para manejar cuando se selecciona una operación
function presionarOperador(op) {
    if (operacionActual === '') return;
    if (operacionAnterior !== '') {
        calcular();
    }
    operacion = op;
    operacionAnterior = operacionActual;
    operacionActual = '';
}
/// Función para realizar el cálculo y actualizar el display
function calcular() {
    let calculo;
    const anterior = parseFloat(operacionAnterior);
    const actual = parseFloat(operacionActual);
    if (isNaN(anterior) || isNaN(actual)) return;
    switch (operacion) {
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case '*':
            calculo = anterior * actual;
            break;
        case '/':
            // Manejo especial cuando se intenta dividir por cero
            if (actual === 0) {
                mostrarError("No se puede dividir por cero");
                return;
            }
            calculo = anterior / actual;
            break;
        default:
            return;
    }
    operacionActual = calculo;
    operacionAnterior = '';
    operacion = undefined;
    actualizarDisplay();
}
// Función para mostrar un mensaje de error en el display
function mostrarError(mensaje) {
    operacionActual = mensaje;
    operacionAnterior = '';
    operacion = undefined;
    actualizarDisplay();
}
// Función para actualizar el display de la calculadora
function actualizarDisplay() {
    document.getElementById('display').value = operacionActual;
}
// Función para limpiar la calculadora y empezar de nuevo
function limpiar() {
    operacionActual = '';
    operacionAnterior = '';
    operacion = undefined;
    actualizarDisplay();
}
// Función para borrar el último dígito ingresado
function borrar() {
    operacionActual = operacionActual.toString().slice(0, -1);
    actualizarDisplay();
}
// Evento para manejar la entrada del teclado
document.addEventListener('keydown', function(event) {
    // Verifica si la tecla presionada es un número y llama a presionarNumero
    if (event.key >= '0' && event.key <= '9') presionarNumero(event.key);

    // Verifica si la tecla presionada es un operador y llama a presionarOperador
    if (['+', '-', '*', '/'].includes(event.key)) presionarOperador(event.key);
    // Verifica si la tecla presionada es 'Enter' o '=' y llama a calcular
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();  // Previene cualquier acción predeterminada del Enter
        calcular();
    }
    // Verifica si la tecla presionada es 'Backspace' y llama a borrar
    if (event.key === 'Backspace') borrar();
    // Verifica si la tecla presionada es 'Escape' y llama a limpiar
    if (event.key === 'Escape') limpiar();
    // Verifica si la tecla presionada es un punto y llama a presionarNumero
    if (event.key === '.') presionarNumero('.');
});
// Función para manejar cuando se presiona un número o un punto decimal
function presionarNumero(numero) {
    // Si el número es un punto y ya hay un punto en operacionActual, simplemente retorna
    if (numero === '.' && operacionActual.includes('.')) return;

    // De lo contrario, agrega el número o punto al final de operacionActual
    operacionActual = operacionActual.toString() + numero.toString();
    actualizarDisplay();
}
// FIN CALCULADORA

