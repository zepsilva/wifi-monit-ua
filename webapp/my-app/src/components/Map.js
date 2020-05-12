import React, { useState } from 'react';
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
    width: "100vw",
    height: "93vh",
    bearing: 275
  });
  
  const settings = {
    minZoom: 16
  }

  const maxHourValue = 24;
  const time_now = new Date();
  
  const [selectDep, setSelectDep] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [selectHour, setSelectHour] = useState(time_now);
  const [selSlider, setSelSlider] = useState(false);
  const [numDevices, setNumDevices] = useState(0);

  var dates_back = [];
  var i;
  for(i = 0; i <= 7; i++) {
    time_now.setDate(new Date().getDate() - i);
    dates_back[i] = time_now.getDate();
  }
  //console.log(dates_back[7])
  const marks = [
    {
      value: dates_back[7],
      label: dates_back[7],
    },
    {
      value: dates_back[6],
      label: dates_back[6],
    },
    {
      value: dates_back[5],
      label: dates_back[5],
    },
    {
      value: dates_back[4],
      label: dates_back[4],
    },
    {
      value: dates_back[3],
      label: dates_back[3],
    },
    {
      value: dates_back[2],
      label: dates_back[2],
    },
    {
      value: dates_back[1],
      label: dates_back[1],
    },
    {
      value: dates_back[0],
      label: dates_back[0],
    },
  ];
  console.log(marks)
  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  function valuetext(value) {
    return `${value}`;
  }

  const handleChangeHour = (event, newValue) => {
    var currentTime
    var newHour

    if(selSlider) {
      selectHour.setHours(0,0,0,0);
      currentTime = selectHour;
      newHour = newValue;
    } else {
      currentTime = new Date();
      newHour = currentTime.getHours() + newValue - maxHourValue;
    }
    
    currentTime.setHours(newHour);
    setSelectHour(currentTime);
    const current = currentTime.getTime(); // Server API call here
    console.log(currentTime);
  };

  const handleChangeDay = (event, newValue) => {
    if(newValue === dates_back[0])
      setSelSlider(false);
    else
      setSelSlider(true);
    const currentDay = new Date();
    currentDay.setDate(newValue);
    currentDay.setHours(0,0,0,0);
    setSelectHour(currentDay);
    console.log(currentDay);
  }

  const getNumDevicesPerDep = (numDep) => {
    console.log(numDep);
    fetch('http://192.168.160.81:8088/numDevicesBuilding?Building=ed'+numDep)
    .then(response => response.json())
    .then(data => setNumDevices(data.numDevices))

    console.log(numDevices);
  }


  return (
    <div>
    <ReactMapGL
      {...viewport}
      {...settings}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => {setViewport(viewport)}}
    >
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
            <IconButton color="primary" aria-label="dep" size="small" onMouseEnter={() => {setHighlight(true); setSelectDep(department); getNumDevicesPerDep(department.DEP_NUMBER)}} onMouseLeave={() => setHighlight(false)}>
              <ApartmentIcon />
            </IconButton>
          </Link>
        </Marker>
      ))}
      {highlight && (
        <Popup latitude={selectDep.coordinates[0]} longitude={selectDep.coordinates[1]}>
          <div>
            <h1>{selectDep.DEP_NUMBER} - {selectDep.DEP_NOME}</h1>
            <h2>Número de dispositivos conectados: {numDevices}</h2>
          </div>
        </Popup>
      )}
      
    </ReactMapGL>
    <div className="slider" style={{position:'absolute', right: 20, bottom: 40, width: 300, height: 180, background: '#fff', padding: 12, 'border-radius': 25, 'border-style': 'solid'}}>
        <Typography id="discrete-slider-restrict" gutterBottom>
          Dia - { selectHour.toLocaleDateString() }
        </Typography>
        <Slider
          defaultValue={dates_back[0]}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={marks}
          track='inverted'
          min={dates_back[7]}
          max={dates_back[0]}
          onChange={handleChangeDay}
        />
      
        <Typography id="discrete-slider" gutterBottom>
          Tempo - { selectHour.getMinutes() < 10 ? selectHour.getHours() + ':'+ '0'+ selectHour.getMinutes() : selectHour.getHours() + ':'+ selectHour.getMinutes() } {console.log(selectHour)}
        </Typography>
        
        { selSlider ? (
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={true}
            min={0}
            max={maxHourValue}
            onChange={handleChangeHour}
            />
        ) : (
          <Slider
            defaultValue={maxHourValue}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={true}
            min={0}
            max={maxHourValue}
            scale={(x) => -(maxHourValue - x)}     
            track='inverted'
            onChange={handleChangeHour}
          /> )}
      </div>
    </div>
  );
}