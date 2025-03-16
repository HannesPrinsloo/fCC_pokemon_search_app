//buttons && form
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const randomiseButton = document.getElementById("randomise-button");
const searchInput = document.getElementById("search-input");

// info, types, stats && random
    // info
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonSprite = document.getElementById("pokemon-sprite");
    // types
const types = document.getElementById("types");
    // stats
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
    // random
const randomPokemon = document.getElementById("random_pokemon");
const randomPokemonName = document.getElementById("random-pokemon-name");
const randomPokemonImage = document.getElementById("random-pokemon-image");

// async GET function
const getPokemon = async () => {
    try {
        const pokemon = searchInput.value.toLowerCase();
        console.log("'🐲 pokemon' --> ", pokemon);
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
        const data = await response.json();
        console.log("DATA -", data);
        console.log("ID -", data.id);
        console.log("NAME -", data.name);
        console.log("BASE_XP -", data.base_experience);
        console.log("HEIGHT -", data.height);
        console.log("IMG -", data.sprites.front_default);

        pokemonName.innerHTML += `<p>${data.name}</p>`;
        pokemonId.innerHTML += `<p>${data.id}</p>`;
        weight.innerHTML += `<p>${data.weight}</p>`;
        height.innerHTML += `<p>${data.height}</p>`;
        pokemonSprite.src += `${data.sprites.front_default}`;
        types.innerHTML += ``


        data.stats.forEach((el) => {
            console.log("forEach loop - Name -", el.stat.name, " Value - ", el.base_stat);
        })

        for (const el in data) {
            console.log("const el in data -", el);
        }

        console.log("STATS -", data.stats[0], data.stats[1]);
    } catch (err) {
        alert("pokemon not found");
        console.log("pokemon not found", err);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getPokemon();
})
    

