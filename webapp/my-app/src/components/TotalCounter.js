import React from 'react';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider, List, ListItem, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: "10px 10px",
      borderStyle: "solid",
      borderColor: "#B4B4B4",
      borderWidth: "1px"
    },
    text: {
      display: 'inline'
    }
  }));

export default function TotalCounter(props) {
    const classes = useStyles();
    
    return(
        <Paper className={classes.root} elevation={5}>
            <Grid  alignItems="center">
                
                    <Typography component="h2" variant="h5" color="primary" gutterBottom>
                       Nº {props.metric} 
                    </Typography>
                    <Typography component="p" variant="h4">
                        {props.source === "Department" && ("Total: ")}  {props.number}
                    </Typography>
                
                
                {
                    props.source === "Department" && 
                    props.floors.map((floors_data, index) => (
                        <div>
                        <Divider orientation='vertical' flexItem />
                        
                        <Typography className={classes.text} component="p" variant="h5">
                            Piso {index+1}: {floors_data}
                        </Typography>
                    
                        </div>
                    ))
                }
            </Grid>
        </Paper>
        
    )
}
