
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
    filters = [];
    pokemon_details = []

    constructor() {
        makeAutoObservable(this)
    }

    loadPokemons = (pokemons) => {
        this.pokemons = pokemons
    }

    loadTypes = (types) => {
        this.types = types
    }

    setDetail = (pokemon) => {
        this.pokemon_details = pokemon
    }


    setSearchParams(filter) {
        this.search_params = filter;
    }

    set addPokemon(pokemon) {
        this.pokemons.push(pokemon)
    }

    get getPokemons() {
        if (this.filters.length) {
            return this.pokemons.filter(obj => obj.name.includes(this.search_params)).filter(obj => obj.pokemon_v2_pokemontypes.some(obj1 => this.filters.includes(obj1.pokemon_v2_type.name)))
        }
        return this.pokemons.filter(obj => obj.name.includes(this.search_params))


    }

    get getFilters() {
        return this.filters
    }

    setFilter(filter) {
        this.filters = this.filters.concat([filter])
    }
    removeFilter(filter) {
        this.filters.splice(this.filters.indexOf(filter), 1)
    }
}

const pokedexStore = new PokedexStore()

const axios = require("axios")
axios({
    url: 'https://beta.pokeapi.co/graphql/v1beta',
    method: 'post',
    data: {
        query: `
        query samplePokeAPIquery {
            pokemon_v2_pokemon_aggregate {
              nodes {
                name
                pokemon_v2_pokemontypes {
                  pokemon_v2_type {
                    name
                    id
                  }
                }
                id
              }
            }
          }
      `
    }
}).then((response) => {
    pokedexStore.loadPokemons(response.data.data.pokemon_v2_pokemon_aggregate.nodes)
});

export default pokedexStore