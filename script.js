const API = "https://pokeapi.co/api/v2/pokemon/";

let cameraStream = null;

let pokemonSelecionado = null;


async function carregarPokemon(numero) {

    const resposta = await fetch(API + numero);

    const pokemon = await resposta.json();

    return pokemon;
}


async function carregarPokemons() {

    const grid = document.querySelector("#pokemons");

    grid.innerHTML = "Carregando Pokémon...";

    const pokemons = [];


    for (let i = 0; i < 20; i++) {

        const numero = Math.floor(Math.random() * 1025) + 1;

        const pokemon = await carregarPokemon(numero);

        pokemons.push(pokemon);

    }


    grid.innerHTML = "";


    pokemons.forEach(pokemon => {

        const tipos = pokemon.types
            .map(tipo => tipo.type.name)
            .join(" / ");


        grid.innerHTML += `

            <article class="pokemon">

                <img
                    src="${pokemon.sprites.front_default}"
                    alt="${pokemon.name}"
                >

                <h3>${pokemon.name}</h3>

                <p>#${pokemon.id}</p>

                <p>Tipo: ${tipos}</p>

                <button onclick="abrirCamera('${pokemon.name}')">
                    📸 Capturar
                </button>

            </article>

        `;

    });

}


async function abrirCamera(nomePokemon) {

    pokemonSelecionado = nomePokemon;

    document.querySelector("#pokemonCamera").innerText =
        "Capturar " + nomePokemon;


    const camera = document.querySelector("#camera");

    camera.style.display = "flex";


    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });


        document.querySelector("#video").srcObject = cameraStream;

    } catch (erro) {

        alert("Não foi possível acessar a câmera.");

        fecharCamera();

    }

}


function tirarFoto() {

    const video = document.querySelector("#video");

    const canvas = document.querySelector("#canvas");

    const foto = document.querySelector("#fotoCapturada");


    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;


    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );


    const imagem = canvas.toDataURL("image/png");


    foto.innerHTML = `

        <h3>
            ${pokemonSelecionado} capturado!
        </h3>

        <img src="${imagem}" alt="Foto do Pokémon capturado">

    `;

}


function fecharCamera() {

    const camera = document.querySelector("#camera");

    camera.style.display = "none";


    if (cameraStream) {

        cameraStream.getTracks().forEach(track => {
            track.stop();
        });

        cameraStream = null;

    }

}

carregarPokemons();

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("./service-worker.js");

}