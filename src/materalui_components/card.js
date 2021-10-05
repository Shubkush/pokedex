import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


export default function ImgMediaCard(props) {
    const [image, setImage] = useState();
    const [is_image_loading, setImageLoading] = useState(true);
    const [is_loading, setloading] = useState(false)


    let isRendered = useRef(false);

    useEffect(() => {
        isRendered = true;
        setloading(true)
        const axios = require("axios");
        axios
            .get(props.data.url).then(response => {
                if (isRendered) {
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

    return (
        is_loading ? (<img src={require("../assets/2.gif")} height="200px" />) : (
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
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card >
        ));
}
