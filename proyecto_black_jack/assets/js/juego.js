// Inicialización del deck (mazo de cartas) como arreglo vacío
let deck = [];

// Tipos de cartas (corresponden a los palos: Clubs, Diamonds, Hearts, Spades)
const tipos = ["C", "D", "H", "S"];

// Cartas especiales (As, Jota, Reina, Rey)
const especiales = ["A", "J", "Q", "K"];

// Puntos del jugador y de la computadora inicializados en 0
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias a elementos del HTML para los botones
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

// Referencias a elementos del HTML para las cartas
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

// Referencias a elementos del HTML para mostrar los puntos
const puntosHTML = document.querySelectorAll("small");

// Función para crear un nuevo deck
const crearDeck = () => {
  // Crear cartas numéricas del 2 al 10 para cada tipo de palo
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  // Crear cartas especiales para cada tipo de palo
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  // Barajar el deck
  deck = _.shuffle(deck);
  return deck;
};

// Llamar a crearDeck para inicializar el juego
crearDeck();

// Función para pedir una nueva carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  return deck.pop();
};

// Función para determinar el valor de una carta
const valorCarta = carta => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno de la computadora
const turnoComputadora = puntosMinimos => {
  do {
    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    // Crear imagen de la carta y añadirla al HTML
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`; // Ejemplo: 3H, JD
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  // Evaluar el resultado después de un breve retraso
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana :(");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador Gana");
    } else {
      alert("Computadora Gana");
    }
  }, 100);
};

// Eventos para los botones
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  // Crear imagen de la carta y añadirla al HTML
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`; // Ejemplo: 3H, JD
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  // Condiciones para finalizar el juego
  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  // Reiniciar el juego
  console.clear();
  deck = [];
  crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;
  divCartasComputadora.innerHTML = "";
  divCartasJugador.innerHTML = "";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});

//BOTON MOSTRAR CODIGOS EN PDF

document.querySelectorAll(".mostrar-pdf").forEach(function (img) {
  img.addEventListener("click", function () {
    let pdfUrl = this.getAttribute("data-pdf-url") + "#zoom=110";
    let containerId = this.getAttribute("data-container-id");
    let container = document.getElementById(containerId);
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", pdfUrl);
    iframe.style.width = "100%";
    iframe.style.height = "500px"; // Ajusta según tus necesidades
    container.innerHTML = ""; // Limpiar el contenedor
    container.appendChild(iframe);
  });
});

//FIN BOTON MOSTRAR CODIGOS EN PDF
