import React, { useState, useEffect} from 'react';
import ReactMapGL, {NavigationControl, Marker, Source, Layer, Popup} from "react-map-gl";
import { Button, IconButton, Slider, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import depLoc from "../JSON/depLoc.json";
import ApartmentIcon from '@material-ui/icons/Apartment';

export default function Map() {
  

  const [viewport, setViewport] = useState({
    latitude: 40.629620,
    longitude: -8.657000,
    zoom: 16,
    width: "99.5vw",
    height: "94vh",
    bearing: 275
  });
  
  const settings = {
    minZoom: 16
  }
  const maxHourValue = 12;

  const [selectDep, setSelectDep] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [selectHour, setSelectHour] = useState(null);

  const handleChange = (event, newValue) => {
    setSelectHour(newValue);
    const currentTime = new Date();
    const newHour = currentTime.getHours() + newValue - maxHourValue;
    currentTime.setHours(newHour);
    const current = currentTime.getTime();
    console.log(currentTime);
  };

  return (
    <div>
    <ReactMapGL
      {...viewport}
      {...settings}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => {setViewport(viewport)}}
    >
    {/*    Layers de destaque dos departamentos não tão a funcionar por alguma razão  
      <Source id="dep" type="geojson" data={geojson}>
          <Layer id="depHighlight"{...highlightLayer} />
      </Source>
    */}
      <div style={{position: 'absolute', right: 10, top: 10}}>
          <NavigationControl />
      </div>

      

      {depLoc.departments.map(department => (
        <Marker key={department.DEP_NUMBER} latitude={department.coordinates[0]} longitude={department.coordinates[1]}>
          <Link to={{
                    pathname:'/department',
                    state:{
                        depNum: department.DEP_NUMBER
                    }
                  }}>
            <IconButton color="primary" aria-label="dep" size="small" onMouseEnter={() => {setHighlight(true); setSelectDep(department)}} onMouseLeave={() => setHighlight(false)}>
              <ApartmentIcon />
            </IconButton>
          </Link>
        </Marker>
      ))}
      {highlight && (
        <Popup latitude={selectDep.coordinates[0]} longitude={selectDep.coordinates[1]}>
          <div>
            <h1>{selectDep.DEP_NUMBER} - {selectDep.DEP_NOME}</h1>
          </div>
        </Popup>
      )}
      
    </ReactMapGL>
    <div className="slider" style={{position:'absolute', right: 20, bottom: 30, width: 250, height: 75, background: '#fff', padding: 12, 'border-radius': 25}}>
        <Typography id="discrete-slider" gutterBottom>
          Tempo
        </Typography>
        <Slider
          defaultValue={12}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={true}
          min={0}
          max={maxHourValue}
          scale={(x) => -(maxHourValue - x)}        // the scale is dependent on the maximum value
          track='inverted'
          onChange={handleChange}
        />
      </div>
    </div>
  );
}