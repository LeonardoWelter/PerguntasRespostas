function recuperarRespostas() {
    let numQuestoes = document.querySelectorAll('input[type="radio"]').length / 5;
    let marcadas = document.querySelectorAll('input[type="radio"]:checked');
    let respostas = [];

    let i = 0;

    while (i < numQuestoes) {
        respostas[marcadas[i].name] = marcadas[i].value;
        i++
    }

    return respostas;
}


function recuperarRespostas2() {
    let numQuestoes = document.querySelectorAll('input[type="radio"]').length / 4;
    let respostas = [];

    let i = 0;

    while (i < numQuestoes) {
        respostas.push({ [document.querySelectorAll('input[type="radio"]:checked')[i].name] : document.querySelectorAll('input[type="radio"]:checked')[i].value });
        i++
    }

    return JSON.stringify(respostas);
}

function marcarCorreta(elemento) {
    let certo = "<i class='fas fa-check fa-lg mr-1'></i> &nbsp;";
    let li = document.getElementById(elemento).parentNode;
    let label = li.parentNode;

    removerInputs();

    label.className += ' bg-success';
    li.innerHTML = certo + li.innerHTML;
    li.className += ' bg-success text-white';
}

function marcarIncorreta(elemento, correta) {
    let errado = "<i class='fas fa-times fa-lg mr-3'></i>";
    let li = document.getElementById(elemento).parentNode;
    let label = li.parentNode;

    label.className += ' bg-danger';
    li.innerHTML = errado + li.innerHTML;
    li.className += ' bg-danger text-white';

    marcarCorreta(correta);
}

function removerInputs() {
    let inputs = document.getElementsByTagName('input');

    for (let i = 1; i < inputs.length; i++) {
        inputs[i].hidden = true;
    }
}

function corrigirProva(/*json, respostas*/) {
    // let json = {"questao1": {"correta": 3}};
    // let json2 = Object.entries(json);
    // let respostas = [];
    // respostas['questao1'] = '2';

    if (json2[0][1].correta == respostas[json2[0][0]]) {
        console.log(json2[0][0] + ' correta');
    } else {
        console.log(json2[0][0] + ' incorreta');
    }
}

function gerarProva(json) {
    let prova = document.getElementById('prova'); // Section onde será inserida a prova
    let letras = ['a', 'b', 'c', 'd', 'e']; // Array para atribuir as alternativas uma letra
    let numeroAlternativas = Object.keys(json.questoes.questao1.alternativas).length; // Verifica a quantidade de alternativas em uma questao
    let questoes = Object.entries(json.questoes); // Utilizado para recuperar o conteúdo das questões dentro dos Loops

    document.title = json.nome + ' - Perguntas e Respostas';

    prova.innerHTML = ''; // Apaga tudo da section

    // Apresenta o nome da prova com base no JSON recebido
    let h3 = document.createElement('h3');
    h3.id = 'nomeProva';
    h3.className = 'text-center mt-3 mb-5';
    h3.innerHTML = json.nome + " - " + json.data;
    let button = document.createElement('button');
    button.id = 'btnCorrigeProva';
    button.className = 'btn btn-primary btn-block';
    button.innerHTML = 'Corrigir';
    button.addEventListener('click', corrigirProva);

    prova.appendChild(h3);

    // Cria a estrutura onde são apresentadas as questões
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let h5 = document.createElement('h5');
    let p = document.createElement('p');
    let ul = document.createElement('ul');
    let label = document.createElement('label');
    let li = document.createElement('li');
    let input = document.createElement('input');

    // Loop for que cria os elementos das questões
    for (let j = 0; j < questoes.length; j++) {

        div1.className = 'card w-100 mb-5';
        div2.className = 'card-body';

        h5.className = 'card-title';
        h5.innerHTML = 'Questão ' + (j+1);

        p.className = 'card-text text-justify';
        p.innerHTML = questoes[j][1].texto;

        ul.className = 'list-group list-group-flush';

        // Loop for que cria os elementos das alternativas
        for (let i = 0; i < numeroAlternativas; i++) {

            let values = Object.keys(questoes[j][1].alternativas);

            label.id = 'lblQ' + (j+1) + 'A' + i;
            label.htmlFor = 'q' + (j+1) + 'a' + i;
            if (i == 4) {
                label.className = 'semBorda';
            }
            li.id = 'liQ' + (j+1) + 'A' + i;
            li.className = 'list-group-item text-justify';
            input.id = 'q' + (j+1) + 'a' + i;
            input.value = values[i];
            input.name = questoes[j][0];
            input.type = 'radio';
            input.className = 'mr-2';

            li.innerHTML = input.outerHTML + letras[i].toUpperCase() + ') ' + questoes[j][1].alternativas[i + 1];
            label.innerHTML = li.outerHTML;
            ul.innerHTML += label.outerHTML;
        }

        // Insere os elementos na página
        div2.appendChild(h5);
        div2.appendChild(p);
        div1.appendChild(div2);
        div1.appendChild(ul);
        prova.innerHTML += div1.outerHTML;
        ul.innerHTML = '';
    }

    prova.appendChild(button);
}
