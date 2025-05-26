function calcularFactorial() {
  const input = document.getElementById("numero");
  const proceso = document.getElementById("proceso");
  const resultado = document.getElementById("resultado");

  const num = parseInt(input.value);

  if (isNaN(num) || num < 0) {
    proceso.textContent = "";
    resultado.textContent = "Por favor, ingresa un número entero mayor o igual a 0.";
    return;
  }

  if (num === 0 || num === 1) {
    proceso.textContent = `${num}! = 1`;
    resultado.textContent = "Resultado: 1";
    return;
  }

  let res = 1;
  let pasos = `${num}! = `;

  for (let i = num; i >= 1; i--) {
    res *= i;
    pasos += (i !== 1) ? `${i} × ` : `${i}`;
  }

  proceso.textContent = pasos;
  resultado.textContent = `Resultado: ${res}`;
}
