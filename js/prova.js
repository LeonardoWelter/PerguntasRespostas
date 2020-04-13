// Váriavel que disponibiliza o JSON de maneira global para todos as funções,
// Risco de segurança, visto que está disponível pelo console também.
let _JSON;

// Função que recupera quais alternativas o usuário marcou e as adiciona em um Array indexado pelo nome da questão.
function recuperarRespostas() {
    let numQuestoes = Object.entries(_JSON.questoes).length;
    let marcadas = document.querySelectorAll('input[type="radio"]:checked');
    let feedback = document.getElementById('feedback');
    let respostas = [];

    for (let loopR = 0; loopR < numQuestoes; loopR++) {
        try {
            respostas[marcadas[loopR].name] = marcadas[loopR].value;
        } catch (e) {
            mostrarFeedback(respostas);
        }
    }

    feedback.innerHTML = '';
    feedback.className = '';

    return respostas;
}

function mostrarFeedback(respostas) {
    let numQuestoes = Object.entries(_JSON.questoes).length;
    let feedback = document.getElementById('feedback');
    let naoRespondidas = [];
    let stringRetorno;
    respostas = Object.keys(respostas);

    for (let i = 0; i < numQuestoes; i++) {
        let nomeQuestao = 'questao' + (i+1);

        document.getElementById(nomeQuestao).className = 'card w-100 mb-5';

        if (respostas.indexOf(nomeQuestao) === -1) {
            naoRespondidas.push(nomeQuestao);
        }
    }

    for (let j = 0; j < naoRespondidas.length; j++) {
        let cardAtual = document.getElementById(naoRespondidas[j]);

        cardAtual.className += ' border-danger';
    }

    for (let k = 0; k < naoRespondidas.length; k++) {
        let naoRespondidas2 = [];
        naoRespondidas2[k] = naoRespondidas[k][0].toUpperCase() + naoRespondidas[k].substring(1);
        naoRespondidas2[k] = naoRespondidas2[k].replace('a', 'ã').replace('o', 'o ');
        if (k === 0) {
            stringRetorno = naoRespondidas2[k] + ', ';
        } else if (k < naoRespondidas.length) {
            stringRetorno += naoRespondidas2[k] + ', ';
        }
    }

    stringRetorno = stringRetorno.slice(0, stringRetorno.length-2);
    stringRetorno += '.';

    feedback.className += ' p-4';
    feedback.innerText =
        'Alguma(s) questão(ões) não foram respondidas\n'
        + stringRetorno +
        '\nVerifique as questão(ões) e tente novamente!';
    throw new Error('Alguma(s) questão(ões) não foram respondidas');
}

// Função que altera a estilização das alternativas corretas.
function marcarCorreta(nomeInput, valor) {
    let certo = "<i class='fas fa-check fa-lg mr-2'></i>";
    let li = document.querySelectorAll("input[name='" + nomeInput + "'][value='" + valor + "']")[0].parentNode;
    let label = li.parentNode;

    removerInputs();

    label.className += ' bg-success';
    li.innerHTML = certo + li.innerHTML;
    li.className += ' bg-success text-white';
}

// Função que altera a estilização das alternativas incorretas, caso for chamada,
// ela realiza o chamado da função marcarCorreta() para marcar a alternativa correta.
function marcarIncorreta(nomeInput, valor, valorCorreta) {
    let errado = "<i class='fas fa-times fa-lg mr-3'></i>";
    let li = document.querySelectorAll("input[name='" + nomeInput + "'][value='" + valor + "']")[0].parentNode;
    let label = li.parentNode;

    label.className += ' bg-danger';
    li.innerHTML = errado + li.innerHTML;
    li.className += ' bg-danger text-white';

    marcarCorreta(nomeInput, valorCorreta);
}

// Remove os inputs das questões para melhor legibilidade.
function removerInputs() {
    let inputs = document.getElementsByTagName('input');

    // Inicia o loop no 1 para não remover o input de busca da navbar
    for (let i = 1; i < inputs.length; i++) {
        inputs[i].hidden = true;
    }
}

