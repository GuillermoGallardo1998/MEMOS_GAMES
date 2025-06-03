// Obtener referencias a elementos del DOM por su ID
const modeSelect = document.getElementById('mode'); 
// Busca en la página el elemento con id "mode" (un select o algo para elegir modo) y lo guarda en esta variable

const player1Choices = document.getElementById('player1-choices'); 
// Busca el elemento donde están las opciones para que el jugador 1 elija y lo guarda

const resultDiv = document.getElementById('result'); 
// Busca donde se mostrará el resultado del juego y lo guarda

const historyBody = document.getElementById('history-body'); 
// Busca la parte donde se mostrará el historial de partidas (una tabla o lista)

const resetBtn = document.getElementById('reset-btn'); 
// Busca el botón para reiniciar el juego

// Variables del juego
let mode = modeSelect.value; 
// Guarda el modo seleccionado (por ejemplo "cpu" o "2 jugadores")

let player1Choice = null; 
// Aquí guardaremos la elección del jugador 1 (piedra, papel o tijera)

let waitingForPlayer2 = false; 
// Indica si estamos esperando que el jugador 2 haga su elección

let roundCounter = 0; 
// Contador de rondas jugadas

let score = { jugador1: 0, jugador2: 0 }; 
// Guarda el puntaje de cada jugador, ambos empiezan en 0

let juegoTerminado = false; 
// Indica si el juego ya terminó (para evitar que sigan jugando)

// Opciones posibles en el juego: piedra, papel, tijera
const opciones = ['piedra', 'papel', 'tijera'];

// Cuando se cambia el modo (del select), actualiza el modo y reinicia el juego
modeSelect.addEventListener('change', () => {
  mode = modeSelect.value; // Actualiza la variable mode con el nuevo valor
  reiniciarJuego();        // Llama a la función para reiniciar todo
});

// Cuando se hace clic en el botón reset, reinicia el juego
resetBtn.addEventListener('click', reiniciarJuego);

// Función que reinicia todos los valores del juego para empezar de nuevo
function reiniciarJuego() {
  score = { jugador1: 0, jugador2: 0 }; // Reinicia puntajes
  roundCounter = 0;                     // Reinicia contador de rondas
  historyBody.innerHTML = '';           // Limpia el historial mostrado en la página
  resultDiv.textContent = '';           // Limpia el resultado mostrado
  player1Choice = null;                 // Limpia elección del jugador 1
  waitingForPlayer2 = false;            // Ya no esperamos al jugador 2
  juegoTerminado = false;               // Juego no está terminado
  resetBtn.style.display = 'none';     // Oculta el botón reset (hasta que termine una serie)
}

// Función que determina quién gana la ronda con las elecciones de jugador1 y jugador2
function obtenerGanador(j1, j2) {
  if (j1 === j2) return 'Empate'; 
  // Si ambos eligieron igual, es empate

  // Reglas que indican si gana el jugador 1:
  if (
    (j1 === 'piedra' && j2 === 'tijera') || // Piedra gana a tijera
    (j1 === 'papel' && j2 === 'piedra') ||  // Papel gana a piedra
    (j1 === 'tijera' && j2 === 'papel')     // Tijera gana a papel
  ) {
    return 'Jugador 1 gana'; // Jugador 1 gana en estos casos
  }

  // Si no es empate y jugador 1 no gana, gana el otro jugador o la CPU según el modo
  return mode === 'cpu' ? 'CPU gana' : 'Jugador 2 gana';
}

// Función que genera una elección aleatoria para la CPU
function eleccionCPU() {
  // Math.random() genera un número entre 0 y 1
  // Lo multiplicamos por la cantidad de opciones y usamos Math.floor para redondear hacia abajo
  // Así elegimos un índice aleatorio entre 0 y 2 para opciones array
  return opciones[Math.floor(Math.random() * opciones.length)];
}

