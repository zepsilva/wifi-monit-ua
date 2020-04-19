import React, { useState, useEffect } from 'react';
import ReactMapGL, {NavigationControl, Marker, Source, Layer, Popup} from "react-map-gl";
import { Button, IconButton } from '@material-ui/core';
import { Link } from "react-router-dom";
import depGeoJSON from "../JSON/depsGeoJSON.geojson";
import depLoc from "../JSON/depLoc.json";
import ApartmentIcon from '@material-ui/icons/Apartment';

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 40.629620,
    longitude: -8.657000,
    zoom: 16,
    width: "99vw",
    height: "92vh",
    bearing: 275
  });
  
  const settings = {
    minZoom: 16
  }

  const [selectDep, setSelectDep] = useState(null);
  const [highlight, setHighlight] = useState(false);
  
  const depLayer = {            /* Department inactive background layer */ 
    id: 'dep',
    type: 'fill',
    paint: {
      'fill-outline-color': '#000000',
      'fill-color': '#000000'
    }
  };

  const highlightLayer = {      /* Department highlighted layer */
    id: 'depHighlight',
    type: 'fill',
    paint: {
      'fill-outline-color': '#484896',
      'fill-color': '#6e599f',
      'fill-opacity': 0.75
    }
  };

  const geojson = {
    type: 'Feature', 
    geometry: {"type": "Polygon",
      "coordinates": [
        [
          [40.632714, -8.659114], [40.632730, -8.659340], [40.633096, -8.659353],
          [40.633102, -8.659670], [40.633517, -8.659678], [40.633519, -8.659490],
          [40.633252, -8.659487], [40.633248, -8.659128], [40.632714, -8.659114]
        ]
      ]
    }
  };

  return (
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
      <div style={{position: 'absolute', right: 0}}>
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
      
      {/*<Marker
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
      </Marker> */}
    </ReactMapGL>
  );
}