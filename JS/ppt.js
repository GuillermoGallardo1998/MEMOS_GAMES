// Obtener referencias a elementos del DOM por su ID
const modeSelect = document.getElementById('mode');
const player1Choices = document.getElementById('player1-choices'); 
const resultDiv = document.getElementById('result'); 
const historyBody = document.getElementById('history-body'); 
const resetBtn = document.getElementById('reset-btn'); 

// Variables del juego
let mode = modeSelect.value; 
let player1Choice = null;
let waitingForPlayer2 = false; 
let roundCounter = 0; 
let score = { jugador1: 0, jugador2: 0 }; 
let juegoTerminado = false; 

const opciones = ['piedra', 'papel', 'tijera'];

// Escucha el cambio del modo de juego y reinicia el juego
modeSelect.addEventListener('change', () => {
  mode = modeSelect.value; 
  reiniciarJuego(); 
});

// Escucha el clic en el botón de reinicio
resetBtn.addEventListener('click', reiniciarJuego);

// Función que reinicia todos los valores del juego
function reiniciarJuego() {
  score = { jugador1: 0, jugador2: 0 }; 
  roundCounter = 0; 
  historyBody.innerHTML = ''; 
  resultDiv.textContent = ''; 
  player1Choice = null; 
  waitingForPlayer2 = false; 
  juegoTerminado = false; 
  resetBtn.style.display = 'none';
}

// Función que determina el ganador entre dos elecciones
function obtenerGanador(j1, j2) {
  if (j1 === j2) return 'Empate';
  if (
    (j1 === 'piedra' && j2 === 'tijera') ||
    (j1 === 'papel' && j2 === 'piedra') ||
    (j1 === 'tijera' && j2 === 'papel')
  ) {
    return 'Jugador 1 gana';
  }
  return mode === 'cpu' ? 'CPU gana' : 'Jugador 2 gana';
}

// Función que genera una elección aleatoria para la CPU
function eleccionCPU() {
  return opciones[Math.floor(Math.random() * opciones.length)];
}

// Función que agrega el resultado de una ronda al historial
function agregarAlHistorial(j1, j2, resultado) {
  roundCounter++; 
  const fila = document.createElement('tr'); 
  fila.innerHTML = `
    <td>${roundCounter}</td>
    <td>${j1}</td>
    <td>${j2}</td>
    <td>${resultado}</td>
  `;
  historyBody.append(fila);
}

// Función que actualiza el marcador según el resultado de la ronda
function actualizarPuntaje(resultado) {
  if (resultado === 'Jugador 1 gana') score.jugador1++;
  else if (resultado === 'Jugador 2 gana' || resultado === 'CPU gana') score.jugador2++;

  // Si algún jugador llega a 3 puntos, termina el juego (serie mejor de 5)
  if (score.jugador1 === 3 || score.jugador2 === 3) {
    juegoTerminado = true; // Marca que el juego ha terminado
    const ganadorFinal = score.jugador1 === 3 ? 'Jugador 1' : (mode === 'cpu' ? 'CPU' : 'Jugador 2');
    resultDiv.innerHTML += `<br><strong>🎉 ${ganadorFinal} gana la serie (mejor de 5) 🎉</strong>`;
    resetBtn.style.display = 'inline-block'; 
  }
}

// Escucha clics en las elecciones del jugador 1 (y jugador 2 en modo 2 jugadores)
player1Choices.addEventListener('click', (e) => {
  if (!e.target.classList.contains('choice') || juegoTerminado) return;
  const choice = e.target.dataset.choice;

  if (mode === 'cpu') {
    // Modo jugador vs CPU
    const cpuChoice = eleccionCPU();
    const resultado = obtenerGanador(choice, cpuChoice);
    resultDiv.innerHTML = `Elegiste: ${choice} | CPU eligió: ${cpuChoice} <br>${resultado}`;
    agregarAlHistorial(choice, cpuChoice, resultado);
    actualizarPuntaje(resultado);

  } else {
    // Modo jugador 1 vs jugador 2
    if (!waitingForPlayer2) {
      player1Choice = choice;
      resultDiv.textContent = 'Jugador 1 ha elegido. Turno de Jugador 2...';
      waitingForPlayer2 = true;
    } else {
      const player2Choice = choice;
      const resultado = obtenerGanador(player1Choice, player2Choice);
      resultDiv.innerHTML = `Jugador 1: ${player1Choice} | Jugador 2: ${player2Choice} <br>${resultado}`;
      agregarAlHistorial(player1Choice, player2Choice, resultado);
      actualizarPuntaje(resultado);
      waitingForPlayer2 = false;
    }
  }
});
