import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import { observer } from 'mobx-react';
import pokedexStore from '../state/store'


const StandaloneToggleButton = (props) => {
    const [selected, setSelected] = React.useState(false);

    const handleChange = (event) => {
        setSelected(!selected);
        if (!selected) {
            pokedexStore.addFilter(event.target.value);
        }
        else {
            pokedexStore.removeFilter(event.target.value);
        }

    }

    return (

        <ToggleButton
            style={{ minWidth: '100px', borderRadius: '30px' }}
            value={props.data.title}
            selected={selected}
            size="small"
            onChange={handleChange}
            sx={{
                bgcolor: 'red'[500],
                "&.MuiButtonBase-root:hover": {
                    bgcolor: 'red'[500]
                }
            }}
        >
            {props.data.title}
        </ToggleButton>
    );
}

export default observer(StandaloneToggleButton)
