let secretNumber;
let attemptsLeft;
let maxRange;
let guessHistory = [];

function startGame() {
  const level = document.getElementById('level').value;
  const gameArea = document.getElementById('gameArea');
  const feedback = document.getElementById('feedback');
  const guessHistoryList = document.getElementById('guessHistory');

  feedback.textContent = "";
  guessHistory = [];
  guessHistoryList.innerHTML = "";

  gameArea.classList.remove("hidden");

  switch (level) {
    case 'easy':
      maxRange = 50;
      attemptsLeft = 10;
      break;
    case 'medium':
      maxRange = 150;
      attemptsLeft = 30;
      break;
    case 'hard':
      maxRange = 450;
      attemptsLeft = 90;
      break;
  }

  secretNumber = Math.floor(Math.random() * maxRange) + 1;
  document.getElementById('attempts').textContent = attemptsLeft;
  const input = document.getElementById('userGuess');
  input.value = "";
  input.disabled = false;
  input.focus();
}

function checkGuess() {
  const userGuess = parseInt(document.getElementById('userGuess').value);
  const feedback = document.getElementById('feedback');
  const guessHistoryList = document.getElementById('guessHistory');

  if (isNaN(userGuess)) {
    feedback.textContent = "Por favor, ingresa un número válido.";
    return;
  }

  if (userGuess < 1 || userGuess > maxRange) {
    feedback.textContent = `¡Ups! No está dentro del rango permitido (1 - ${maxRange}).`;
    return;
  }

  if (attemptsLeft <= 0) {
    feedback.textContent = "¡Perdiste! Ya no te quedan intentos.";
    return;
  }

  let resultText = "";
  if (userGuess === secretNumber) {
    resultText = "✅ Correcto";
    feedback.textContent = `🎉 ¡Adivinaste el número! Era ${secretNumber}`;
    disableGame();
  } else if (userGuess < secretNumber) {
    resultText = "🔼 Mayor";
    feedback.textContent = "El número es mayor 🔼";
  } else {
    resultText = "🔽 Menor";
    feedback.textContent = "El número es menor 🔽";
  }

  // Registrar intento
  guessHistory.push({ guess: userGuess, result: resultText });
  const listItem = document.createElement("li");
  listItem.textContent = `${userGuess} → ${resultText}`;
  guessHistoryList.appendChild(listItem);

  attemptsLeft--;
  document.getElementById('attempts').textContent = attemptsLeft;

  if (userGuess !== secretNumber && attemptsLeft === 0) {
    feedback.textContent = `😢 ¡Perdiste! El número era ${secretNumber}`;
    disableGame();
  }

  document.getElementById('userGuess').value = "";
  document.getElementById('userGuess').focus();
}

function disableGame() {
  document.getElementById('userGuess').disabled = true;
}

function resetGame() {
  document.getElementById('userGuess').value = "";
  document.getElementById('feedback').textContent = "";
  document.getElementById('guessHistory').innerHTML = "";
  startGame();
}

// Capturar Enter
window.addEventListener('DOMContentLoaded', () => {
  const levelSelect = document.getElementById('level');
  const guessInput = document.getElementById('userGuess');

  levelSelect.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      startGame();
    }
  });

  guessInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      checkGuess();
    }
  });
});
