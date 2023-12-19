// PROMPT CONFIRM y  ALERT- PAGINA PRACTICA - EJERCICIO 1
const BOTON_PROMPT = document.querySelector("#botonPrompt");
BOTON_PROMPT.addEventListener("click", mostrarPrompt);

function mostrarPrompt() {
    let nombreCorrecto = false;
    let ingreseNombrePrompt;
    while (!nombreCorrecto) {
        // Mostrar un prompt para que el usuario ingrese su nombre
        ingreseNombrePrompt = prompt("Ingrese su nombre");
        // Si el usuario presiona "Cancelar" en el prompt, se sale del bucle
        if (ingreseNombrePrompt === null) {
            return;
        }
        // Preguntar al usuario si el nombre ingresado es correcto
        nombreCorrecto = confirm(`¿El nombre "${ingreseNombrePrompt}" es correcto?`);
        // Si el nombre es correcto, mostrar una alerta y salir del bucle
        if (nombreCorrecto) {
            alert(`Bienvenido ${ingreseNombrePrompt} !`);
            console.log(ingreseNombrePrompt); // Verificar valor por consola
            console.log(typeof(ingreseNombrePrompt)); // Verificar el tipo de dato
        }
    }
}
// FIN PROMPT CONFIRM y ALERT - PAGINA PRACTICA - EJERCICIO 1


// Función genérica para mostrar imágenes de código
function mostrarImagenCodigo(selectorBoton, selectorImagen, claseImagen) {
    const botonMostarImagen = document.querySelector(selectorBoton);
    if (botonMostarImagen) {
        botonMostarImagen.addEventListener("click", function() {
            let imagCod = document.querySelector(selectorImagen);
            if (imagCod) {
                imagCod.classList.toggle(claseImagen);
            } else {
                console.log("Imagen no encontrada:", selectorImagen);
            }
        });
    } else {
        console.log("Botón no encontrado:", selectorBoton);
    }
}

// Botón para mostrar código prompt
mostrarImagenCodigo("#botonCodigo3", ".classImgCod3", "classImgCod3");
// Botón para mostrar código CUIL
mostrarImagenCodigo("#botonCodigoCuil", ".classImgCodCuil", "classImgCodCuil");
// Botón para mostrar código Sueldo Neto
mostrarImagenCodigo("#botonCodigoSueldoNeto", ".CodSueldoNeto", "CodSueldoNeto");



 // NRO DE CUIL
 document.addEventListener('DOMContentLoaded', function() {
    // Evento para el botón que ejecuta el script
    document.getElementById('botonCuil').addEventListener('click', function() {
        calcularCuil();
    });
    // Evento para el botón que muestra el código
    document.getElementById('botonCodigoCuil').addEventListener('click', function() {
        mostrarCodigo();
    });
});

function calcularCuil() {
    let numeroDocumento = document.getElementById('numeroDocumento').value;
    numeroDocumento = Number(numeroDocumento);
    let generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;
    // Asegurarse de que el argumento generoSeleccionado se pase correctamente
    let resultado = calcularZ(generoSeleccionado, numeroDocumento);
    // Usar el resultado de calcularZ para mostrar el CUIL
    let resultadoCuil = resultado.xy.toString() +"-" + numeroDocumento.toString() + "-" +resultado.z.toString();
    // Mostrar resultados en el párrafo
    document.getElementById('resultadoCuil').innerText = 'DNI: ' + numeroDocumento + '   Género: ' + generoSeleccionado + '   CUIL: ' + resultadoCuil;
}
function calcularZ(genero, numeroDocumento) {
    // Establecer el prefijo xy basado en el género
    let xy = genero === 'Hombre' ? 20 : 27;
    // Descomponer xy y el número de documento en sus dígitos
    let digitosXY = xy.toString().split('').map(Number);
    let digitosDocumento = numeroDocumento.toString().split('').map(Number);
    // Multiplicar cada dígito por su correspondiente factor
    let factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;
    for (let i = 0; i < digitosXY.length; i++) {
        suma += digitosXY[i] * factores[i];
    }
    for (let i = 0; i < digitosDocumento.length; i++) {
        suma += digitosDocumento[i] * factores[i + 2];
    }
    // Calcular el resto
    let resto = suma % 11;
    // Determinar z basado en el resto
    let z;
    if (resto === 0) {
        z = 0;
    } else if (resto === 1) {
        if (genero === 'Hombre') {
            z = 9;
            xy = 23;
        } else if (genero === 'Mujer') {
            z = 4;
            xy = 23;
        }
    } else {
        z = 11 - resto;
    }
    return { xy: xy, z: z };
}

