import React, { useState } from 'react';
import {GridWithImage} from './GridWithImage';
import './DepartmentGeneric.css';
import ImageMapper from 'react-image-mapper';
import { Slider, Typography } from '@material-ui/core';


var slideIndex = 1;
var abc;
var testdynamicvalues = 0
var aps = [
   {"mac":"286e13139c47","numDevices":0},
   {"mac":"4088b2c69a01","numDevices":0},
   {"mac":"811fe17e3578","numDevices":0},
   {"mac":"94ed25975fca","numDevices":0},
   {"mac":"c18302689d96","numDevices":0},
   {"mac":"2dbd89cae8a0","numDevices":0},
   {"mac":"c75d6733a5d5","numDevices":0},
   {"mac":"f605e3a05ec3","numDevices":0},
   {"mac":"76a369c7358b","numDevices":0},
   {"mac":"a6aed4251b46","numDevices":0},
   {"mac":"c26803b91441","numDevices":0},
   {"mac":"c6959257b146","numDevices":0},
   {"mac":"cfd7097acd66","numDevices":0},
   {"mac":"f1a971b93458","numDevices":0}
]

for (var ap in aps){
    fetch('/numDevicesAP?AP='+ap.mac).then(response => response.json())
        .then(data => ap.numDevices=data.numDevices)
    console.log()
}
console.log(aps)

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// obtem numero de devices atraves do AP dado ( a substituir pela função da API )
function getNumDevicesOfAP(AP) {
    for (var ap in aps)
        if(AP == ap.mac)
            return ap.numDevices
    return 11
    /*
    var numDevices = 0;
    // deti piso 1
    if (AP == "salaEstudo"){
        numDevices = testdynamicvalues;
    } else if (AP == "makerLab"){
        numDevices = 60;
    } else if (AP == "anfiteatro"){
        numDevices = 10;
    } else if (AP == "salas computadores"){
        numDevices = 50;
    } else if (AP == "secretaria"){
        numDevices = 35;
    }else if (AP == "sala dos nucleos"){
        numDevices = 10;
    }
    // deti piso 2
    else if (AP == "sala de redes"){
        numDevices = 40;
    }
    else if (AP == "area de salas"){
        numDevices = 20;
    }
    else if (AP == "area do canto"){
        numDevices = 10;
    }
    else if (AP == "area de gabinetes"){
        numDevices = 18;
    }
    else if (AP == "area de gabinetes com sala"){
        numDevices = 25;
    }
    // deti piso 3
    else if (AP == "area de SE"){
        numDevices = 39;
    }
    else if (AP == "area de salinhas"){
        numDevices = 26;
    }
    else if (AP == "area de gabinetes3"){
        numDevices = 6;
    }
    else if (AP == "area de gabinetes com sala3"){
        numDevices = 14;
    }
    else {

    }

    return numDevices;

     */
}


// escalas de cores dependendo do numero de devices ligados
function getColorFromNumDevices(numDevices){
    if (numDevices >= 0 && numDevices <= 10 ){
        //console.log(numDevices);
        return "rgba(0,255,0,0.6)"; //verde
    } else if (numDevices > 10 && numDevices <= 20){
        return "rgba(255,255,0,0.6)"; //amarelo
    } else if (numDevices > 20 && numDevices <= 40){
        return "rgba(255,127,80,0.6)"; //laranja
    } else if (numDevices > 40 && numDevices <= 55){
        return "rgba(255,0,0,0.6)"; //vermelho
    } else { //numDevices > 55
        return "rgba(150,100,200,0.6)"; //roxo
    }
}

function getClickAPText(AP) {
    return "AP: " + AP + ", Number of connected devices: " + getNumDevicesOfAP(AP);
}

function handleClick(e){
    //console.log(e.name);
    if (e.name.charAt(0) == 'A') {
        alert(e.name);
    } else {
        return ;
    }
}

function handleHoverON(e){
    //console.log(e.name);
    this.setState({string : e.name});
}

function handleHoverOFF(e){
    this.setState({string : "Piso "+ slideIndex});
}

