// CALCULO INTERES

// Escucha el evento "DOMContentLoaded" que se dispara cuando el DOM está completamente cargado.
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el botón 'Calcular' por su ID y lo asigna a la variable 'calcularBtn'.
  const calcularBtn = document.getElementById("calcular");
  // Obtiene el campo de entrada 'capitalInicial' por su ID.
  const capitalInicialInput = document.getElementById("capitalInicial");

  // Asigna un manejador de evento 'click' al botón 'calcularBtn' que llama a la función 'calcularInteresSimple'.
  calcularBtn.addEventListener("click", calcularInteresSimple);
  // Asigna un manejador de evento 'input' al campo 'capitalInicialInput' que llama a la función 'actualizarFormatoCapitalInicial'.
  capitalInicialInput.addEventListener(
    "input",
    actualizarFormatoCapitalInicial
  );
});

// Define la función que maneja la entrada de datos en el campo 'capitalInicial'.
function actualizarFormatoCapitalInicial(event) {
  // Obtiene el valor actual del campo de entrada.
  let valor = event.target.value;
  // Divide el valor en partes separadas por comas (parte entera y decimal).
  let partes = valor.split(",");
  // Elimina caracteres no numéricos de la parte entera y agrega separadores de miles.
  partes[0] = partes[0]
    .replace(/[^0-9]/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Vuelve a unir las partes en una sola cadena y actualiza el valor del campo de entrada.
  event.target.value = partes.join(",");
}

// Define la función principal para calcular el interés simple.
function calcularInteresSimple() {
  // Obtiene el valor formateado del campo 'capitalInicial' y lo convierte a un número flotante.
  const valorFormateado = document.getElementById("capitalInicial").value;
  const capitalInicial =
    parseFloat(valorFormateado.replace(/\./g, "").replace(",", ".")) || 0;

  // Obtiene los valores de los otros campos y los convierte a números flotantes o enteros.
  const tasaInteres = parseFloat(document.getElementById("tasaInteres").value);
  const periodoTiempo = parseInt(
    document.getElementById("periodoTiempo").value
  );
  const unidadTiempo = parseInt(document.getElementById("unidadTiempo").value);

  // Verifica si alguno de los campos está vacío y muestra una alerta si es así.
  if (!capitalInicial || !tasaInteres || !periodoTiempo || !unidadTiempo) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Inicializa la variable 'capital' para seguir el capital en cada período.
  let capital = capitalInicial;
  // Obtiene una referencia al elemento 'tbody' en el DOM para mostrar los resultados.
  let tbody = document.getElementById("tablaResultados");
  tbody.innerHTML = ""; // Limpia cualquier contenido previo en 'tbody'.

  // Inicia un bucle para calcular y mostrar el interés simple en cada período.
  for (let periodo = 1; periodo <= periodoTiempo; periodo += unidadTiempo) {
    // Calcula el interés para el período actual.
    let interes = capital * (tasaInteres / 100) * unidadTiempo;
    // Suma el interés al capital para obtener el total.
    let total = capital + interes;

    // Formatea el capital, el interés y el total como moneda.
    let formattedCapital = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(capital);
    let formattedInteres = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(interes);
    let formattedTotal = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(total);

    // Crea una fila de tabla con los valores formateados y la agrega a 'tbody'.
    let row = `<tr><td>${periodo}</td><td>${formattedCapital}</td><td>${formattedInteres}</td><td>${formattedTotal}</td></tr>`;
    tbody.innerHTML += row;

    // Actualiza el capital para el próximo período.
    capital = total;
  }
}
