// Variables globales para guardar el número secreto, intentos, rango máximo y el historial de intentos
let secretNumber;
let attemptsLeft;
let maxRange;
let guessHistory = [];

// Función para iniciar el juego, configurar nivel y preparar todo
function startGame() {
  // Obtiene el valor del nivel seleccionado (easy, medium, hard)
  const level = document.getElementById('level').value;

  // Obtiene los elementos donde se mostrará el área de juego, mensajes y lista de intentos
  const gameArea = document.getElementById('gameArea');
  const feedback = document.getElementById('feedback');
  const guessHistoryList = document.getElementById('guessHistory');

  feedback.textContent = "";       // Limpia el mensaje de feedback
  guessHistory = [];               // Limpia el historial de intentos
  guessHistoryList.innerHTML = ""; // Limpia la lista HTML del historial

  gameArea.classList.remove("hidden"); // Muestra el área del juego (antes oculta)

  // Según el nivel seleccionado, define el rango máximo y los intentos permitidos
  switch (level) {
    case 'easy':
      maxRange = 50;
      attemptsLeft = 10;
      break;
    case 'medium':
      maxRange = 150;
      attemptsLeft = 15;
      break;
    case 'hard':
      maxRange = 450;
      attemptsLeft = 20;
      break;
  }

  // Genera un número secreto aleatorio entre 1 y maxRange
  secretNumber = Math.floor(Math.random() * maxRange) + 1;

  // Muestra en pantalla los intentos que quedan
  document.getElementById('attempts').textContent = attemptsLeft;

  // Prepara el input donde el usuario pondrá su intento: limpia valor, habilita y enfoca
  const input = document.getElementById('userGuess');
  input.value = "";
  input.disabled = false;
  input.focus();
}

// Función para verificar el intento del usuario
function checkGuess() {
  // Obtiene el valor ingresado y lo convierte a número entero
  const userGuess = parseInt(document.getElementById('userGuess').value);

  // Obtiene elementos para mostrar mensajes y el historial
  const feedback = document.getElementById('feedback');
  const guessHistoryList = document.getElementById('guessHistory');

  // Si no es un número válido, muestra mensaje de error y termina
  if (isNaN(userGuess)) {
    feedback.textContent = "Por favor, ingresa un número válido.";
    return;
  }

  // Si el número está fuera del rango permitido, muestra error y termina
  if (userGuess < 1 || userGuess > maxRange) {
    feedback.textContent = `¡Ups! No está dentro del rango permitido (1 - ${maxRange}).`;
    return;
  }

  // Si ya no quedan intentos, informa que perdiste y termina
  if (attemptsLeft <= 0) {
    feedback.textContent = "¡Perdiste! Ya no te quedan intentos.";
    return;
  }

  // Variable para guardar el resultado de la comparación
  let resultText = "";

  // Compara el intento con el número secreto
  if (userGuess === secretNumber) {
    resultText = "✅ Correcto";
    feedback.textContent = `🎉 ¡Adivinaste el número! Era ${secretNumber}`;
    disableGame(); // Desactiva el input para no seguir jugando
  } else if (userGuess < secretNumber) {
    resultText = "🔼 Mayor";
    feedback.textContent = "El número es mayor 🔼";
  } else {
    resultText = "🔽 Menor";
    feedback.textContent = "El número es menor 🔽";
  }

  // Agrega el intento y su resultado al historial
  guessHistory.push({ guess: userGuess, result: resultText });

  // Crea un nuevo elemento de lista para mostrar el intento y resultado
  const listItem = document.createElement("li");
  listItem.textContent = `${userGuess} → ${resultText}`;
  guessHistoryList.appendChild(listItem);

  // Resta un intento y actualiza el contador en pantalla
  attemptsLeft--;
  document.getElementById('attempts').textContent = attemptsLeft;

  // Si no acertó y ya no quedan intentos, muestra que perdiste y desactiva el juego
  if (userGuess !== secretNumber && attemptsLeft === 0) {
    feedback.textContent = `😢 ¡Perdiste! El número era ${secretNumber}`;
    disableGame();
  }

  // Limpia el input y pone el foco para el siguiente intento
  document.getElementById('userGuess').value = "";
  document.getElementById('userGuess').focus();
}

// Función para desactivar el input cuando termina el juego
function disableGame() {
  document.getElementById('userGuess').disabled = true;
}

// Función para reiniciar el juego, limpiando todo y empezando de nuevo
function resetGame() {
  document.getElementById('userGuess').value = "";
  document.getElementById('feedback').textContent = "";
  document.getElementById('guessHistory').innerHTML = "";
  startGame(); // Vuelve a iniciar el juego
}

// Al cargar la página, agrega eventos para usar Enter en nivel y en el input de intento
window.addEventListener('DOMContentLoaded', () => {
  const levelSelect = document.getElementById('level');
  const guessInput = document.getElementById('userGuess');

  // Cuando el usuario presiona Enter en el selector de nivel, empieza el juego
  levelSelect.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      startGame();
    }
  });

  // Cuando el usuario presiona Enter en el input de intento, verifica el intento
  guessInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      checkGuess();
    }
  });
});
