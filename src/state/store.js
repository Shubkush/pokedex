import { makeAutoObservable } from "mobx";

class PokemonStore {
    pokemons = [];
    search_params = '';
    constructor() {
        makeAutoObservable(this)
    }
    loadPokemons = (pokemons) => {
        this.pokemons = pokemons
    }

    setSearchParams(filter) {
        this.search_params = filter;
    }
    addPokemon(pokemon) {
        this.pokemons.push(pokemon)
    }

}

const pokemonStore = new PokemonStore()



const axios = require("axios");
axios
    .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118').then(response => {
        pokemonStore.loadPokemons(response.data.results)
    })

export default pokemonStore