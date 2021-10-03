import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react';
import PokemonList from './components/PokemonList';

import Container from '@mui/material/Container';

function App() {

  return (
    <Router>
      <div className="App">
        <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }} >
          <Switch>
            <Route exact path="/" component={PokemonList} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
