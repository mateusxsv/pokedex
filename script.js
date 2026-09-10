const API = "https://pokeapi.co/api/v2/pokemon/";

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

            </article>
        `;
    });
}

carregarPokemons();
