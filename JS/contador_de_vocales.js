// Esta función se ejecuta cuando el usuario quiere contar las vocales
function contarVocales() {

    // Obtiene el texto escrito por el usuario en el área de texto con id="texto"
    const texto = document.getElementById("texto").value;

    // Crea un objeto para contar cuántas veces aparece cada vocal
    const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };

    // Guarda el número total de vocales encontradas
    let total = 0;

    // Recorre cada letra del texto (ya convertido a minúsculas)
    for (let letra of texto.toLowerCase()) {
        // Verifica si la letra es una vocal (está dentro del objeto conteo)
        if (conteo.hasOwnProperty(letra)) {
            // Suma 1 al contador de esa vocal
            conteo[letra]++;
            // Suma 1 al total general de vocales
            total++; 
        }
    }

    // Crea una parte del texto HTML con el total de vocales encontradas
    let resultadoHTML = `<p>Total de vocales: <strong>${total}</strong></p>`;

    // Recorre cada vocal y agrega su cantidad al HTML
    for (let vocal in conteo) {
        resultadoHTML += `<p>Vocal '${vocal}': ${conteo[vocal]} veces</p>`;
    }

    // Muestra el HTML del resultado en el elemento con id="resultado"
    document.getElementById("resultado").innerHTML = resultadoHTML;

    // Divide el texto por líneas (cada Enter es una línea)
    const lineas = texto.split('\n');

    // Guarda el nuevo texto con vocales resaltadas
    let textoResaltado = "";

    // Recorre cada línea del texto
    for (let linea of lineas) {
        let lineaResaltada = "";

        // Recorre cada letra de la línea
        for (let letra of linea) {
            // Si la letra es una vocal (mayúscula o minúscula)
            if ("aeiouAEIOU".includes(letra)) {
                // Envuelve la vocal con un <span> que la pinta de rojo (clase vocal-roja)
                lineaResaltada += `<span class="vocal-roja">${letra}</span>`;
            } else {
                // Si no es vocal, se agrega normalmente
                lineaResaltada += letra;
            }
        }

        // Agrega la línea completa resaltada al texto final
        textoResaltado += `<p>${lineaResaltada}</p>`;
    }

    // Muestra el texto con vocales resaltadas en el elemento con id="textoResaltado"
    document.getElementById("textoResaltado").innerHTML = textoResaltado;
}

// Esta función borra el contenido y reinicia todo
function reiniciar() {

    // Limpia el texto del área de texto
    document.getElementById("texto").value = "";

    // Borra los resultados y el texto resaltado
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("textoResaltado").innerHTML = "";

    // Reinicia el alto del área de texto
    const textarea = document.getElementById("texto");
    textarea.style.height = "auto";
}

// Selecciona el área de texto y lo guarda en una variable
const textarea = document.getElementById("texto");

// Este evento se activa cada vez que el usuario escribe algo
textarea.addEventListener("input", function () {
    // Ajusta automáticamente la altura del área de texto según su contenido
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

// Este evento se activa cuando el usuario presiona una tecla
textarea.addEventListener("keydown", function (event) {
    // Si el usuario presiona Enter (pero no Shift + Enter)
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Evita que haga salto de línea
        contarVocales(); // Llama a la función para contar vocales
    }
});