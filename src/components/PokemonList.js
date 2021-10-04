import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import ImgMediaCard from '../materalui_components/card.js'
import Box from '@mui/material/Box';
import PositionedMenu from '../materalui_components/positioned_menu';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react';
import pokemonStore from '../state/store'

const PokemonList = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);
    const [is_page_empty, setPageEmpty] = useState(true);

    const handlePageChange = (event, value) => {
        setStart((value - 1) * limit)
        setEnd(value * limit)
        setPage(value)
    };


    useEffect(() => {
        setStart((page - 1) * limit)
        setEnd(page * limit)
    }, [page, limit]);


    return (
        <div>

            <Box
                display="flex"
                justifyContent="right"
                alignItems="right"
                minHeight="10vh"
            >
                <Pagination page={page} count={10} color="primary" onChange={handlePageChange} />
                <PositionedMenu onChange={(value) => setLimit(value)}
                    data={{ title: "Page Size", items: [10, 20, 50] }} />
                <Typography variant="h6" gutterBottom component="div">
                    {limit}
                </Typography>
            </Box>
            <Grid container spacing={5}>


                {pokemonStore.pokemons.filter(obj => obj.name.includes(pokemonStore.search_params)).slice(start, end).map((pokemon, idx) => (
                    <Grid item xs={4} key={idx + pokemon.name} onLoad={() => setPageEmpty(false)}>
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
                <Pagination count={10} color="primary" onChange={handlePageChange} />
                <PositionedMenu onChange={(value) => setLimit(value)}
                    data={{ title: "Page Size", items: [10, 20, 50] }} />
                <Typography variant="h6" gutterBottom component="div">
                    {limit}
                </Typography>
            </Box>
        </div >)
}

export default observer(PokemonList)