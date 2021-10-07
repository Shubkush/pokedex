import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import pokedexStore from '../state/store'
import Grid from '@mui/material/Grid';
import StandaloneToggleButton from '../materalui_components/toggleButton'

export default function TypeFilter() {

    return (
        <div style={{ marginBottom: '100px' }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Filter By type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>

                        {Object.entries(pokedexStore.typeColors)
                            .map(([key, value]) =>
                                <Grid item xs={2} key={key}>
                                    <StandaloneToggleButton data={{ title: key }} />
                                </Grid>
                            )}


                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
