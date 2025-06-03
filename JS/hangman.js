(() => {
  // Objeto con palabras organizadas en categorías
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

  const maxTries = 6; // Número máximo de intentos fallidos permitidos
  let selectedCategory = 'animales'; // Categoría inicial seleccionada
  let chosenWord = ''; // Palabra actual a adivinar
  let guessedLetters = new Set(); // Letras que el jugador ha adivinado
  let wrongGuesses = 0; // Número de intentos fallidos
  let gameOver = false; // Estado del juego, si terminó o no

  // Referencias a elementos del DOM (HTML)
  const categorySelect = document.getElementById('categorySelect');
  const wordDisplay = document.getElementById('wordDisplay');
  const lettersContainer = document.getElementById('lettersContainer');
  const triesLeft = document.getElementById('triesLeft');
  const statusMessage = document.getElementById('statusMessage');
  const resetBtn = document.getElementById('resetBtn');
  const body = document.body;

  // Función que aplica tema oscuro o claro basado en la preferencia del sistema
  function applyThemeBasedOnSystem() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      body.classList.add('dark'); // Añade clase 'dark' para tema oscuro
    } else {
      body.classList.remove('dark'); // Remueve clase para tema claro
    }
  }

  // Escucha cambios en la preferencia de tema y aplica el tema automáticamente
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeBasedOnSystem);
  applyThemeBasedOnSystem(); // Aplicar tema al cargar

  // Crear botones para las letras A-Z para que el jugador pueda hacer clic
  function createLetterButtons() {
    lettersContainer.innerHTML = ''; // Limpiar contenedor de letras

    // Crear botón para cada letra desde A (65) hasta Z (90) en ASCII
    for(let i=65; i<=90; i++) {
      const letter = String.fromCharCode(i).toLowerCase(); // Obtener letra en minúscula
      const button = document.createElement('button'); // Crear botón
      button.textContent = letter.toUpperCase(); // Mostrar letra en mayúscula en el botón
      button.className = 'letter-btn'; // Añadir clase CSS
      button.setAttribute('aria-label', `Letra ${letter.toUpperCase()}`); // Para accesibilidad
      // Cuando se hace clic en el botón, manejar la letra seleccionada
      button.addEventListener('click', () => handleLetterClick(letter, button));
      lettersContainer.appendChild(button); // Añadir botón al contenedor
    }
  }

  // Actualiza el dibujo del ahorcado según los intentos fallidos
  function updateHangmanDrawing() {
    const parts = document.querySelectorAll('.hangman-part'); // Obtener todas las partes del dibujo
    parts.forEach((part, index) => {
      // Mostrar las partes correspondientes a la cantidad de errores y ocultar las demás
      part.style.display = index < wrongGuesses ? 'block' : 'none';
    });
  }

  // Mostrar la palabra en pantalla con letras adivinadas y guiones bajos para las no adivinadas
  function updateWordDisplay() {
    let display = '';
    for (let char of chosenWord) {
      if (char === ' ') {
        display += '  '; // Espacio para separar palabras si hay espacios en la palabra
      } else if (guessedLetters.has(char)) {
        display += char.toUpperCase() + ' '; // Mostrar letra adivinada en mayúscula
      } else {
        display += '_ '; // Mostrar guion bajo para letra no adivinada
      }
    }
    wordDisplay.textContent = display.trim(); // Mostrar resultado en el elemento HTML
  }

  // Maneja cuando el jugador hace clic en una letra
  function handleLetterClick(letter, btn) {
    if (gameOver) return; // Si el juego terminó, no hacer nada

    btn.disabled = true; // Deshabilitar el botón para que no se pueda volver a usar
    if (chosenWord.includes(letter)) { // Si la letra está en la palabra
      guessedLetters.add(letter); // Añadir letra a las letras adivinadas
      updateWordDisplay(); // Actualizar la palabra mostrada
      checkWin(); // Revisar si el jugador ganó
    } else { // Si la letra no está en la palabra
      wrongGuesses++; // Aumentar contador de errores
      updateHangmanDrawing(); // Actualizar dibujo del ahorcado
      triesLeft.textContent = `Intentos restantes: ${maxTries - wrongGuesses}`; // Mostrar intentos restantes
      btn.style.backgroundColor = 'var(--danger-color)'; // Cambiar color del botón para indicar error
      btn.style.cursor = 'not-allowed'; // Cambiar cursor para indicar que no se puede usar
      btn.disabled = true; // Asegurar que esté deshabilitado
      checkLose(); // Revisar si el jugador perdió
    }
  }

  // Revisa si el jugador ganó (adivinó toda la palabra)
  function checkWin() {
    // Verifica que todas las letras (excepto espacios) estén en el conjunto de letras adivinadas
    const allGuessed = [...chosenWord].every(ch => ch === ' ' || guessedLetters.has(ch));
    if (allGuessed) {
      statusMessage.textContent = "¡Ganaste! 🎉"; // Mensaje de victoria
      statusMessage.className = 'status win'; // Cambiar estilo a "ganar"
      gameOver = true; // Cambiar estado del juego
      disableAllLetters(); // Deshabilitar todas las letras para que no sigan jugando
    }
  }

  // Revisa si el jugador perdió (se acabaron los intentos)
  function checkLose() {
    if (wrongGuesses >= maxTries) {
      statusMessage.textContent = `Perdiste 😞. La palabra era: ${chosenWord.toUpperCase()}`; // Mostrar mensaje de pérdida y palabra correcta
      statusMessage.className = 'status lose'; // Cambiar estilo a "perder"
      gameOver = true; // Cambiar estado del juego
      disableAllLetters(); // Deshabilitar todas las letras
      revealWord(); // Mostrar la palabra completa en pantalla
    }
  }

  // Deshabilita todos los botones de letras (cuando termina el juego)
  function disableAllLetters() {
    const buttons = lettersContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
  }

  // Muestra la palabra completa, revelando todas las letras
  function revealWord() {
    let display = '';
    for (let char of chosenWord) {
      if (char === ' ') {
        display += '  '; // Espacios se mantienen
      } else {
        display += char.toUpperCase() + ' '; // Mostrar cada letra en mayúscula
      }
    }
    wordDisplay.textContent = display.trim(); // Actualizar visualización
  }

  // Reinicia el juego para empezar uno nuevo
  function resetGame() {
    guessedLetters.clear(); // Limpiar letras adivinadas
    wrongGuesses = 0; // Resetear errores
    updateHangmanDrawing(); // Actualizar dibujo (ocultarlo)
    gameOver = false; // Cambiar estado para que el juego siga activo
    triesLeft.textContent = `Intentos restantes: ${maxTries}`; // Resetear contador de intentos
    statusMessage.textContent = ''; // Limpiar mensajes
    statusMessage.className = 'status'; // Resetear clases CSS
    pickWord(); // Escoger nueva palabra aleatoria
    updateWordDisplay(); // Mostrar palabra con guiones
    createLetterButtons(); // Crear botones de letras nuevos
  }

  // Escoge una palabra aleatoria dentro de la categoría seleccionada
  function pickWord() {
    const arr = words[selectedCategory]; // Obtener array de palabras de la categoría
    chosenWord = arr[Math.floor(Math.random() * arr.length)]; // Escoger palabra aleatoria
  }

  // Detectar cuando se cambia la categoría, reiniciar el juego con nueva palabra
  categorySelect.addEventListener('change', (e) => {
    selectedCategory = e.target.value;
    resetGame();
  });

  // Botón para reiniciar el juego manualmente
  resetBtn.addEventListener('click', resetGame);

  // Al iniciar, escoger palabra, crear botones y mostrar estado inicial
  pickWord();
  createLetterButtons();
  updateWordDisplay();

})();
