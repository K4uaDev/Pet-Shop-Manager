class Dono {
    constructor(nome, telefone) {
        this.nome = nome;
        this.telefone = telefone;
    }
}

class Pet {
    constructor(nome, especie, idade, dono) {
        this.nome = nome;
        this.especie = especie;
        this.idade = idade;
        this.dono = dono; 
    }
}

const listaDonos = [];
const listaPets = [];

const btnCadastrarDono = document.getElementById('cadastrarDono');
const btnCadastrarPet = document.getElementById('cadastraPet');
const selectDono = document.getElementById('donoPet');

btnCadastrarDono.addEventListener('click', () => {
    const nomeDono = document.getElementById('nomeDono').value.trim();
    const telefoneDono = document.getElementById('telefoneDono').value.trim();

    if (!nomeDono || telefoneDono.length < 8) {
        alert('Preencha corretamente os campos do dono!');
        return;
    }

    const donoExistente = listaDonos.some(dono => dono.nome === nomeDono);
    if (donoExistente) {
        alert('Este dono já está cadastrado!');
        return;
    }

    const novoDono = new Dono(nomeDono, telefoneDono);
    listaDonos.push(novoDono);

    const option = document.createElement('option');
    option.value = novoDono.nome;
    option.textContent = novoDono.nome;
    selectDono.appendChild(option);

    alert(`Dono cadastrado com sucesso:`);

    document.getElementById('nomeDono').value = '';
    document.getElementById('telefoneDono').value = '';
});


btnCadastrarPet.addEventListener('click', () => {
    const nomePet = document.getElementById('nomePet').value.trim();
    const especiePet = document.getElementById('especiePet').value.trim();
    const idadePet = parseInt(document.getElementById('idadePet').value);
    const nomeDonoSelecionado = selectDono.value;

    if (!nomePet || !especiePet || isNaN(idadePet) || idadePet <= 0 || !nomeDonoSelecionado) {
        alert('Preencha corretamente todos os campos do pet!');
        return;
    }

    const donoSelecionado = listaDonos.find(dono => dono.nome === nomeDonoSelecionado);

    const petExistente = listaPets.some(pet => pet.nome === nomePet && pet.dono.nome === donoSelecionado.nome);
    if (petExistente) {
        alert('Este pet já foi cadastrado para esse dono!');
        return;
    }

    const novoPet = new Pet(nomePet, especiePet, idadePet, donoSelecionado);
    listaPets.push(novoPet);

    alert(`Pet cadastrado com sucesso:`);

    exibirListaPets();

    document.getElementById('nomePet').value = '';
    document.getElementById('especiePet').value = '';
    document.getElementById('idadePet').value = '';
    selectDono.value = '';
});

function exibirListaPets() {
    const secaoLista = document.querySelector('section.card:last-of-type');
    secaoLista.innerHTML = '<h2>📋 Lista de Pets</h2>';

    if (listaPets.length === 0) {
        secaoLista.innerHTML += '<p>Nenhum pet cadastrado ainda.</p>';
        return;
    }

    const ul = document.createElement('ul');

    listaPets.forEach(pet => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Nome:</strong> ${pet.nome} <br>
            <strong>Espécie:</strong> ${pet.especie} <br>
            <strong>Idade:</strong> ${pet.idade} <br>
            <strong>Dono:</strong> ${pet.dono.nome} <br>
            <strong>Telefone:</strong> ${pet.dono.telefone}
        `;
        ul.appendChild(li);
    });

    secaoLista.appendChild(ul);
}
