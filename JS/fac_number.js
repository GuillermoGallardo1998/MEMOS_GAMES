// Esta función se encarga de calcular el factorial de un número ingresado por el usuario
function calcularFactorial() {

  // Obtiene el elemento de entrada donde el usuario escribe el número (input con id="numero")
  const input = document.getElementById("numero");

  // Obtiene el elemento donde se mostrará el proceso paso a paso del cálculo (id="proceso")
  const proceso = document.getElementById("proceso");

  // Obtiene el elemento donde se mostrará el resultado final (id="resultado")
  const resultado = document.getElementById("resultado");

  // Convierte el valor ingresado (que es texto) a un número entero
  const num = parseInt(input.value);

  // Si el usuario no escribió un número válido o si es negativo, se muestra un mensaje de error
  if (isNaN(num) || num < 0) {
    proceso.textContent = ""; // Limpia el texto del proceso
    resultado.textContent = "Por favor, ingresa un número entero mayor o igual a 0.";
    return; // Sale de la función, no sigue calculando
  }

  // Si el número es 0 o 1, el resultado siempre es 1 (por definición de factorial)
  if (num === 0 || num === 1) {
    proceso.textContent = `${num}! = 1`; // Muestra el proceso como "0! = 1" o "1! = 1"
    resultado.textContent = "Resultado: 1"; // Muestra el resultado final
    return; // Sale de la función, ya no es necesario calcular más
  }

  // Si el número es mayor que 1, empieza el cálculo del factorial
  let res = 1; // Aquí se irá acumulando el resultado
  let pasos = `${num}! = `; // Esta variable guarda el texto del proceso (ej: "5! = 5 × 4 × 3 × 2 × 1")

  // Este bucle multiplica desde el número hacia abajo hasta 1 (por ejemplo: 5 × 4 × 3 × 2 × 1)
  for (let i = num; i >= 1; i--) {
    res *= i; // Multiplica el resultado por el valor actual de i
    pasos += (i !== 1) ? `${i} × ` : `${i}`; // Agrega el número al texto, con "×" si no es el último
  }

  // Muestra el proceso completo (ej: "5! = 5 × 4 × 3 × 2 × 1")
  proceso.textContent = pasos;

  // Muestra el resultado final del factorial (ej: "Resultado: 120")
  resultado.textContent = `Resultado: ${res}`;
}