document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("limitInput");
  const button = document.getElementById("playBtn");
  const results = document.getElementById("results");

  function jugarFizzBuzz() {
    const limit = parseInt(input.value);
    results.innerHTML = "";

    if (isNaN(limit) || limit < 1) {
      results.textContent = "Por favor, ingresa un número válido mayor que 0.";
      return;
    }

    for (let i = 1; i <= limit; i++) {
      const item = document.createElement("div");
      item.classList.add("fizzbuzz-item");

      if (i % 15 === 0) {
        item.textContent = "FizzBuzz";
        item.classList.add("fizz", "buzz");
      } else if (i % 3 === 0) {
        item.textContent = "Fizz";
        item.classList.add("fizz");
      } else if (i % 5 === 0) {
        item.textContent = "Buzz";
        item.classList.add("buzz");
      } else {
        item.textContent = i;
      }

      results.appendChild(item);
    }
  }

  button.addEventListener("click", jugarFizzBuzz);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      jugarFizzBuzz();
    }
  });
});
