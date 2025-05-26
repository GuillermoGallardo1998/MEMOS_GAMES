// Función que limpia la cadena (quita espacios, signos, mayúsculas)
function cleanString(str) {
  return str.toLowerCase().replace(/[\W_]/g, '');
}

// Función para invertir una cadena
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Manejo del formulario
document.getElementById('palindromeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const input = document.getElementById('inputText').value.trim();
  if (!input) return;

  const cleaned = cleanString(input);
  const reversed = reverseString(cleaned);

  const isPalindrome = cleaned === reversed;

  const resultMessage = document.getElementById('resultMessage');
  if (isPalindrome) {
    resultMessage.textContent = '✅ Es un palíndromo';
    resultMessage.style.color = 'var(--primary-color)';
  } else {
    resultMessage.textContent = '❌ No es un palíndromo';
    resultMessage.style.color = 'var(--danger-color)';
  }

  // Mostrar la tarjeta con comparación
  const cardContainer = document.getElementById('cardContainer');
  const frontText = document.getElementById('frontText');
  const backText = document.getElementById('backText');

  frontText.textContent = input;
  backText.textContent = reverseString(input);

  cardContainer.style.display = 'block';
});