// CALCULO SUELDO
function obtenerSueldoBasico() {
    let seleccion = document.getElementById('ListaCatagorias').value;
    if (seleccion === "") {
        document.getElementById('tablaSueldos').style.display = 'none';
        return; // no mostarr la tabla sueldos hasta que no se elija una categoría
    }

    document.getElementById('tablaSueldos').style.display = 'table'; // Mostrar la tabla

    let sueldoBasico, zonaDesfavorable, adicionalFeriado, adicionalTurnosRotHsNoc, adicionalPresentismo, sueldoBruto, jubilacion, ley19032, obraSocial;

    switch (seleccion) {
        case 'c1':
            sueldoBasico = 352620.35;
            break;
        case 'c2':
            sueldoBasico = 388391.00;
            break;
        case 'c3':
            sueldoBasico = 424161.71;
            break;
        case 'c4':
            sueldoBasico = 459932.43;
            break;
        case 'c5':
            sueldoBasico = 510217.76;
            break;
        default:
            sueldoBasico = 0.00;
    }

    // Calcular Zona Desfavorable como el 20% del sueldo básico
    zonaDesfavorable = sueldoBasico * 0.20;
    // Calcular Adicional Feriados como el 3% del sueldo básico
    adicionalFeriado = sueldoBasico * 0.03;
    // Calcular Adicional Turnos Rotativos/Horas Nocturnas como el 10% del sueldo básico
    adicionalTurnosRotHsNoc = sueldoBasico * 0.10;
    // Calcular Adicional Presentismo como el 5% del sueldo básico
    adicionalPresentismo = sueldoBasico * 0.05;
    // Calcular sueldo bruto
    sueldoBruto = sueldoBasico + zonaDesfavorable + adicionalFeriado + adicionalTurnosRotHsNoc + adicionalPresentismo;
    // Calcular Jubilación 11% del sueldo bruto
    jubilacion = sueldoBruto* 0.11;
    // Calcular ley 19032 3% del sueldo bruto
    ley19032 = sueldoBruto* 0.03;
    // Calcular obra social 3% del sueldo bruto
    obraSocial = sueldoBruto* 0.03;
    // Calcular sueldo neto
    sueldoNeto = sueldoBruto - jubilacion - ley19032 - obraSocial
    // Formatear los montos como moneda en el formato de pesos argentinos
    let formato$arg = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });
    let sueldoBasicoFormateado = formato$arg.format(sueldoBasico);
    let zonaDesfavorableFormateada = formato$arg.format(zonaDesfavorable);
    let adicionalFeriadoFormateado = formato$arg.format(adicionalFeriado);
    let adicionalTurnosRotHsNocFormateado = formato$arg.format(adicionalTurnosRotHsNoc);
    let adicionalPresentismoFormateado = formato$arg.format(adicionalPresentismo);
    let sueldoBrutoFormateado = formato$arg.format(sueldoBruto);
    let jubilacionFormateado = formato$arg.format(jubilacion);
    let ley19032Formateado = formato$arg.format(ley19032);
    let obraSocialFormateado = formato$arg.format(obraSocial);
    let sueldoNetoFormateado = formato$arg.format(sueldoNeto);
    // Actualizar el contenido de las celdas de la tabla con los valores formateados
    document.getElementById('SueldoBasico').innerText = sueldoBasicoFormateado;
    document.getElementById('ZonaDesfavorable').innerText = zonaDesfavorableFormateada;
    document.getElementById('AdicionalFeriado').innerText = adicionalFeriadoFormateado;
    document.getElementById('AdicionalTurRotNoc').innerText = adicionalTurnosRotHsNocFormateado;
    document.getElementById('AdicionalPresentismo').innerText = adicionalPresentismoFormateado;
    document.getElementById('SueldoBruto').innerText = sueldoBrutoFormateado;
    document.getElementById('Jubilacion').innerText = jubilacionFormateado;
    document.getElementById('Ley19032').innerText = ley19032Formateado;
    document.getElementById('ObraSocial').innerText = obraSocialFormateado;
    document.getElementById('SueldoNeto').innerText = sueldoNetoFormateado;
}
// FIN CALCULO SUELDO

