// Función que limpia la cadena: convierte a minúsculas y elimina espacios y signos
function cleanString(str) {
  // toLowerCase convierte todo a minúsculas
  // replace(/[\W_]/g, '') elimina todo lo que no sea letra o número (espacios, signos, guiones bajos)
  return str.toLowerCase().replace(/[\W_]/g, '');
}

// Función para invertir una cadena de texto
function reverseString(str) {
  // split('') separa la cadena en un arreglo de letras
  // reverse() invierte el orden del arreglo
  // join('') vuelve a juntar las letras en una cadena
  return str.split('').reverse().join('');
}

// Espera a que se envíe el formulario con id "palindromeForm"
document.getElementById('palindromeForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que la página se recargue al enviar el formulario

  // Obtiene el texto ingresado en el input con id "inputText" y elimina espacios al inicio y final
  const input = document.getElementById('inputText').value.trim();
  if (!input) return; // Si el input está vacío, no hace nada

  // Limpia el texto para solo tener letras y números en minúsculas
  const cleaned = cleanString(input);

  // Invierte la cadena limpia
  const reversed = reverseString(cleaned);

  // Compara si la cadena limpia es igual a su inversa (palíndromo)
  const isPalindrome = cleaned === reversed;

  // Elemento donde se mostrará el resultado
  const resultMessage = document.getElementById('resultMessage');

  // Muestra un mensaje dependiendo si es o no palíndromo
  if (isPalindrome) {
    resultMessage.textContent = '✅ Es un palíndromo';
    resultMessage.style.color = 'var(--primary-color)'; // Color para mensaje positivo
  } else {
    resultMessage.textContent = '❌ No es un palíndromo';
    resultMessage.style.color = 'var(--danger-color)'; // Color para mensaje negativo
  }

  // Muestra una "tarjeta" que enseña el texto original y su reverso para comparación visual
  const cardContainer = document.getElementById('cardContainer');
  const frontText = document.getElementById('frontText');
  const backText = document.getElementById('backText');

  frontText.textContent = input; // Texto original
  backText.textContent = reverseString(input); // Texto invertido (sin limpiar)

  cardContainer.style.display = 'block'; // Hace visible la tarjeta
});
