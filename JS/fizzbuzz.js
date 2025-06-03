// Espera a que todo el contenido HTML esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {

  // Obtiene el input donde el usuario escribe el límite para jugar FizzBuzz
  const input = document.getElementById("limitInput");

  // Obtiene el botón que se presiona para empezar el juego
  const button = document.getElementById("playBtn");

  // Obtiene el contenedor donde se mostrarán los resultados
  const results = document.getElementById("results");

  // Función que ejecuta el juego FizzBuzz hasta el número límite dado
  function jugarFizzBuzz() {
    // Convierte el valor del input a un número entero
    const limit = parseInt(input.value);

    // Limpia los resultados anteriores para empezar de nuevo
    results.innerHTML = "";

    // Si el número no es válido o es menor que 1, muestra un mensaje de error y termina
    if (isNaN(limit) || limit < 1) {
      results.textContent = "Por favor, ingresa un número válido mayor que 0.";
      return;
    }

    // Recorre desde 1 hasta el número límite
    for (let i = 1; i <= limit; i++) {
      // Crea un nuevo div para mostrar cada resultado
      const item = document.createElement("div");

      // Le agrega una clase CSS para poder estilizarlo
      item.classList.add("fizzbuzz-item");

      // Si el número es múltiplo de 15 (3 y 5 a la vez), escribe "FizzBuzz" y agrega clases
      if (i % 15 === 0) {
        item.textContent = "FizzBuzz";
        item.classList.add("fizz", "buzz");
      } 
      // Si el número es múltiplo de 3, escribe "Fizz" y agrega clase fizz
      else if (i % 3 === 0) {
        item.textContent = "Fizz";
        item.classList.add("fizz");
      } 
      // Si el número es múltiplo de 5, escribe "Buzz" y agrega clase buzz
      else if (i % 5 === 0) {
        item.textContent = "Buzz";
        item.classList.add("buzz");
      } 
      // Si no cumple ninguna condición, muestra el número normal
      else {
        item.textContent = i;
      }

      // Agrega el div creado con el resultado al contenedor de resultados
      results.appendChild(item);
    }
  }

  // Agrega un evento para que cuando el usuario haga click en el botón se ejecute jugarFizzBuzz
  button.addEventListener("click", jugarFizzBuzz);

  // También permite que al presionar Enter en el input se ejecute jugarFizzBuzz
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      jugarFizzBuzz();
    }
  });
});
