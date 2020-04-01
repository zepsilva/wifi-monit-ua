import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import Header from "./Components/Header";
import Map from "./Components/Map";

class App extends Component {
  render() {
    return (
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <div style={{ padding: 20 }}>
        <Grid item container>
          <Grid item xs={0} sm={2} />
          <Grid item xs={12} sm={8}>
            <Map />
          </Grid>
          <Grid item xs={0} sm={2} />
        </Grid>
        </div>
      </Grid>
    );
  }
}

export default App;
