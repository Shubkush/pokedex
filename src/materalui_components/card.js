import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react';
import pokedexStore from '../state/store'

const ImgMediaCard = (props) => {
    const [image, setImage] = useState();
    const [pokemon_types, setPokemonTypes] = useState([]);
    const [is_image_loading, setImageLoading] = useState(true);
    const [is_loading, setloading] = useState(false)
    const [filters, setFilters] = useState(props.data.filters)


    let isRendered = useRef(false);
    useEffect(() => {
        isRendered = true;
        setloading(true)
        const axios = require("axios");
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${props.data.name}`).then(response => {
                if (isRendered) {
                    setPokemonTypes(response.data.types)
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

    // const didMountRef = useRef(false)

    // useEffect(() => {
    //     console.log(didMountRef.current);
    //     if (didMountRef.current) {
    //         const check = (type) => {
    //             return pokedexStore.filters.includes(type.type.name)
    //         }
    //         setToRender(pokemon_types.some(check))
    //     } else didMountRef.current = true

    // }, [pokedexStore.filters])


    return (is_loading ? (<img src={require("../assets/2.gif")} height="200px" />) : (
        <Card sx={{ maxWidth: 345 }}>
            <div style={{ display: is_image_loading ? "block" : "none" }} >
                <CircularProgress />

            </div>

            <CardMedia
                component="img"
                onLoad={() => setImageLoading(false)}
                // alt="Can't load"
                height="auto"
                image={image}
            />
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
            </CardActions>
        </Card >
    ));
}

export default observer(ImgMediaCard)