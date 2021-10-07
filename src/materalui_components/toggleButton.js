import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import { observer } from 'mobx-react';
import pokedexStore from '../state/store'


const StandaloneToggleButton = (props) => {
    const [selected, setSelected] = React.useState(false);

    const handleChange = (event) => {
        setSelected(!selected);
        if (!selected) {
            pokedexStore.setFilter(event.target.value);

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
                "&.MuiButtonBase-root:hover": {
                    bgcolor: pokedexStore.typeColors[props.data.title],
                    color: 'white'
                },
                "&.MuiToggleButton-root.Mui-selected": {
                    bgcolor: pokedexStore.typeColors[props.data.title],
                    color: 'white'
                }
            }}
        >
            {props.data.title}
        </ToggleButton>
    );
}

export default observer(StandaloneToggleButton)
