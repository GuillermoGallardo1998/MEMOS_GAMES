const input = document.getElementById('cantidad');
const resultado = document.getElementById('resultado');

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        generarFibonacci();
    }
});

function generarFibonacci() {
    const n = parseInt(input.value);
    if (isNaN(n) || n <= 0) {
        resultado.innerHTML = '<span style="color: var(--danger-color);">Por favor ingresa un número válido mayor que 0.</span>';
        return;
    }

    const serie = [];
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            serie.push(0);
        } else if (i === 1) {
            serie.push(1);
        } else {
            serie.push(serie[i - 1] + serie[i - 2]);
        }
    }

    resultado.innerHTML = `Resultado: <br><strong>${serie.join(', ')}</strong>`;
}
