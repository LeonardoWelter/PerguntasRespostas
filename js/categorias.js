// Função responsável por gerar dinamicamente os cards que mostram as informações e
// redirecionam para as provas da aplicação.
// Recebe um parâmetro (paramURL) que define qual categoria está selecionada para
// gerar somente as provas daquela categoria
function gerarListaProvas(json, paramURL = 'tudo', categorias) {
    let listaProvas = document.getElementById('listaProvas');
    categorias = Object.entries(categorias);
    let arrayCategoria = categorias[0][1].split(',');
    paramURL = paramURL[0].toUpperCase() + paramURL.substring(1);

    let provas = Object.entries(json);

    let a = document.createElement('a');
    a.className = 'list-group-item list-group-item-action';
    let div = document.createElement('div');
    div.className = 'd-flex w-100 justify-content-between';
    let h5 = document.createElement('h5');
    h5.className = 'mb-1';
    let small1 = document.createElement('small');
    let p = document.createElement('p');
    p.className = 'mb-1';
    let small2 = document.createElement('small');

    // Loop que itera sobre o array de provas produzido utilizando JSON provas.json
    for (let i = 0; i < provas.length; i++) {
        // Se a categoria for diferente de 'Tudo' ocorre um Loop para encontrar
        // quais provas estão presentes nessa categoria;
        if (paramURL != 'Tudo') {
            for (let j = 0; j < categorias.length; j++) {
                if (categorias[j].indexOf(paramURL) === 0) {
                    arrayCategoria = categorias[j][1].split(',');
                    break;
                }
            }
        }

        // Utilizando o array da categoria selecionada, ocorre a filtragem para
        // verificar se a prova que está atualmente no loop é da categoria selecionada.
        // Caso seja ela é renderizada.
        if (arrayCategoria.indexOf(provas[i][0]) >= 0 || paramURL === 'Tudo') {

            a.href = 'prova.html?prova=' + provas[i][0];
            h5.innerHTML = provas[i][1].nome;
            small1.innerHTML = provas[i][1].data;
            p.innerHTML = provas[i][1].descricao;
            small2.innerHTML = "Simulado e Gabarito disponíveis";

            div.appendChild(h5);
            div.appendChild(small1);
            a.appendChild(div);
            a.appendChild(p);
            a.appendChild(small2);

            listaProvas.innerHTML += a.outerHTML;
        }
    }
}

// Gera dinamicamente o menu lateral das categorias com base no JSON
function gerarCategorias(categorias) {
    let entries = Object.entries(categorias);

    let ul = document.getElementById('listaCategorias');
    let a = document.createElement('a');
    a.className = 'text-decoration-none list-group-item';
    let li = document.createElement('li');
    li.className = 'd-flex justify-content-between align-items-center';
    let span = document.createElement('span');
    span.className = 'badge badge-primary badge-pill';

    // Loop que itera sobre o array produzido utilizando o JSON categorias.json;
    for (let i = 0; i < entries.length;i++) {
        let nomeCategoria = entries[i][0];
        let contentCategoria = entries[i][1];

        a.className = 'text-decoration-none list-group-item';
        li.innerText = nomeCategoria;
        span.innerText = contentCategoria.split(',').length;

        li.innerHTML += span.outerHTML;

        // Verifica se a categoria no Loop é a atualmente selecionada para destacá-la.
        if (nomeCategoria.toLowerCase() === recuperarParams('categoria')) {
            a.className += ' active';
        }

        a.href = 'categorias.html?categoria=' + nomeCategoria.toLowerCase();
        a.appendChild(li);
        ul.innerHTML += a.outerHTML;
    }

}
