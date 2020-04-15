import React, { useState } from 'react';
import ReactMapGL, {NavigationControl, Marker} from "react-map-gl";
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 40.629620,
    longitude: -8.657000,
    zoom: 16,
    width: "99vw",
    height: "92vh",
    bearing: 275
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => {setViewport(viewport)}}
    >
      <div style={{position: 'absolute', right: 0}}>
          <NavigationControl />
      </div>
      
      <Marker
        key={1}
        latitude={40.633213}
        longitude={-8.659457}
      >
        
        <Link to={{
                    pathname:'/department',
                    state:{
                        depNum: 4
                    }
                  }}>
          <Button variant="contained" color="primary" size="small">
            DETI
          </Button>
        </Link>
      </Marker>
    </ReactMapGL>
  );
}