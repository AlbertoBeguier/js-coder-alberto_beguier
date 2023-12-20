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
