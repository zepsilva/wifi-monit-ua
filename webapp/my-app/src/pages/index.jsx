import React from "react";
import { Grid } from "@material-ui/core";
import Header from "../components/Header";
import Map from "../components/Map";

import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const IndexPage = () => {
    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Header />
                </Grid>
                <div style={{ padding: 20 }}>
                    <Grid item container>
                    <Grid item xs={0} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <Map/>
                        <Button> <Link to="/dep4"> DETI (teste) </Link> </Button> 
                    </Grid>
                    <Grid item xs={0} sm={2} />
                    </Grid>
                </div>
            </Grid>
        </div>
    );
};

export default IndexPage;