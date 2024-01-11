// CALCULO INTERES SIMPLE

// Escuchamos el evento "DOMContentLoaded" para asegurarnos de que el DOM está completamente cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos el botón de cálculo por su ID.
  const calcularBtn = document.getElementById("calcular");
  // Agregamos un evento click al botón que llamará a la función calcularInteresSimple cuando se haga clic en él.
  calcularBtn.addEventListener("click", calcularInteresSimple);
});

// Definimos la función principal para calcular el interés simple.
function calcularInteresSimple() {
  // Obtenemos los valores ingresados por el usuario y los convertimos a números flotantes o enteros según corresponda.
  const capitalInicial = parseFloat(
    document.getElementById("capitalInicial").value
  );
  const tasaInteres = parseFloat(document.getElementById("tasaInteres").value);
  const periodoTiempo = parseInt(
    document.getElementById("periodoTiempo").value
  );
  const unidadTiempo = parseInt(document.getElementById("unidadTiempo").value);

  // Verificamos que todos los campos estén completos. Si alguno está vacío, mostramos una alerta y salimos de la función.
  if (!capitalInicial || !tasaInteres || !periodoTiempo || !unidadTiempo) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Inicializamos una variable para llevar un seguimiento del capital en cada período.
  let capital = capitalInicial;
  // Obtenemos una referencia al elemento HTML donde mostraremos los resultados en una tabla.
  let tbody = document.getElementById("tablaResultados");
  tbody.innerHTML = ""; // Limpiamos cualquier contenido anterior en la tabla.

  // Iniciamos un bucle que calculará el interés simple y mostrará los resultados en la tabla.
  for (let periodo = 1; periodo <= periodoTiempo; periodo += unidadTiempo) {
    // Calculamos el interés simple para el período actual.
    let interes = capital * (tasaInteres / 100) * unidadTiempo;
    // Calculamos el total acumulado al sumar el capital inicial y el interés.
    let total = capital + interes;

    // Formateamos los valores como pesos argentinos antes de agregarlos a la tabla.
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

    // Creamos una fila HTML con los valores calculados y la agregamos a la tabla.
    let row = `<tr>
            <td>${periodo}</td>
            <td>${formattedCapital}</td>
            <td>${formattedInteres}</td>
            <td>${formattedTotal}</td>
        </tr>`;
    tbody.innerHTML += row;

    // Actualizamos el capital para el siguiente período.
    capital = total;
  }
}
