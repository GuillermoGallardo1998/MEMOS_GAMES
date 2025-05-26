function contarVocales() {
    
    const texto = document.getElementById("texto").value;
    const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    let total = 0;

    for (let letra of texto.toLowerCase()) {
        if (conteo.hasOwnProperty(letra)) {
            conteo[letra]++;
            total++; 
        }
    }
    
    let resultadoHTML = `<p>Total de vocales: <strong>${total}</strong></p>`;

    for (let vocal in conteo) {
        resultadoHTML += `<p>Vocal '${vocal}': ${conteo[vocal]} veces</p>`;
    }

    document.getElementById("resultado").innerHTML = resultadoHTML;

    const lineas = texto.split('\n');

    let textoResaltado = "";

    for (let linea of lineas) {
        let lineaResaltada = "";

        for (let letra of linea) {
            if ("aeiouAEIOU".includes(letra)) {
                lineaResaltada += `<span class="vocal-roja">${letra}</span>`;
            } else {
                lineaResaltada += letra;
            }
        }

        textoResaltado += `<p>${lineaResaltada}</p>`;
    }

    document.getElementById("textoResaltado").innerHTML = textoResaltado;
}

function reiniciar() {

    document.getElementById("texto").value = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("textoResaltado").innerHTML = "";

    const textarea = document.getElementById("texto");
    textarea.style.height = "auto";
}

const textarea = document.getElementById("texto");

textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); 
        contarVocales();
    }
});