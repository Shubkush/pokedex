import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import ImgMediaCard from '../materalui_components/card.js'
import Box from '@mui/material/Box';
import PositionedMenu from '../materalui_components/positioned_menu';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react';
import pokedexStore from '../state/store'
import { autorun } from 'mobx'
import TypeFilter from './typeFilter'
import PokemonList from './PokemonList'

const Home = () => {
    // const [start, setStart] = useState(0);
    // const [end, setEnd] = useState(20);
    // const [page_size, setPageSize] = useState(20);
    // const [page, setPage] = useState(1);
    // const [pagination_limit, setPaginationLimit] = useState(20);
    // const [pokemons,setPokemons] = useState([])

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
        <div>{
            pokedexStore.types.map(type => {
                <PokemonList data={{ type: type }} />
            })
        }

        </div >)
}

export default observer(Home)