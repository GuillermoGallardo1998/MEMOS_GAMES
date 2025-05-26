(() => {
  // Palabras por categoría
  const words = {
    animales: [
      "elefante", "jirafa", "perro", "gato", "tigre", "hipopótamo", "leon", "rinoceronte", "cebra", "serpiente",
      "camaleon", "murcielago", "delfin", "canguro", "pinguino", "gorila", "cebra", "lobo", "zorro", "bisonte",
      "avestruz", "burro", "caballo", "cerdo", "conejo", "gallina", "iguana", "jabali", "lagarto", "mono",
      "nutria", "orangutan", "pavo", "raton", "salamandra", "tortuga", "urraca", "vaca", "yak", "zorillo",
      "armadillo", "bufalo", "camello", "dromedario", "erizo", "foca", "guepardo", "huron", "jirafa", "koala"
    ],
    hogar: [
      "televisor", "refrigerador", "sofa", "lampara", "ventilador", "microondas", "lavadora", "cortina", "espejo", "estufa",
      "alfombra", "banqueta", "candelabro", "candado", "cocina", "escalera", "estante", "frasco", "goblet", "horno",
      "jabón", "lavaplatos", "mantel", "mesa", "nevera", "olla", "parrilla", "perchero", "plancha", "puerta",
      "puerta", "quitasol", "radiador", "reloj", "secadora", "silla", "soporte", "tarima", "teclado", "toalla",
      "ventana", "vaso", "espejo", "taburete", "tendedero", "trapeador", "tijeras", "tendedero", "tapete", "termo"
    ],
    computadora: [
      "procesador", "monitor", "teclado", "mouse", "memoria", "disco", "placa", "puerto", "tarjeta", "ventilador",
      "bocina", "pantalla", "fuente", "cable", "chasis", "chip", "lector", "webcam", "router", "switch",
      "modem", "usb", "ssd", "hdd", "ram", "bios", "kernel", "driver", "software", "hardware",
      "firewall", "antivirus", "dominio", "ip", "proxy", "bit", "byte", "nube", "servidor", "backup",
      "monitor", "scanner", "tablet", "notebook", "desktop", "lapiz", "pixel", "ssd", "dongle", "codec"
    ]
  };

  const maxTries = 6;
  let selectedCategory = 'animales';
  let chosenWord = '';
  let guessedLetters = new Set();
  let wrongGuesses = 0;
  let gameOver = false;

  const categorySelect = document.getElementById('categorySelect');
  const wordDisplay = document.getElementById('wordDisplay');
  const lettersContainer = document.getElementById('lettersContainer');
  const triesLeft = document.getElementById('triesLeft');
  const statusMessage = document.getElementById('statusMessage');
  const resetBtn = document.getElementById('resetBtn');
  const body = document.body;

  // Tema automático según preferencia del sistema
  function applyThemeBasedOnSystem() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeBasedOnSystem);
  applyThemeBasedOnSystem();

  // Generar botones A-Z
  function createLetterButtons() {
    lettersContainer.innerHTML = '';
    for(let i=65; i<=90; i++) {
      const letter = String.fromCharCode(i).toLowerCase();
      const button = document.createElement('button');
      button.textContent = letter.toUpperCase();
      button.className = 'letter-btn';
      button.setAttribute('aria-label', `Letra ${letter.toUpperCase()}`);
      button.addEventListener('click', () => handleLetterClick(letter, button));
      lettersContainer.appendChild(button);
    }
  }

  function updateHangmanDrawing() {
    const parts = document.querySelectorAll('.hangman-part');
    parts.forEach((part, index) => {
      part.style.display = index < wrongGuesses ? 'block' : 'none';
    });
  }

  function updateWordDisplay() {
    let display = '';
    for (let char of chosenWord) {
      if (char === ' ') {
        display += '  ';
      } else if (guessedLetters.has(char)) {
        display += char.toUpperCase() + ' ';
      } else {
        display += '_ ';
      }
    }
    wordDisplay.textContent = display.trim();
  }

  function handleLetterClick(letter, btn) {
    if (gameOver) return;

    btn.disabled = true;
    if (chosenWord.includes(letter)) {
      guessedLetters.add(letter);
      updateWordDisplay();
      checkWin();
    } else {
      wrongGuesses++;
      updateHangmanDrawing();
      triesLeft.textContent = `Intentos restantes: ${maxTries - wrongGuesses}`;
      btn.style.backgroundColor = 'var(--danger-color)';
      btn.style.cursor = 'not-allowed';
      btn.disabled = true;
      checkLose();
    }
  }

  function checkWin() {
    const allGuessed = [...chosenWord].every(ch => ch === ' ' || guessedLetters.has(ch));
    if (allGuessed) {
      statusMessage.textContent = "¡Ganaste! 🎉";
      statusMessage.className = 'status win';
      gameOver = true;
      disableAllLetters();
    }
  }

  function checkLose() {
    if (wrongGuesses >= maxTries) {
      statusMessage.textContent = `Perdiste 😞. La palabra era: ${chosenWord.toUpperCase()}`;
      statusMessage.className = 'status lose';
      gameOver = true;
      disableAllLetters();
      revealWord();
    }
  }

  function disableAllLetters() {
    const buttons = lettersContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
  }

  function revealWord() {
    let display = '';
    for (let char of chosenWord) {
      if (char === ' ') {
        display += '  ';
      } else {
        display += char.toUpperCase() + ' ';
      }
    }
    wordDisplay.textContent = display.trim();
  }

  function resetGame() {
    guessedLetters.clear();
    wrongGuesses = 0;
    updateHangmanDrawing();
    gameOver = false;
    triesLeft.textContent = `Intentos restantes: ${maxTries}`;
    statusMessage.textContent = '';
    statusMessage.className = 'status';
    pickWord();
    updateWordDisplay();
    createLetterButtons();
  }

  function pickWord() {
    const arr = words[selectedCategory];
    chosenWord = arr[Math.floor(Math.random() * arr.length)];
  }

  categorySelect.addEventListener('change', (e) => {
    selectedCategory = e.target.value;
    resetGame();
  });

  resetBtn.addEventListener('click', resetGame);

  // Inicializar juego
  pickWord();
  createLetterButtons();
  updateWordDisplay();

})();
