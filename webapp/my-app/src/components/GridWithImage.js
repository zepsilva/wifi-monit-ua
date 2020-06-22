import React from 'react';
import { Grid } from "@material-ui/core";
import ImageMapper from 'react-image-mapper';

import '../pages/dep.css';

function handleClick(e){
    console.log(e.name);
    if (e.name.charAt(0) == 'A') {
        alert(e.name);
    } else {
        return ;
    }
}

export class GridWithImage extends React.Component{
    render() {
        console.log(this.props);
        return (
            <div>
                <Grid container direction="column">
                    <div style={{ padding: 20 }}>
                        <Grid item container>
                        <Grid item xs={0} sm={2} />
                        <Grid item xs={12} sm={8}>
                            <ImageMapper src={this.props.image} map={this.props.map} onClick={handleClick.bind(this)} />
                        </Grid>
                        <Grid item xs={0} sm={2} />
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}