const maxHourValue = 12;

const handleChange = (event, newValue) => {
    const currentTime = new Date();
    const newHour = currentTime.getHours() + newValue - maxHourValue;
    currentTime.setHours(newHour);
    const current = currentTime.getTime();
    console.log(currentTime);
  };
function f(data) {
    console.log(data)
    testdynamicvalues = data.numDevices


}
export class DepartmentGeneric extends React.Component{


    constructor(props) {
        super(props);
        this.state = {string : "Piso "+ slideIndex,
                    basecolor : "rgba(0,0,250,1)",
                    baseraio : 15
    };
    }

    componentDidMount(){
        showSlides(slideIndex);

    }
    render() {

        console.log("123"+abc)

        var imagempiso1 = "./logo512.png";
        var imagempiso2 = "./logo512.png";
        var imagempiso3 = "./logo512.png";
        var MAP1 = {name : "default", areas: []};
        var MAP2 = {name : "default2", areas: []};
        var MAP3 = {name : "default3", areas: []};

        //console.log(getNumDevicesOfAP("salaEstudo"));
        //console.log(getNumDevicesOfAP("makerLab"));
        //console.log(getNumDevicesOfAP("nucleos"));
        //console.log(this.props.id.depNum);
        // Next/previous controls

        if(this.props.id.myConnectionButton == 1){
            slideIndex = 1;
            this.state.basecolor = "rgba(250,0,0,1)";
            this.state.baseraio = 40;
        }

        switch(this.props.id.depNum) {
            case 4:
                imagempiso1 = "./images/dep4_p1.png";
                imagempiso2 = "./images/dep4_p2.png";
                imagempiso3 = "./images/dep4_p3.png";
                MAP1 = {
                    name: "mapadetipiso1",
                    areas: [
                        // APs
                        {name: getClickAPText(aps[5].mac), shape: "circle", coords: [944,237,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[6].mac), shape: "circle", coords: [1360,235,this.state.baseraio], preFillColor: this.state.basecolor},
                        {name: getClickAPText(aps[7].mac), shape: "circle", coords: [1566,235,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[8].mac), shape: "circle", coords: [366,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[9].mac), shape: "circle", coords: [539,818,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[10].mac), shape: "circle", coords: [912,804,15], preFillColor: "rgba(0,0,250,1)"},

                        // areas
                        {name: "4.1.04 - 9", shape: "rect", coords: [435,687,770,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[5].mac) )}, // 4.1.18

                        {name: "4.1.01 - 3", shape: "rect", coords: [209,687,432,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[6].mac) )}, // anfiteatro

                        {name: "4.1.11 - 17", shape: "poly", coords: [993,559, 773,559, 773,958, 1105,957, 1105,688, 993,688], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[7].mac) )}, // area de redes

