import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import ImgMediaCard from '../materalui_components/card.js'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import PositionedMenu from '../materalui_components/positioned_menu';
import Typography from '@mui/material/Typography';

const PokemonList = () => {
    const [pokemons, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [is_loading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true)
        const axios = require("axios");
        let url = `/pokemon/?offset=${offset}&limit=${limit}`
        console.log(offset, limit)
        axios
            .get(url).then(response => {
                setPokemon(response.data.results)
                setIsLoading(false)
            })
    }, [offset, limit]);

    const handlePangeChange = (event, value) => {
        setOffset((value - 1) * 20)
        setPage(value)
    };

    return (
        <div>

            {
                is_loading ? (
                    <LinearProgress />
                )
                    : (
                        <div>

                            <Box
                                display="flex"
                                justifyContent="right"
                                alignItems="right"
                                minHeight="10vh"
                            >
                                <Pagination page={page} count={10} color="primary" onChange={handlePangeChange} />
                                <PositionedMenu onChange={(value) => setLimit(value)}
                                    data={{ title: "Page Size", items: [10, 20, 50] }} />
                                <Typography variant="h6" gutterBottom component="div">
                                    {limit}
                                </Typography>
                            </Box>
                            <Grid container spacing={5}>

                                {pokemons.map((pokemon, idx) => (
                                    <Grid item xs={4} key={idx + pokemon.name}>
                                        <ImgMediaCard data={{ name: pokemon.name, url: pokemon.url }} />
                                    </Grid>
                                ))}
                            </Grid>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                minHeight="10vh"
                            >
                                <Pagination count={10} color="primary" onChange={handlePangeChange} />
                            </Box>
                        </div >
                    )}
        </div >)
}

export default PokemonList