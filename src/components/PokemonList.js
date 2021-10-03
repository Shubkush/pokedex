import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import ImgMediaCard from '../materalui_components/card.js'

const PokemonList = () => {
    const [pokemons, set_pokemon] = useState([]);

    useEffect(() => {
        const axios = require("axios");
        axios
            .get("/pokemon/").then(response => {
                set_pokemon(response.data.results)
            })
    }, []);


    return (
        <div>
            <Grid container spacing={2}>

                {pokemons.map((pokemon, idx) => (
                    <Grid item xs={3}>
                        <ImgMediaCard key={idx} data={{ name: pokemon.name, url: pokemon.url }} />
                    </Grid>
                ))}
            </Grid>
        </div >)
}

export default PokemonList