                        {name: "4.1.28 - 32", shape: "rect", coords: [1477,96,1702,366], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[8].mac) )}, // nucleos

                        {name: "4.1.23 - 27, 4.1.34", shape: "rect", coords: [1163,96,1476,366], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[9].mac) )},

                        {name: "4.1.18 - 20, 4.1.36", shape: "poly", coords: [804,364, 928,364, 928,492, 1105,492, 1105,372, 1159,372, 1159,96, 801,96], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[10].mac) )}, // 4.1.18

                    ]
                };
                MAP2 = {
                    name: "mapadetipiso2",
                    areas: [
                        // APs
                        {name: getClickAPText(aps[0].mac), shape: "circle", coords: [955,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[1].mac), shape: "circle", coords: [644,817,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[2].mac), shape: "circle", coords: [292,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[3].mac), shape: "circle", coords: [1415,248,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[4].mac), shape: "circle", coords: [982,268,15], preFillColor: "rgba(0,0,250,1)"},


                        // area de gabinetes
                        {name: "4.2.32 - 46", shape: "rect", coords: [1137,96,1702,366], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[0].mac) )}, // 4.1.18

                        // area de gabinetes com sala
                        {name: "4.2.23 - 31", shape: "poly", coords: [804,364, 914,364, 915,492, 1138,492, 1138,96, 801,96], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[1].mac) )}, // 4.1.18

                        // area de salas
                        {name: "4.2.08 - 14", shape: "rect", coords: [435,687,768,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[2].mac) )}, // 4.1.18

                        // area do canto
                        {name: "4.2.01 - 7", shape: "rect", coords: [209,687,432,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[3].mac) )}, // 4.1.18

                        // area de redes
                        {name: "4.2.15 - 22", shape: "poly", coords: [993,559, 773,559, 773,958, 1105,957, 1105,688, 993,688], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[4].mac) )}, // area de redes
                    ]
                };
                MAP3 = {
                    name: "mapadetipiso3",
                    areas: [
                        // APs
                        {name: getClickAPText(aps[11].mac), shape: "circle", coords: [955,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[12].mac), shape: "circle", coords: [417,773,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[13].mac), shape: "circle", coords: [1414,249,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText(aps[13].mac), shape: "circle", coords: [1037,292,15], preFillColor: "rgba(0,0,250,1)"},


                        // area de SE
                        {name: "4.3.15 - 24", shape: "poly", coords: [993,559, 994,687, 1104,688, 1104,958, 660,958, 660,769, 654,769, 654,687, 773,687, 773,559], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[11].mac) )}, // 4.1.18

                        // area de salinhas
                        {name: "4.3.01 - 17", shape: "rect", coords: [208,687,659,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[12].mac) )}, // 4.1.18

                        // area de gabinetes3
                        {name: "4.3.33 - 47", shape: "rect", coords: [1164,94,1702,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[13].mac) )}, // 4.1.18

                        // area de gabinetes com sala 3
                        {name: "4.3.25 - 32", shape: "poly", coords: [914,492, 1136,492, 1136,365, 1161,365, 1161,94, 801,94, 801,365, 914,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP(aps[13].mac) )}, // 4.1.18

                    ]
                };
                break;
            case 11:
                imagempiso1 = "./images/dep11_p1.png";
                imagempiso2 = "./images/dep11_p2.png";
                imagempiso3 = "./images/dep11_p3.png";
                MAP1 = {
                    name: "mapadmatpiso1",
                    areas: [
                        // APs
                        {name: getClickAPText("area topleft"), shape: "circle", coords: [469,396,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area botleft"), shape: "circle", coords: [536,772,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area mid"), shape: "circle", coords: [867,776,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area botright"), shape: "circle", coords: [1224,776,15], preFillColor: "rgba(0,0,250,1)"},


                        // area topleft
                        {name: "11.1.07 - 12", shape: "rect", coords: [211,286,570,490], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area topleft") )}, // topleft

                        // area botleft
                        {name: "bottomleft area", shape: "poly", coords: [211,571, 211,964, 686,964, 686,639, 570,639, 570,571], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area botleft") )}, // botleft

                        // area mid
                        {name: "11.1.25 - 30 salas", shape: "rect", coords: [690,602,1089,953], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area mid") )}, // mid

                        // area botright
                        {name: "11.1.31 - 39 salas", shape: "rect", coords: [1095,602,1358,953], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area botright") )}, // botright

                    ]
                };
                MAP2 = {
                    name: "mapadmatpiso2",
                    areas: [
                        // APs
                        {name: getClickAPText("area topleft2"), shape: "circle", coords: [456,445,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area botleft2"), shape: "circle", coords: [551,813,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area mid2"), shape: "circle", coords: [857,776,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area botright2"), shape: "circle", coords: [1224,776,15], preFillColor: "rgba(0,0,250,1)"},


                        // area topleft
                        {name: "11.2.8 - 16", shape: "rect", coords: [211,286,570,634], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area topleft2") )}, // topleft

                        // area botleft
                        {name: "11.2.1 - 7; 11.2.18 - 20", shape: "rect", coords: [211,637,687,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area botleft2") )}, // botleft

                        // area mid
                        {name: "11.2.21 - 28 salas", shape: "rect", coords: [690,639,1089,959], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area mid2") )}, // mid

                        // area botright
                        {name: "11.2.29 - 41 salas", shape: "rect", coords: [1096,634,1360,957], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area botright2") )}, // botright

                    ]
                };
                MAP3 = {
                    name: "mapadmatpiso3",
                    areas: [
                        // APs
                        {name: getClickAPText("area topleft3"), shape: "circle", coords: [456,445,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area botleft3"), shape: "circle", coords: [464,852,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area mid3"), shape: "circle", coords: [831,751,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area botright3"), shape: "circle", coords: [1188,750,15], preFillColor: "rgba(0,0,250,1)"},


                        // area topleft
                        {name: "11.3.12 - 23", shape: "rect", coords: [207,275,590,665], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area topleft3") )}, // topleft

                        // area botleft
                        {name: "11.3.1 - 11", shape: "rect", coords: [238,668,618,930], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area botleft2") )}, // botleft

                        // area mid
                        {name: "11.3.25 - 30; 11.3.42 - 50", shape: "rect", coords: [625,687,1024,930], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area mid2") )}, // mid

                        // area botright
                        {name: "11.3.31 - 41 salas", shape: "rect", coords: [1029,688,1369,929], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area botright2") )}, // botright

                    ]
                };
                break;
            default:

        }

        /*
        <h1 align="center"> {this.props.id.depName} </h1>
        <h3 align="center"> Piso 1 </h3>
        <GridWithImage image={imagempiso1} map={MAP1} />
        <h3 align="center"> Piso 2 </h3>
        <GridWithImage image={imagempiso2} map={MAP1} />
        <h3 align="center"> Piso 3 </h3>
        <GridWithImage image={imagempiso3} map={MAP1} />


                            <ImageMapper src={imagempiso1} map={MAP1} onClick={handleClick.bind(this)} width={1000} height={600}/>
        */
        return (
            <div>
                <div className="centrado" >
                        <p> Legenda (num de devices conectados): </p>
                        <div className="square" style={{backgroundColor : 'rgba(0,255,0,0.6)', right : '200px'}}> 0 a 10 </div>
                        <div className="square" style={{backgroundColor : 'rgba(255,255,0,0.6)', right : '150px'}}> 11 a 20 </div>
                        <div className="square" style={{backgroundColor : 'rgba(255,127,80,0.6)', right : '100px'}}> 21 a 40 </div>
                        <div className="square" style={{backgroundColor : 'rgba(255,0,0,0.6)', right : '50px'}}> 41 a 55 </div>
                        <div className="square" style={{backgroundColor : 'rgba(150,100,200,0.6)', right : '0px'}}> >55 </div>
                </div>
                <div className="slideshow-container">

                    <div className="mySlides fade">
                        <div className="numbertext">1 / 3</div>
                            <ImageMapper src={imagempiso1} map={MAP1} onClick={handleClick.bind(this)} onMouseEnter={handleHoverON.bind(this)} onMouseLeave={handleHoverOFF.bind(this)} imgWidth={1920} width={1244} imgHeight={1080} height={700}/>
                        <div className="text"> {this.state.string} </div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">2 / 3</div>
                            <ImageMapper src={imagempiso2} map={MAP2} onClick={handleClick.bind(this)}  onMouseEnter={handleHoverON.bind(this)} onMouseLeave={handleHoverOFF.bind(this)} imgWidth={1920} width={1244} imgHeight={1080} height={700}/>
                        <div className="text"> {this.state.string} </div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">3 / 3</div>
                            <ImageMapper src={imagempiso3} map={MAP3} onClick={handleClick.bind(this)} onMouseEnter={handleHoverON.bind(this)} onMouseLeave={handleHoverOFF.bind(this)} imgWidth={1920} width={1244} imgHeight={1080} height={700}/>
                        <div className="text"> {this.state.string} </div>
                    </div>

                    <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
                </div>
                <br/>

                <div style={{textAlign: "center",}}>
                    <span className="dot" onClick={() => currentSlide(1)}></span>
                    <span className="dot" onClick={() => currentSlide(2)}></span>
                    <span className="dot" onClick={() => currentSlide(3)}></span>
                </div>

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
}