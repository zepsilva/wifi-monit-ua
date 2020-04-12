import React from "react"
import Header from "../components/Header";
import { Grid } from "@material-ui/core";

import './dep.css';

const Dep4Page = () => {
    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Header />
                </Grid>
                <p align="center"> DETI - Departamento de Eletronica, Telecomunicações e Informática</p>
                <div style={{ padding: 20 }}>
                    <Grid item container>
                    <Grid item xs={0} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <p> Piso 1 </p>
                        <img src="/images/dep4piso1"/>
                    </Grid>
                    <Grid item xs={0} sm={2} />
                    </Grid>
                </div>
            </Grid>
            <Grid container direction="column">
                <div style={{ padding: 20 }}>
                    <Grid item container>
                    <Grid item xs={0} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <p> Piso 2 </p>
                        <img src="/images/dep4piso1" />
                    </Grid>
                    <Grid item xs={0} sm={2} />
                    </Grid>
                </div>
            </Grid>
            <Grid container direction="column">
                <div style={{ padding: 20 }}>
                    <Grid item container>
                    <Grid item xs={0} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <p> Piso 3 </p>
                        <img src="/images/dep4piso1" />
                    </Grid>
                    <Grid item xs={0} sm={2} />
                    </Grid>
                </div>
            </Grid>
            
        </div>
    );
};

export default Dep4Page;