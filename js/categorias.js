function gerarListaProvas(json) {
    let listaProvas = document.getElementById('listaProvas');

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


    for (let i = 0; i < provas.length; i++) {
        a.href = 'prova.html?prova=' + provas[i][0];
        h5.innerHTML = provas[i][1].nome;
        small1.innerHTML = provas[i][1].data;
        p.innerHTML = provas[i][1].descricao;
        small2.innerHTML = "Simulado e Gabarito disponíveis"

        div.appendChild(h5);
        div.appendChild(small1);
        a.appendChild(div);
        a.appendChild(p);
        a.appendChild(small2);

        listaProvas.innerHTML += a.outerHTML;
    }
}

function gerarCategorias(categorias) {
    let entries = Object.entries(categorias);

    let ul = document.getElementById('listaCategorias');
    let a = document.createElement('a');
    a.className = 'text-decoration-none list-group-item';
    let li = document.createElement('li');
    li.className = 'd-flex justify-content-between align-items-center';
    let span = document.createElement('span');
    span.className = 'badge badge-primary badge-pill';

    for (let i = 0; i < entries.length;i++) {
        let nomeCategoria = entries[i][0];
        let contentCategoria = entries[i][1];

        a.className = 'text-decoration-none list-group-item';
        li.innerText = nomeCategoria;
        span.innerText = contentCategoria.split(',').length;

        li.innerHTML += span.outerHTML;



        if (nomeCategoria.toLowerCase() === recuperarParams('categoria')) {
            a.className += ' active';
        }

        a.href = 'categorias.html?categoria=' + nomeCategoria.toLowerCase();
        a.appendChild(li);
        ul.innerHTML += a.outerHTML;
    }

}
