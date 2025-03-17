//buttons && form
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
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
const randomPokemon = document.getElementById("random-pokemon-aside");
const randomPokemonName = document.getElementById("random-pokemon-name");
const randomSprite = document.getElementById("random-sprite");
const whoIsThatPokemon = document.getElementById("who-is-that-pokemon");
const guess = document.getElementById("guess");
const guessBtn = document.getElementById("guess-btn");
const randomiseButton = document.getElementById("randomise-button");
const hintBtn = document.getElementById("hint");
const hintText = document.getElementById("hint-text");
// async GET function
const getPokemon = async () => {
    try {
        const pokemon = searchInput.value.toLowerCase();
        console.log("'🐲 pokemon' --> ", pokemon);
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
        const data = await response.json();
        console.log("DATA -", data);
        
        let pokeTypes = "";

        
        data.types.forEach((el) => {
            if (el) {
                pokeTypes += `<p class="${el.type.name}">${el.type.name.toUpperCase()}</p>`;
            }
        })

        // Details
        pokemonName.innerHTML += `<p>${data.name.toUpperCase()}</p>`;
        pokemonId.innerHTML += `<p>#${data.id}</p>`;
        weight.innerHTML += `<p>${data.weight}</p>`;
        height.innerHTML += `<p>${data.height}</p>`;
        pokemonSprite.src = `${data.sprites.front_default}`;
        types.innerHTML += `${pokeTypes}`;
        
        data.stats.forEach((el) => {
            console.log("forEach loop - Name -", el.stat.name, " Value - ", el.base_stat);
        })

        for (const el in data) {
            console.log("const el in data -", el);
        }

        console.log("STATS -", data.stats[0].stat.name, "-", data.stats[0].base_stat);

        // Stats
        hp.innerHTML += `<p>${data.stats[0].base_stat}</p>`;
        attack.innerHTML += `<p>${data.stats[1].base_stat}</p>`;
        defense.innerHTML += `<p>${data.stats[2].base_stat}</p>`;
        specialAttack.innerHTML += `<p>${data.stats[3].base_stat}</p>`;
        specialDefense.innerHTML += `<p>${data.stats[4].base_stat}</p>`;
        speed.innerHTML += `<p>${data.stats[5].base_stat}</p>`;

    } catch (err) {
        alert("pokemon not found");
        console.log("pokemon not found", err);
    }
}

const resetUI = () => {
    // details
    searchInput.value = "";
    pokemonName.innerHTML = "<h4>name: </h4>";
    pokemonId.innerHTML = "<h4>id: </h4>";
    weight.innerHTML = "<h4>weight: </h4>";
    height.innerHTML = "<h4>height: </h4>";
    pokemonSprite.src = "";
    types.innerHTML = "<h4>types: </h4>";
    // stats
    hp.innerHTML = `<h4>hp: </h4>`;
    attack.innerHTML = `<h4>attack: </h4>`;
    defense.innerHTML = `<h4>defense: </h4>`;
    specialAttack.innerHTML = `<h4>special attack: </h4>`;
    specialDefense.innerHTML = `<h4>special defense: </h4>`;
    speed.innerHTML = `<h4>speed: </h4>`;
}

let randomPokemonData = {};

const getRandomPokemon = async () => {
    try {
        const randomId = Math.floor(Math.random() * (1025 - 1 + 1)) + 1;
        console.log("🤪 RANDOM POKE-ID -->", randomId);

        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${randomId}`);
        const data = await response.json();
        console.log("👹 RANDOM pokemon DATA --> ", data);

        randomPokemonData = await data;

        randomSprite.src = `${data.sprites.front_default}`;

    } catch (err) {
        alert("pokemon not found");
        console.log("pokemon not found", err);
    }
}

const checkGuess = (value) => {
    let guessCheck = guess.value ? guess.value : null;
    console.log("❓ GUESS CHECK ->", guessCheck);
    guessCheck = guessCheck != null ? guessCheck.toLowerCase() : guessCheck;

    if (guessCheck === randomPokemonData.name) {
        randomPokemon.innerHTML += `<h2 class="random-success">YOU DID IT!<br> ...please get a life</h2>
                                    <p>go outside dude...touch some grass<br>make some friends<br>call your mom<br>we're concerned about you</p>`;
    } else {
        alert("Take another guess! ...or try another Rand-Émon");
    }
}

getRandomPokemon();

whoIsThatPokemon.addEventListener("submit", (e) => {
    e.preventDefault();
});

guessBtn.addEventListener(("click"), () => {
    console.log("guessBtn works! 💪")
    console.log("GUESS VALUE 💵-->", guess.value);
    checkGuess(guess.value);
    // checkGuess();
    // resetRandomUI();
});

randomiseButton.addEventListener("click", getRandomPokemon);
hintBtn.addEventListener("click", () => {
    hintText.textContent = `${randomPokemonData.name}`;
})


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getPokemon();
    resetUI();
})
    

