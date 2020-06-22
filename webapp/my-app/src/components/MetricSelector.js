import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'

const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.primary.main,
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

const paperStyles = makeStyles((theme) => ({
    root: {
      padding: "10px 10px",
      borderStyle: "solid",
      borderColor: "#B4B4B4",
      borderWidth: "1px"
    },
}));

export default function MetricSelector(props) {
    const classes = paperStyles();
    
    const [state, setState] = React.useState({
        checked: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        state.checked ? props.updateMetric("Dispositivos") : props.updateMetric("Utilizadores"); 
      };
    return(
    <Paper className={classes.root} elevation={5} >
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Dispositivos</Grid>
            <Grid item>
            <AntSwitch checked={state.checked} onChange={handleChange} name="checked" />
            </Grid>
            <Grid item>Utilizadores</Grid>
        </Grid>
        </Typography>
    </Paper>
    )
}
