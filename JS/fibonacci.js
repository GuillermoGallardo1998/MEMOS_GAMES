// Obtiene el input donde el usuario escribe la cantidad de números de la serie de Fibonacci que quiere generar
const input = document.getElementById('cantidad');

// Obtiene el elemento donde se va a mostrar el resultado
const resultado = document.getElementById('resultado');

// Escucha cuando el usuario presiona una tecla dentro del input
input.addEventListener('keydown', function(event) {
    // Si la tecla presionada es "Enter"
    if (event.key === 'Enter') {
        // Llama a la función que genera la serie de Fibonacci
        generarFibonacci();
    }
});

// Esta función genera la serie de Fibonacci con la cantidad que el usuario escribió
function generarFibonacci() {
    // Convierte el valor del input (que es texto) a un número entero
    const n = parseInt(input.value);

    // Si el valor no es un número o es menor o igual a 0, muestra un mensaje de error y sale
    if (isNaN(n) || n <= 0) {
        resultado.innerHTML = '<span style="color: var(--danger-color);">Por favor ingresa un número válido mayor que 0.</span>';
        return; // Termina la función aquí si el número es inválido
    }

    // Crea un arreglo vacío donde se va a guardar la serie
    const serie = [];

    // Bucle que se repite "n" veces (la cantidad de números que se quiere mostrar)
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            // El primer número de la serie es 0
            serie.push(0);
        } else if (i === 1) {
            // El segundo número de la serie es 1
            serie.push(1);
        } else {
            // A partir del tercer número, se suman los dos anteriores
            // Ejemplo: serie[2] = serie[1] + serie[0] = 1 + 0 = 1
            serie.push(serie[i - 1] + serie[i - 2]);
        }
    }

    // Muestra el resultado: los números de la serie separados por coma
    resultado.innerHTML = `Resultado: <br><strong>${serie.join(', ')}</strong>`;
}
