// Función para obtener la fecha y hora actual formateada
function obtenerFechaHora() {
  const fechaHora = new Date();
  return fechaHora.toLocaleString("es-AR");
}

// Función para actualizar los datos y mostrar el mensaje de actualización
function actualizarDatos() {
  // Realizar la solicitud a la API y procesar los datos
  fetch("https://dolarapi.com/v1/dolares")
    .then(response => response.json()) // Convertir la respuesta a formato JSON
    .then(data => {
      // Obtener el elemento donde se mostrarán los datos
      const container = document.getElementById("datosDolar");

      // Crear una tabla para mostrar los datos
      const table = document.createElement("table");

      // Crear la fila de encabezados de la tabla
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = "<th>Tipo</th><th>Compra</th><th> Venta</th>";
      table.appendChild(headerRow);

      // Iterar sobre cada conjunto de datos y agregarlos a la tabla
      data.forEach(item => {
        // Formatear los valores de compra y venta como pesos argentinos
        const compraFormatted = item.compra.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        });
        const ventaFormatted = item.venta.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        });

        // Crear una fila para cada conjunto de datos
        const row = document.createElement("tr");
        // Insertar los valores formateados en las celdas de la fila
        row.innerHTML = `<td>${item.nombre}</td><td>${compraFormatted}</td><td>${ventaFormatted}</td>`;
        // Agregar la fila a la tabla
        table.appendChild(row);
      });

      // Limpiar el contenedor antes de agregar la tabla
      container.innerHTML = "";
      // Agregar la tabla al contenedor
      container.appendChild(table);

      // Mostrar el mensaje de actualización con la fecha y hora actual
      const mensajeActualizacion = document.getElementById(
        "mensajeActualizacion"
      );
      mensajeActualizacion.textContent = `${obtenerFechaHora()}`;
    })
    .catch(error => console.error("Error al obtener los datos:", error));
}

// Obtener el botón de actualización
const btnActualizar = document.getElementById("btnActualizar");
// Asignar la función de actualización al evento click del botón
btnActualizar.addEventListener("click", actualizarDatos);

// Llamar a la función de actualización al cargar la página por primera vez
actualizarDatos();
