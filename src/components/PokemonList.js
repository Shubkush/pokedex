import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import ImgMediaCard from './card.js'
import Box from '@mui/material/Box';
import PositionedMenu from '../materalui_components/positioned_menu';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react';
import pokedexStore from '../state/store'
import { autorun } from 'mobx'
import TypeFilter from './typeFilter'


const PokemonList = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);
    const [page_size, setPageSize] = useState(20);
    const [page, setPage] = useState(1);
    const [pagination_limit, setPaginationLimit] = useState(20);

    const handlePageChange = (event, value) => {
        if (value) {
            setStart((value - 1) * page_size)
            setEnd(value * page_size)
            setPage(value)
        }

    };


    useEffect(() => autorun(() => {
        setStart((page - 1) * page_size)
        setEnd(page * page_size)
        setPaginationLimit(Math.floor(pokedexStore.getPokemons.length / page_size) + 1)

        if (page > pagination_limit) {
            setPage(pagination_limit)
        }
    }, [page, page_size]));


    return (
        <div>
            <Box
                display="flex"
                justifyContent="right"
                alignItems="right"
                minHeight="10vh"
            >
                <Pagination page={page} sx={{ mb: 10 }} count={pagination_limit} color="primary" onChange={handlePageChange} />
                <PositionedMenu onChange={(value) => setPageSize(value)}
                    data={{ title: "Page Size", items: [10, 20, 50] }} />
                <Typography variant="h6" gutterBottom component="div">
                    {page_size}
                </Typography>
            </Box>
            <TypeFilter style={{ marginBottom: '10px' }} />
            <Grid container spacing={5}>
                {pokedexStore.getPokemons.slice(start, end).map((pokemon, idx) => (
                    <Grid item xs={4} key={idx + pokemon.name}>
                        <ImgMediaCard data={{ name: pokemon.name }} />
                    </Grid>
                ))}
            </Grid>
            <Box
                display="flex"
                justifyContent="right"
                alignItems="right"
                minHeight="10vh"
                sx={{ mt: 10 }} 
            >
                <Pagination page={page} count={pagination_limit} color="primary" onChange={handlePageChange} />
                <PositionedMenu  onChange={(value) => setPageSize(value)}
                    data={{ title: "Page Size", items: [10, 20, 50] }} />
                <Typography variant="h6" gutterBottom component="div">
                    {page_size}
                </Typography>
            </Box>
        </div >)
}

export default observer(PokemonList)