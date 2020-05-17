import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: 'auto',
    paddingTop: 60,
    paddingLeft: 20
  }
}));

var numDevices = null;
fetch('http://192.168.160.81:8088/numDevicesAP?AP=c75d6733a5d5').then(response => response.json())
        .then(data => numDevices=data.numDevices)

var client_ip = null;
fetch('http://192.168.160.81:8088/get_client_ip').then(response => response.json())
        .then(data => client_ip=data.ip)

//<Button color="inherit"> <Link to="/myconnection" style={{textDecoration: 'inherit', color: 'white'}}> My Connection </Link> </Button> 

export default function ButtonAppBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Link to="/" style={{textDecoration: 'inherit', color: 'white'}}> WiFi-monitUA </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
	    <h4> IP address: {client_ip} </h4>
            <h4> Você está conectado ao AP: </h4>
            <h4> DETI - PISO 1 - c75d6733a5d5 </h4>
            <ul><li>Numero de pessoas conectadas: {numDevices}</li></ul>
            <Button variant="contained" color="primary"> <Link to={{
                        pathname:'/department',
                        state:{
                            depNum: 4,
                            myConnectionButton: 1
                        }
                    }} style={{textDecoration: 'inherit', color: 'white'}}> LOCALIZAÇÃO DO AP </Link> </Button> 
        </div>
      </Drawer>
    </div>
  );
}
