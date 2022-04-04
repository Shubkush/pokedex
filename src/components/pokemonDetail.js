import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Image from 'material-ui-image';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function TransitionsModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Button onClick={handleOpen}>View Detail</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>

                    {
                        props.data.image && props.data.pokemon_details ?
                            <Box sx={style}> <Image src={props.data.image} />
                                < Typography id="transition-modal-title" variant="h9" component="h2">
                                    {props.data.pokemon_details.name}
                                </Typography>
                                <Stack direction="row" sx={{ mt: 5 }} spacing={2}>
                                    <Item>Weight {props.data.pokemon_details.weight}</Item>
                                    <Item>Height {props.data.pokemon_details.height}</Item>
                                </Stack>
                                < Typography sx={{ mt: 5 }} id="transition-modal-title" variant="h9" component="h2">
                                    Abilities
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    {
                                        props.data.pokemon_details.abilities.map(item => <Item key={item.ability.name}> {item.ability.name}</Item>)
                                    }
                                </Stack>
                            </Box> : null}

                </Fade>
            </Modal>
        </div >
    );
}