// Función que agrega el resultado de la ronda actual al historial mostrado
function agregarAlHistorial(j1, j2, resultado) {
  roundCounter++; // Suma 1 a la ronda actual

  // Crea una fila de tabla <tr>
  const fila = document.createElement('tr'); 

  // Llena la fila con las columnas <td> mostrando número ronda, jug1, jug2 y resultado
  fila.innerHTML = `
    <td>${roundCounter}</td>
    <td>${j1}</td>
    <td>${j2}</td>
    <td>${resultado}</td>
  `;

  // Agrega la fila al cuerpo del historial para que aparezca en la página
  historyBody.append(fila);
}

// Función que actualiza el puntaje según quién ganó la ronda
function actualizarPuntaje(resultado) {
  if (resultado === 'Jugador 1 gana') score.jugador1++; // Si gana jugador 1, suma punto

  else if (resultado === 'Jugador 2 gana' || resultado === 'CPU gana') score.jugador2++; 
  // Si gana jugador 2 o CPU, suma punto para jugador 2

  // Si alguien llega a 3 puntos, termina la serie (mejor de 5)
  if (score.jugador1 === 3 || score.jugador2 === 3) {
    juegoTerminado = true; // Marca que juego terminó

    // Decide quién es el ganador final según puntajes y modo
    const ganadorFinal = score.jugador1 === 3 ? 'Jugador 1' : (mode === 'cpu' ? 'CPU' : 'Jugador 2');

    // Muestra mensaje de ganador en el resultado
    resultDiv.innerHTML += `<br><strong>🎉 ${ganadorFinal} gana la serie (mejor de 5) 🎉</strong>`;

    // Muestra el botón para reiniciar el juego
    resetBtn.style.display = 'inline-block'; 
  }
}

// Cuando se hace clic en alguna opción dentro del contenedor de elecciones de jugador 1
player1Choices.addEventListener('click', (e) => {
  // Si no se hizo clic en un elemento con clase 'choice' o el juego terminó, no hacer nada
  if (!e.target.classList.contains('choice') || juegoTerminado) return;

  // Obtiene la elección del jugador, guardada en data-choice del elemento clickeado
  const choice = e.target.dataset.choice;

  if (mode === 'cpu') {
    // Modo jugador contra CPU
    const cpuChoice = eleccionCPU(); // CPU elige aleatoriamente
    const resultado = obtenerGanador(choice, cpuChoice); // Decide ganador
    resultDiv.innerHTML = `Elegiste: ${choice} | CPU eligió: ${cpuChoice} <br>${resultado}`; // Muestra resultado
    agregarAlHistorial(choice, cpuChoice, resultado); // Agrega resultado al historial
    actualizarPuntaje(resultado); // Actualiza puntaje

  } else {
    // Modo jugador 1 contra jugador 2
    if (!waitingForPlayer2) {
      // Si no está esperando jugador 2, quiere decir que es turno jugador 1
      player1Choice = choice; // Guarda elección de jugador 1
      resultDiv.textContent = 'Jugador 1 ha elegido. Turno de Jugador 2...'; // Mensaje para que jugador 2 elija
      waitingForPlayer2 = true; // Ahora sí espera elección de jugador 2

    } else {
      // Si ya estaba esperando jugador 2, esta es la elección de jugador 2
      const player2Choice = choice; // Guarda elección jugador 2
      const resultado = obtenerGanador(player1Choice, player2Choice); // Decide ganador
      resultDiv.innerHTML = `Jugador 1: ${player1Choice} | Jugador 2: ${player2Choice} <br>${resultado}`; // Muestra resultado
      agregarAlHistorial(player1Choice, player2Choice, resultado); // Agrega resultado al historial
      actualizarPuntaje(resultado); // Actualiza puntaje
      waitingForPlayer2 = false; // Ahora vuelve a esperar elección jugador 1 para siguiente ronda
    }
  }
});
