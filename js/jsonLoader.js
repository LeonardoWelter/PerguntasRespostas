// Função que recupera o arquivo JSON que contem a prova utilizando AJAX
function loadJSON(json, callback) {

    let jsonProva = new XMLHttpRequest();
    jsonProva.overrideMimeType("application/json");
    jsonProva.open('GET', 'Provas/'+json, true); // Recupera o arquivo JSON
    jsonProva.onreadystatechange = function () {
        if (jsonProva.readyState == 4 && jsonProva.status == "200") {
            callback(jsonProva.responseText);
        }
    };
    jsonProva.send(null);
}

// Recupera os parâmetros GET enviados
function recuperarParams(parametro) {
    let resultado = null,
        temp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            temp = item.split("=");
            if (temp[0] === parametro) resultado = decodeURIComponent(temp[1]);
        });
    return resultado;
}
