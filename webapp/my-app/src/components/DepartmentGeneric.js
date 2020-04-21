import React from 'react';
import {GridWithImage} from './GridWithImage';
import './DepartmentGeneric.css';
import ImageMapper from 'react-image-mapper';

var slideIndex = 1;
var basedir = "../static/react/"
 
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
    var numDevices = 0;
    // deti piso 1
    if (AP == "salaEstudo"){
        numDevices = 20;
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
    return "AP: " + AP + ", NUM OF CONNECTED DEVICES: " + getNumDevicesOfAP(AP);
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

export class DepartmentGeneric extends React.Component{
    constructor(props) {
        super(props);
        this.state = {string : "Piso "+ slideIndex};
    }

    componentDidMount(){
        showSlides(slideIndex);

    }
    render() {
        var imagempiso1 = basedir+"logo512.png";
        var imagempiso2 = basedir+"logo512.png";
        var imagempiso3 = basedir+"logo512.png";
        var MAP1 = {name : "default", areas: []};
        var MAP2 = {name : "default2", areas: []};
        var MAP3 = {name : "default3", areas: []};

        //console.log(getNumDevicesOfAP("salaEstudo"));
        //console.log(getNumDevicesOfAP("makerLab"));
        //console.log(getNumDevicesOfAP("nucleos"));
        //console.log(this.props.id.depNum);
        // Next/previous controls


        switch(this.props.id.depNum) {
            case 4:
                imagempiso1 = basedir+"images/dep4_p1.png";
                imagempiso2 = basedir+"images/dep4_p2.png";
                imagempiso3 = basedir+"images/dep4_p3.png";
                MAP1 = {
                    name: "mapadetipiso1",
                    areas: [
                        // APs
                        {name: getClickAPText("salaEstudo"), shape: "circle", coords: [944,237,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("makerLab"), shape: "circle", coords: [1360,235,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("sala dos nucleos"), shape: "circle", coords: [1566,235,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("anfiteatro"), shape: "circle", coords: [366,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("salas computadores"), shape: "circle", coords: [539,818,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("secretaria"), shape: "circle", coords: [912,804,15], preFillColor: "rgba(0,0,250,1)"},

                        // salas mais perto do AP da sala de estudo
                        {name: "4.1.18", shape: "rect", coords: [803,233,930,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("salaEstudo") )}, // 4.1.18
                        {name: "4.1.19", shape: "rect", coords: [801,94,1024,229], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("salaEstudo") )}, // 4.1.19
                        {name: "4.1.20", shape: "rect", coords: [1028,94,1160,229], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("salaEstudo") )}, // 4.1.20

                        // salas mais perto do AP makerlab
                        {name: "4.1.23", shape: "rect", coords: [1164,94,1307,229], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, //4.1.23
                        {name: "4.1.26", shape: "rect", coords: [1311,94,1421,229], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, // 4.1.26
                        {name: "4.1.27", shape: "rect", coords: [1424,94,1477,229], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, // 4.1.27
                        {name: "4.1.24", shape: "rect", coords: [1260,285,1307,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, // 4.1.24
                        {name: "4.1.25", shape: "rect", coords: [1312,285,1368,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, // 4.1.25

                        // salas mais perto do AP sala dos nucleos
                        {name: "4.1.28", shape: "rect", coords: [1481,94,1591,229], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("sala dos nucleos") )}, // 4.1.28
                        {name: "4.1.29", shape: "rect", coords: [1478,285,1523,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("sala dos nucleos") )}, // 4.1.29
                        {name: "4.1.30", shape: "rect", coords: [1528,285,1702,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("sala dos nucleos") )}, // 4.1.30
                        {name: "4.1.32", shape: "rect", coords: [1595,94,1702,229], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("sala dos nucleos") )}, // 4.1.32

                        // salas mais perto do AP anfiteatro
                        {name: "4.1.01", shape: "rect", coords: [209,687,371,805], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("anfiteatro") )}, // 4.1.01
                        {name: "4.1.02", shape: "rect", coords: [209,823,428,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("anfiteatro") )}, // 4.1.02

                        // salas computadores
                        {name: "4.1.04", shape: "rect", coords: [433,823,598,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("salas computadores") )}, // 4.1.04
                        {name: "4.1.06", shape: "rect", coords: [603,823,769,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("salas computadores") )}, // 4.1.06

                        // secretaria
                        {name: "4.1.11 - .17", shape: "poly", coords: [914,688 , 914,806, 883,806, 883,916, 998,916, 998,958, 1104,958, 1104,688], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("secretaria") )}, // 4.1.11-17
                        
                        // aquario
                        {name: "4.1.36", shape: "poly", coords: [998,293, 1133,293, 1133,364, 1099,364, 1099,484, 1050,484, 1050,470, 985,470, 984,369, 998,369], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("salaEstudo") )}, // 4.1.36
                    ]
                };
                MAP2 = {
                    name: "mapadetipiso2",
                    areas: [
                        // APs
                        {name: getClickAPText("sala de redes"), shape: "circle", coords: [955,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area de salas"), shape: "circle", coords: [644,817,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area do canto"), shape: "circle", coords: [292,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area de gabinetes"), shape: "circle", coords: [1415,248,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area de gabinetes com sala"), shape: "circle", coords: [982,268,15], preFillColor: "rgba(0,0,250,1)"},
    

                        // area de gabinetes
                        {name: "4.2.32 - 46", shape: "rect", coords: [1137,96,1702,366], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area de gabinetes") )}, // 4.1.18

                        // area de gabinetes com sala
                        {name: "4.2.23 - 31", shape: "poly", coords: [804,364, 914,364, 915,492, 1138,492, 1138,96, 801,96], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area de gabinetes com salas") )}, // 4.1.18

                        // area de salas
                        {name: "4.2.08 - 14", shape: "rect", coords: [435,687,768,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area de salas") )}, // 4.1.18

                        // area do canto
                        {name: "4.2.01 - 7", shape: "rect", coords: [209,687,432,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area do canto") )}, // 4.1.18

                        // area de redes
                        {name: "4.2.15 - 22", shape: "poly", coords: [993,559, 773,559, 773,958, 1105,957, 1105,688, 993,688], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("sala de redes") )}, // area de redes
                    ]
                };
                MAP3 = {
                    name: "mapadetipiso3",
                    areas: [
                        // APs
                        {name: getClickAPText("area de SE"), shape: "circle", coords: [955,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area de salinhas"), shape: "circle", coords: [417,773,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area de gabinetes3"), shape: "circle", coords: [1414,249,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: getClickAPText("area de gabinetes com sala3"), shape: "circle", coords: [1037,292,15], preFillColor: "rgba(0,0,250,1)"},
    

                        // area de SE
                        {name: "4.3.15 - 24", shape: "poly", coords: [993,559, 994,687, 1104,688, 1104,958, 660,958, 660,769, 654,769, 654,687, 773,687, 773,559], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area de SE") )}, // 4.1.18

                        // area de salinhas
                        {name: "4.3.01 - 17", shape: "rect", coords: [208,687,659,958], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area de salinhas") )}, // 4.1.18

                        // area de gabinetes3
                        {name: "4.3.33 - 47", shape: "rect", coords: [1164,94,1702,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area de gabinetes3") )}, // 4.1.18

                        // area de gabinetes com sala 3
                        {name: "4.3.25 - 32", shape: "poly", coords: [914,492, 1136,492, 1136,365, 1161,365, 1161,94, 801,94, 801,365, 914,365], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("area de gabinetes com sala3") )}, // 4.1.18

                    ]
                };
                break;
            case 11:
                imagempiso1 = basedir+"images/dep11_p1.png";
                imagempiso2 = basedir+"images/dep11_p2.png";
                imagempiso3 = basedir+"images/dep11_p3.png";
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

            </div>
        );
    }
}