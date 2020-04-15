import React from 'react';
import { Grid } from "@material-ui/core";

import '../pages/dep.css';

export class DepartmentGeneric extends React.Component{
    render() {
        var depName = "default";
        var imagempiso1 = "./logo512.png";
        var imagempiso2 = "./logo512.png";
        var imagempiso3 = "./logo512.png";
        console.log(this.props.id);
        switch(this.props.id) {
            case 4:
                depName = "Departamento de Eletrónica, Telecomunicações e Informática";
                imagempiso1 = "./images/dep4piso1.png";
                imagempiso2 = "./images/dep4piso2.png";
                imagempiso3 = "./images/dep4piso3.png";
                break;
            case 23:
                depName = "Complexo Pedagógico";
                break;
            default:
                depName = "default switch case text";
        }

        return (
            <div>
                <Grid container direction="column">
                    <p align="center"> {depName} </p>
                    <div style={{ padding: 20 }}>
                        <Grid item container>
                        <Grid item xs={0} sm={2} />
                        <Grid item xs={12} sm={8}>
                            <p> Piso 1 </p>
                            <img src={imagempiso1}/>
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
                                <img src={imagempiso2} />
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
                            <img src={imagempiso3} />
                        </Grid>
                        <Grid item xs={0} sm={2} />
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}