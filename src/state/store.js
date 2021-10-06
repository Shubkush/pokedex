
import { makeAutoObservable } from "mobx";

class PokedexStore {
    typeColors = {
        bug: "#00aa54",
        dark: "#5f5079",
        dragon: "#228c98",
        electric: "#d3f82b",
        fairy: "#b3003f",
        fighting: "#f0593b",
        fire: "#ff6a00",
        flying: "#8eb0c6",
        ghost: "#9c568f",
        grass: "#00d562",
        ground: "#b07323",
        ice: "#7dc4e1",
        normal: "#d491a5",
        poison: "#af1cd7",
        psychic: "#ff008a",
        rock: "#983416",
        steel: "#B7B7CE",
        water: "#0098ff"
    };

    types = [];
    pokemons = [];
    search_params = '';
    filters = []

    constructor() {
        makeAutoObservable(this)
    }

    loadPokemons = (pokemons) => {
        this.pokemons = pokemons
    }

    loadTypes = (types) => {
        this.types = types
    }


    setSearchParams(filter) {
        this.search_params = filter;
    }

    addPokemon(pokemon) {
        this.pokemons.push(pokemon)
    }

    get getPokemons() {
        return this.pokemons.filter(obj => obj.name.includes(this.search_params))
    }

    addFilter(filter) {
        const axios = require("axios");
        axios
            .get(`type/${filter}`).then(response => {
                pokedexStore.loadPokemons(response.data.results)
            })
        this.filters.push(filter)
    }
    removeFilter(filter) {
        this.filters.splice(this.filters.indexOf(filter), 1)
        console.log(this.filters)
    }
}

const pokedexStore = new PokedexStore()


const axios = require("axios");
axios
    .get('pokemon?offset=0&limit=1118').then(response => {
        pokedexStore.loadPokemons(response.data.results)
    })

export default pokedexStore