// Função responsável por recuperar o arquivo JSON que contém a prova, por meio do AJAX,
// Utiliza Promise para facilitar a manipulação dos dados;
function carregarJSON(json) {
    return new Promise(function (resolve, reject) {
        let jsonProva = new XMLHttpRequest();
        jsonProva.overrideMimeType("application/json");
        jsonProva.onload = function () {
            resolve(jsonProva.responseText);
        };
        jsonProva.onerror = function () {
            reject(Error('Falha no AJAX'));
        };
        jsonProva.open('GET', 'Provas/' + json, true); // Recupera o arquivo JSON
        jsonProva.send();
    });
}

// Recupera os parâmetros GET enviados ao clicar em um atalho para as provas
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

// Recebe um ID de uma prova e procura a mesma,
// Ao encontrar, retorna o nome do arquivo para ser usado na geração das provas
function buscaParams(parametro) {
    return new Promise(function (resolve, reject) {
        let entriesJSON;
        carregarJSON('provas.json').then(function (result) {
            let json = JSON.parse(result);
            entriesJSON = Object.entries(json);

            for (let i = 0; i < entriesJSON.length; i++) {
                if (entriesJSON[i].indexOf(parametro) > -1) {
                    resolve(entriesJSON[i][1].src);
                    break;
                }
            }
        });
    })
}
