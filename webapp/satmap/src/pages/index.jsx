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
                <Map/>
                <Button> 
                    <Link to={{
                        pathname:'/department',
                        state:{
                            depNum: 4
                        }
                    }}> DETI (departamento 4) </Link> 
                </Button> 
                <Button> 
                    <Link to={{
                        pathname:'/department',
                        state:{
                            depNum: 23
                        }
                    }}> CP (departamento 23) </Link> 
                </Button>        
            </Grid>
        </div>
    );
};

export default IndexPage;