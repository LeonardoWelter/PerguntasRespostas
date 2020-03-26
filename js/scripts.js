function recuperarRespostas() {
    let numQuestoes = document.querySelectorAll('input[type="radio"]').length / 5;
    let respostas = [];

    let i = 0;

    while (i < numQuestoes) {
        respostas[document.querySelectorAll('input[type="radio"]:checked')[i].name] = document.querySelectorAll('input[type="radio"]:checked')[i].value;
        i++
    }

    return respostas;
}


function recuperarRespostas2() {
    let numQuestoes = 1; //document.querySelectorAll('input[type="radio"]').length / 5;
    let respostas = [];

    let i = 0;

    while (i < numQuestoes) {
        respostas.push({ [document.querySelectorAll('input[type="radio"]:checked')[i].name] : document.querySelectorAll('input[type="radio"]:checked')[i].value });
        i++
    }

    return JSON.stringify(respostas);
}