// Exibe o gabarito ao final da prova, remove o botão Corrigir e torna visível a tabela
// que mostra as respostas, caso a resposta de um questão seja correta, o fundo do campo da tabela
// será verde. Caso esteja incorreta, o fundo será vermelho e entre parênteses será exibida a resposta correta;
function exibirGabarito(gabarito, marcadas, totalQuestoes) {
    let letras = ['a', 'b', 'c', 'd', 'e'];
    let erros = 0;
    let acertos = 0;
    document.getElementById('btnCorrigeProva').remove();
    document.getElementById('tabelaGabarito').hidden = false;
    gabarito = Object.entries(gabarito);
    marcadas = Object.entries(marcadas);


    let qGab = document.getElementById('questoesGabarito');
    let rGab = document.getElementById('respostasGabarito');
    let eGab = document.getElementById('errosGabarito');
    let aGab = document.getElementById('acertosGabarito');
    let tdQuestao = document.createElement('td');
    let tdResposta = document.createElement('td');


    for (let numQuestoes = 0; numQuestoes < totalQuestoes; numQuestoes++) {
        tdQuestao.innerText = numQuestoes + 1;
        tdResposta.innerText = letras[marcadas[numQuestoes][1] - 1].toUpperCase();
        if (marcadas[numQuestoes][1] == gabarito[numQuestoes][1]) {
            tdResposta.className = 'bg-success';
            acertos += 1;
        } else {
            tdResposta.innerText += ' (' + letras[gabarito[numQuestoes][1] - 1].toUpperCase() + ')';
            tdResposta.className = 'bg-danger';
            erros += 1;
        }

        // Caso as provas tenham mais de 10 questões, essa condicional quebra a tabela do gabarito
        // a cada 10 questões, para uma melhor visualização
        if ((numQuestoes % 10) === 0) {
            let Q2 = document.createElement('tr');
            let R2 = document.createElement('tr');

            Q2.className = 'text-center';
            Q2.id = 'questoesGabarito' + (numQuestoes / 10);
            R2.className = 'text-center';
            R2.id = 'respostasGabarito' + (numQuestoes / 10);

            document.getElementById('corpoGabarito').appendChild(Q2);
            document.getElementById('corpoGabarito').appendChild(R2);

            qGab = document.getElementById('questoesGabarito' + (numQuestoes / 10));
            rGab = document.getElementById('respostasGabarito' + (numQuestoes / 10));
        }

        qGab.innerHTML += tdQuestao.outerHTML;
        rGab.innerHTML += tdResposta.outerHTML;
        aGab.innerHTML = acertos;
        eGab.innerHTML = erros;
    }
}

// Realiza a correção da prova, utiliza os dados do JSON para obter o gabarito
// e a função recuperarRespostas() para obter as alternativas marcadas pelo usuário,
// então, inicia um Loop comparar as respostas, chamando as funções de estilização
// das alternativas conforme o resultado.
function corrigirProva() {
    let json = Object.entries(_JSON.questoes);
    let respostas = recuperarRespostas();
    let gabarito = [];
    let questaoAtual = Object.keys(respostas);
    let totalQuestoes = json.length;

    for (let questoes = 0; questoes < totalQuestoes; questoes++) {
        if (json[questoes][1].correta == respostas[json[questoes][0]]) {
            console.log(json[questoes][0] + ' correta');
            marcarCorreta(questaoAtual[questoes], '3');
        } else {
            console.log(json[questoes][0] + ' incorreta');
            marcarIncorreta(questaoAtual[questoes], respostas[json[questoes][0]], json[questoes][1].correta);
        }
        gabarito[json[questoes][0]] = json[questoes][1].correta;
    }

    exibirGabarito(gabarito, respostas, totalQuestoes);
}

// Função que recebe os dados do JSON e transforma-os em elementos HTML para a exibição
// ao usuário
function gerarProva(json) {
    let prova = document.getElementById('prova'); // Section onde será inserida a prova
    let letras = ['a', 'b', 'c', 'd', 'e']; // Array para atribuir as alternativas uma letra
    let numeroAlternativas = Object.keys(json.questoes.questao1.alternativas).length; // Verifica a quantidade de alternativas em uma questao
    let questoes = Object.entries(json.questoes); // Utilizado para recuperar o conteúdo das questões dentro dos Loops

    document.title = json.nome + ' - Perguntas e Respostas'; // Altera o título do site com base na prova selecionada

    prova.innerHTML = ''; // Apaga tudo da section

    // Apresenta o nome da prova com base no JSON recebido
    let h3 = document.createElement('h3');
    h3.id = 'nomeProva';
    h3.className = 'text-center mt-3 mb-5';
    h3.innerHTML = json.nome + " - " + json.data;
    // Cria o botão responsável por chamar a função de correção da prova
    let button = document.createElement('button');
    button.id = 'btnCorrigeProva';
    button.className = 'btn btn-primary btn-block mb-5';
    button.innerHTML = 'Corrigir';
    button.addEventListener('click', corrigirProva);
    let pFeedback = document.createElement('p');
    pFeedback.id = 'feedback';
    pFeedback.className = 'text-center text-white d-block mb-3 bg-danger';

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
        div1.id = questoes[j][0];
        div2.className = 'card-body';

        h5.className = 'card-title';
        h5.innerHTML = 'Questão ' + (j + 1);

        p.className = 'card-text text-justify';
        p.innerHTML = questoes[j][1].texto;

        ul.className = 'list-group list-group-flush';

        // Loop for que cria os elementos das alternativas
        for (let i = 0; i < numeroAlternativas; i++) {

            let values = Object.keys(questoes[j][1].alternativas);

            label.id = 'lblQ' + (j + 1) + 'A' + (i + 1);
            label.htmlFor = 'q' + (j + 1) + 'a' + (i + 1);
            if (i == 4) {
                label.className = 'semBorda';
            }
            li.id = 'liQ' + (j + 1) + 'A' + (i + 1);
            li.className = 'list-group-item text-justify';
            input.id = 'q' + (j + 1) + 'a' + (i + 1);
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

    prova.appendChild(pFeedback);
    // Insere o botão na página
    prova.appendChild(button);
}
