import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react';
import pokedexStore from '../state/store'
import loadGif from '../assets/2.gif';
import Image from 'material-ui-image'
import TransitionsModal from './pokemonDetail'

const ImgMediaCard = (props) => {
    const [image, setImage] = useState();
    const [pokemon_types, setPokemonTypes] = useState([]);
    const [is_loading, setloading] = useState(false)
    const [pokemon_details, setDetails] = useState(false)




    let isRendered = useRef(false);
    useEffect(() => {
        isRendered = true;
        setloading(true)
        const axios = require("axios");
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${props.data.name}`).then(response => {
                if (isRendered) {
                    setPokemonTypes(response.data.types)
                    setDetails(response.data)
                    if (response.data.sprites.other["official-artwork"].front_default) {
                        setImage(response.data.sprites.other["official-artwork"].front_default)
                    }
                    else {
                        setImage('https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png')
                    }

                    setloading(false)
                }
                return null;
            })
            .catch(err => console.log(err));
        return () => {
            isRendered = false;
        };
    }, []);



    return (is_loading ? (<Image src={loadGif} height="200px" />) : (
        <Card sx={{ maxWidth: 345 }}>
            {
                image ? <Image src={image} /> : null
            }

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {/* {props.decs} */}
                </Typography>
            </CardContent>
            <CardActions>
                {
                    pokemon_types.map((type) =>
                        < Button key={type.type.name} variant="contained"
                            size="small" sx={{
                                bgcolor: pokedexStore.typeColors[type.type.name],
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: pokedexStore.typeColors[type.type.name]
                                }
                            }}
                        >{type.type.name}</Button>
                    )
                }
                <TransitionsModal data={{ image: image, pokemon_details: pokemon_details }} />
            </CardActions>
        </Card >
    ));
}

export default observer(ImgMediaCard)