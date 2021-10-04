import * as React from 'react';
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ImgMediaCard(props) {
    const [image, set_image] = useState();
    const [is_loading, set_isloading] = useState(false)
    useEffect(() => {
        set_isloading(true)
        const axios = require("axios");
        axios
            .get(props.data.url).then(response => {
                set_image(response.data.sprites.other["official-artwork"].front_default)
                set_isloading(false)
            })
    }, []);
    return (
        is_loading ? (<img src={require("../assets/loading.gif")} />) : (
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt={require("../assets/loading.gif")}
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
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card >
        ));
}
