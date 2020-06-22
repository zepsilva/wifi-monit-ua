import React, { useState } from 'react';
import {GridWithImage} from './GridWithImage';
import './DepartmentGeneric.css';
import ImageMapper from 'react-image-mapper';
import { Slider, Typography, Button } from '@material-ui/core';
import TotalCounter from './TotalCounter';
import MetricSelector from './MetricSelector';
import Chart from './Chart';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

var slideIndex = 1;
var abc;
var testdynamicvalues = 0

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
/*function getNumDevicesOfAP(AP) {
    for (let ap of aps)
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

     
}*/


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
/*
function getClickAPText(AP) {
    return "AP: " + AP + ", Number of connected devices: " + getNumDevicesOfAP(AP);
}*/

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
    this.setState({string : ""});
}

const maxHourValue = 24;

function f(data) {
    console.log(data)
    testdynamicvalues = data.numDevices


}
export class DepartmentGeneric extends React.Component{
 

    constructor(props) {
        super(props);
        const time_now = new Date();

        const dates_back = [];
        var i;
        for(i = 0; i <= 7; i++) {
            time_now.setDate(new Date().getDate() - i);
            dates_back[i] = time_now.getDate();
        }
        
        this.state = {string : "",
                    basecolor : "rgba(0,0,250,1)",
                    baseraio : 15,
		            aps: [
                        {"mac":"286e13139c47",data: 0},// 0
                        {"mac":"4088b2c69a01",data: 0},// 1
                        {"mac":"811fe17e3578",data: 0},// 2
                        {"mac":"94ed25975fca",data: 0},// 3
                        {"mac":"c18302689d96",data: 0},// 4
                        {"mac":"2dbd89cae8a0",data: 0},// 5
                        {"mac":"c75d6733a5d5",data: 0},// 6
                        {"mac":"f605e3a05ec3",data: 0},// 7
                        {"mac":"76a369c7358b",data: 0},// 8
                        {"mac":"a6aed4251b46",data: 0},// 9
                        {"mac":"c26803b91441",data: 0},// 10
                        {"mac":"c6959257b146",data: 0},// 11
                        {"mac":"cfd7097acd66",data: 0},// 12
                        {"mac":"f1a971b93458",data: 0},// 13
                    ],
                    selectHour: time_now,
                    selSlider: false,
                    marks: [
                        {
                          value: 0,
                          label: dates_back[7],
                        },
                        {
                          value: 1,
                          label: dates_back[6],
                        },
                        {
                          value: 2,
                          label: dates_back[5],
                        },
                        {
                          value: 3,
                          label: dates_back[4],
                        },
                        {
                          value: 4,
                          label: dates_back[3],
                        },
                        {
                          value: 5,
                          label: dates_back[2],
                        },
                        {
                          value: 6,
                          label: dates_back[1],
                        },
                        {
                          value: 7,
                          label: dates_back[0],
                        },
                      ],
                    dates_back: dates_back,
		    metric: "Utilizadores",
		    labels: [],
                    data: [],
                    label: "Número de devices",
                    selectedValue : 'option1',
                    dialogOpen: false,
		    total: 0,
		    floorsUsers: [],
		    floorsDevices: [],
		    scale: [0,0,0,0,0]
    };
	this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleCloseOpen = this.handleCloseOpen.bind(this);
    }


    handleRadioChange(event) {
        this.setState({
            selectedValue: event.target.value
        });
        if (event.target.value == 'option1'){
            this.getChartData(1);
        } else {
            this.getChartData(2);
        }
    }

    handleCloseOpen(){
        if (this.state.dialogOpen==false) {
            this.setState({
                dialogOpen: true
            });
        }   else{
            this.setState({
                dialogOpen: false
            });
        }
    }
    
    async getChartData(option){
        /*
        this.setState({
            labels:['Aveiro','Porto','Lisbon'],
            data:[100,200,300]
        })
        */
	var listData=[];
        var time = new Date();
        var listLabels=[];
        var decrement = 1;
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if(option==1){
            await fetch('http://192.168.160.81:8088/numDevicesLast24Building?Building=ed4').then(response => response.json())
                .then(data => {listData = data.list;})

            for (var i = 0; i < 23; i++){
                if(time.getHours() - decrement >= 0){
                    listLabels.unshift(time.getHours() - decrement +"");
                    decrement = decrement + 1;
                } else {
                    listLabels.unshift(time.getHours() - decrement + 24 +"");
                    decrement = decrement + 1;
                }

            }
	    console.log("CONSOLELOGHERE");
	    console.log(listLabels);

            this.setState({
                labels:listLabels,
                label:'Número médio de devices na hora',
                data: listData
            })

        }
        else {
            await fetch('http://192.168.160.81:8088/numDevicesLast7Building?Building=ed4').then(response => response.json())
                .then(data => {listData = data.list;})
               
	    for (var i = 0; i < 7; i++){
                if(time.getDay() - decrement >= 0){
                    listLabels.unshift(days[time.getDay() - decrement]);
                    decrement = decrement + 1;
                } else {
                    listLabels.unshift(days[time.getDay() - decrement + 7]);
                    decrement = decrement + 1;
                }

            }

            this.setState({
                labels:listLabels,
                data:listData,
                label:'Média do número de devices nas 24horas'
            })
        }
    }

    getScale = () => {
	const nums = [];
        var ap;
	var i;
        for(i = 0; i < this.state.aps.length; i++) {
	   nums[i] = this.state.aps[i].data.numDevices;
        }
	var max = Math.max(...nums);
	console.log("MAX: "+max);
        const scale = [0]
        var i;
        for(i = 1; i < 5; i++) {
           scale[i] = scale[i-1] + Math.ceil(max/5);
        }
        console.log("aaaaaaaaaaaaaa"+ scale)
	this.setState({scale: scale})
    }

	
    componentWillMount(){
        this.getChartData(1);
    }

    async componentDidMount(){
        showSlides(slideIndex);
	var i;
	var time = new Date();
	var current = time.getTime();
	for (i = 0; i < this.state.aps.length; i++ ){
	    let new_state = Object.assign({}, this.state); 
	    let a = new_state.aps;
    	    await fetch('http://192.168.160.81:8088/infoAP?AP='+this.state.aps[i].mac+'&Time='+current/1000).then(response => response.json())
		.then(data => {a[i].data = data;
			      this.setState({aps: a})})
	}
	console.log(this.state.aps);
	
	this.getScale();
	
	await fetch('http://192.168.160.81:8088/infoBuilding?Building=ed'+ this.props.id.depNum)
	.then(response => response.json())
	.then(data => this.setState({total: data}))
	
	var j;
	for(j = 1; j <= 3; j++) { 		// devia depender do número de pisos do departamento em questão
	    let new_state_b = Object.assign({}, this.state);
	    var b = new_state_b.floorsUsers;
	    var c = new_state_b.floorsDevices;
		await fetch('http://192.168.160.81:8088/infoFloor?Building=ed'+ this.props.id.depNum +'&Floor=Piso '+ j)
		.then(response => response.json())
		.then(data => { console.log(data);
				b[j-1] = data.numUsers;
				c[j-1] = data.numDevices
			       	this.setState({floorsUsers: b, floorsDevices: c})})
	}
	
    }
    

    handleChangeHour = async (event, newValue) => {
    	var currentTime
        var newHour

        if(this.state.selSlider) {
          this.state.selectHour.setHours(0,0,0,0);
          currentTime = this.state.selectHour;
          newHour = newValue;
        } else {
          currentTime = new Date();
          newHour = currentTime.getHours() + newValue - maxHourValue;
        }
        currentTime.setHours(newHour);
        this.setState({selectHour: currentTime});
        const current = currentTime.getTime();
        var i;
    	for (i = 0; i < this.state.aps.length; i++){
    	    let new_state = Object.assign({}, this.state);
            let a = new_state.aps;
	    await fetch('http://192.168.160.81:8088/infoAP?AP='+this.state.aps[i].mac+'&Time='+current/1000).then(response => response.json())
        	.then(data => {a[i].data = data;
                              this.setState({aps: a})})
    	}
	this.getScale();
        console.log(this.state.aps)
	    console.log(currentTime);
    };

    handleChangeDay = (event, newValue) => {
        if(newValue === 7)
            this.setState({selSlider: false});
        else
            this.setState({selSlider: true});
        const currentDay = new Date();
        currentDay.setDate(this.state.dates_back[7-newValue]);
        currentDay.setHours(0,0,0,0);
        this.setState({selectHour: currentDay});
        console.log(currentDay);
        console.log("handleChangeDay");
      }

    getNumDevicesOfAP(AP) {
	var i;
    	for (i = 0; i < this.state.aps.length; i++) {
            if(AP == this.state.aps[i].mac) {
            	if(this.state.metric === "Dispositivos")	
		    return this.state.aps[i].data.numDevices;
		else
		    return this.state.aps[i].data.numUsers;
	    }
	}
   	return 11;
    }
    
    // escalas de cores dependendo do numero de devices ligados
    getColorFromNumDevices = (numDevices) => {
    if (numDevices >= this.state.scale[0] && numDevices <= this.state.scale[1] ){
        //console.log(numDevices);
        return "rgba(0,255,0,0.6)"; //verde
    } else if (numDevices > this.state.scale[1] && numDevices <= this.state.scale[2]){
        return "rgba(255,255,0,0.6)"; //amarelo
    } else if (numDevices > this.state.scale[2] && numDevices <= this.state.scale[3]){
        return "rgba(255,127,80,0.6)"; //laranja
    } else if (numDevices > this.state.scale[3] && numDevices <= this.state.scale[4]){
        return "rgba(255,0,0,0.6)"; //vermelho
    } else { //numDevices > 55
        return "rgba(150,100,200,0.6)"; //roxo
    }
}

    
    getClickAPText(AP) {
    	return "Nº de "+this.state.metric +": "+ this.getNumDevicesOfAP(AP);
    }
    
    updateMetric = (m) => {
        this.setState({
            metric: m
        });
    }

    render() {

        console.log("render INI")
	{console.log(this.state.scale)}
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
                        {name: this.getClickAPText(this.state.aps[5].mac), shape: "circle", coords: [944,237,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[6].mac), shape: "circle", coords: [1360,235,this.state.baseraio], preFillColor: this.state.basecolor},
                        {name: this.getClickAPText(this.state.aps[7].mac), shape: "circle", coords: [1566,235,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[8].mac), shape: "circle", coords: [366,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[9].mac), shape: "circle", coords: [539,818,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[10].mac), shape: "circle", coords: [912,804,15], preFillColor: "rgba(0,0,250,1)"},

                        // areas
                        {name: this.getClickAPText(this.state.aps[9].mac), shape: "rect", coords: [435,687,770,958], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[9].mac) )}, // 4.1.18

                        {name: this.getClickAPText(this.state.aps[8].mac), shape: "rect", coords: [209,687,432,958], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[8].mac) )}, // anfiteatro

                        {name: this.getClickAPText(this.state.aps[10].mac), shape: "poly", coords: [993,559, 773,559, 773,958, 1105,957, 1105,688, 993,688], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[10].mac) )}, // area de redes

                        {name: this.getClickAPText(this.state.aps[7].mac), shape: "rect", coords: [1477,96,1702,366], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[7].mac) )}, // nucleos
                        {name: this.getClickAPText(this.state.aps[6].mac), shape: "rect", coords: [1163,96,1476,366], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[6].mac) )},

                        {name: this.getClickAPText(this.state.aps[5].mac), shape: "poly", coords: [804,364, 928,364, 928,492, 1105,492, 1105,372, 1159,372, 1159,96, 801,96], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[5].mac) )}, // 4.1.18

                    ]
                };
                MAP2 = {
                    name: "mapadetipiso2",
                    areas: [
                        // APs
                        {name: this.getClickAPText(this.state.aps[0].mac), shape: "circle", coords: [955,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[1].mac), shape: "circle", coords: [644,817,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[2].mac), shape: "circle", coords: [292,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[3].mac), shape: "circle", coords: [1415,248,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[4].mac), shape: "circle", coords: [982,268,15], preFillColor: "rgba(0,0,250,1)"},


                        // area de gabinetes
                        {name: this.getClickAPText(this.state.aps[3].mac), shape: "rect", coords: [1137,96,1702,366], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[3].mac) )}, // 4.1.18

                        // area de gabinetes com sala
                        {name: this.getClickAPText(this.state.aps[4].mac), shape: "poly", coords: [804,364, 914,364, 915,492, 1138,492, 1138,96, 801,96], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[4].mac) )}, // 4.1.18

                        // area de salas
                        {name: this.getClickAPText(this.state.aps[1].mac), shape: "rect", coords: [435,687,768,958], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[1].mac) )}, // 4.1.18

                        // area do canto
                        {name: this.getClickAPText(this.state.aps[2].mac), shape: "rect", coords: [209,687,432,958], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[2].mac) )}, // 4.1.18

                        // area de redes
                        {name: this.getClickAPText(this.state.aps[0].mac), shape: "poly", coords: [993,559, 773,559, 773,958, 1105,957, 1105,688, 993,688], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[0].mac) )}, // area de redes
                    ]
                };
                MAP3 = {
                    name: "mapadetipiso3",
                    areas: [
                        // APs
                        {name: this.getClickAPText(this.state.aps[11].mac), shape: "circle", coords: [955,774,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[12].mac), shape: "circle", coords: [417,773,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[13].mac), shape: "circle", coords: [1414,249,15], preFillColor: "rgba(0,0,250,1)"},
                        {name: this.getClickAPText(this.state.aps[13].mac), shape: "circle", coords: [1037,292,15], preFillColor: "rgba(0,0,250,1)"},


                        // area de SE
                        {name: this.getClickAPText(this.state.aps[11].mac), shape: "poly", coords: [993,559, 994,687, 1104,688, 1104,958, 660,958, 660,769, 654,769, 654,687, 773,687, 773,559], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[11].mac) )}, // 4.1.18

                        // area de salinhas
                        {name: this.getClickAPText(this.state.aps[12].mac), shape: "rect", coords: [208,687,659,958], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[12].mac) )}, // 4.1.18

                        // area de gabinetes3
                        {name: this.getClickAPText(this.state.aps[13].mac), shape: "rect", coords: [1164,94,1702,365], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[13].mac) )}, // 4.1.18

                        // area de gabinetes com sala 3
                        {name: this.getClickAPText(this.state.aps[13].mac), shape: "poly", coords: [914,492, 1136,492, 1136,365, 1161,365, 1161,94, 801,94, 801,365, 914,365], preFillColor: this.getColorFromNumDevices( this.getNumDevicesOfAP(this.state.aps[13].mac) )}, // 4.1.18

                    ]
                };
                break;
            case 11:
                imagempiso1 = "./images/dep11_p1.png";
                imagempiso2 = "./images/dep11_p2.png";
                imagempiso3 = "./images/dep11_p3.png";
                /*MAP1 = {
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
                };*/
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
                <div className="centrado" style={{position:'absolute', left: 810, bottom: 100}}>
                        <p> Legenda (num de devices conectados): </p>
                        <div className="square" style={{backgroundColor : 'rgba(0,255,0,0.6)', right : '200px'}}> {this.state.scale[0]} a {this.state.scale[1]} </div>
                        <div className="square" style={{backgroundColor : 'rgba(255,255,0,0.6)', right : '150px'}}> {this.state.scale[1]+1} a {this.state.scale[2]} </div>
                        <div className="square" style={{backgroundColor : 'rgba(255,127,80,0.6)', right : '100px'}}> {this.state.scale[2]+1} a {this.state.scale[3]} </div>
                        <div className="square" style={{backgroundColor : 'rgba(255,0,0,0.6)', right : '50px'}}> {this.state.scale[3]+1} a {this.state.scale[4]} </div>
                        <div className="square" style={{backgroundColor : 'rgba(150,100,200,0.6)', right : '0px'}}> >{this.state.scale[4]+1} </div>
                </div>
                <div className="slideshow-container">

                    <div className="mySlides fade">
                        <div className="numbertext" style={{position:'absolute', left: 125, top: 50}}>Piso 1</div>
                            <ImageMapper src={imagempiso1} map={MAP1} onClick={handleClick.bind(this)} onMouseEnter={handleHoverON.bind(this)} onMouseLeave={handleHoverOFF.bind(this)} imgWidth={1920} width={1244} imgHeight={1080} height={700}/>
                        <div className="text"> {this.state.string} </div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext" style={{position:'absolute', left: 125, top: 50}}>Piso 2</div>
                            <ImageMapper src={imagempiso2} map={MAP2} onClick={handleClick.bind(this)}  onMouseEnter={handleHoverON.bind(this)} onMouseLeave={handleHoverOFF.bind(this)} imgWidth={1920} width={1244} imgHeight={1080} height={700}/>
                        <div className="text"> {this.state.string} </div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext" style={{position:'absolute', left: 125, top: 50}}>Piso 3</div>
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
		{console.log("floorsUsers: "+this.state.floorsUsers)}
		{console.log("floorsDevices: "+this.state.floorsDevices)}
		{this.state.metric === "Utilizadores" ? (
		    <div className="counter" style={{position:'absolute', left: 20, top: 85}}>
                        <TotalCounter metric={this.state.metric} source={"Department"} number={this.state.floorsUsers.reduce((a, b) => Number(a) + Number(b), 0)} floors={this.state.floorsUsers}/>
                    </div>
		) : (
		    <div className="counter" style={{position:'absolute', left: 20, top: 85}}>
                        <TotalCounter metric={this.state.metric} source={"Department"} number={this.state.floorsDevices.reduce((a, b) => Number(a) + Number(b), 0)} floors={this.state.floorsDevices}/>
                    </div>
		)}

                <div className="metric" style={{position:'absolute', right: 60, top: 85}}>
                  <MetricSelector updateMetric={this.updateMetric}/>
                </div>

                <div className="slider" style={{position:'absolute', right: 20, bottom: 40, width: 300, height: 180, background: '#fff', padding: 12, 'border-radius': 10, 'border-style': 'solid', 'border-color': "#B4B4B4", 'border-width': "1px", 'box-shadow': '2px 2px 4px 4px #aaaaaa'}}>
                    <Typography id="discrete-slider-restrict" gutterBottom>
                      Dia - { this.state.selectHour.toLocaleDateString() }
                    </Typography>
                    <Slider
                      defaultValue={7}
                      aria-labelledby="discrete-slider-restrict"
                      step={null}
                      marks={this.state.marks}
                      track='inverted'
                      min={0}
                      max={7}
                      onChange={this.handleChangeDay}
                    />
                    
                    <Typography id="discrete-slider" gutterBottom>
                        Tempo - { this.state.selectHour.getMinutes() < 10 ? this.state.selectHour.getHours() + ':'+ '0'+ this.state.selectHour.getMinutes() : this.state.selectHour.getHours() + ':'+ this.state.selectHour.getMinutes() }
                    </Typography>
                    { this.state.selSlider ? (
                    <Slider
                        defaultValue={0}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={true}
                        min={0}
                        max={maxHourValue}
                        onChange={this.handleChangeHour}
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
                        onChange={this.handleChangeHour}
                    /> )}
                </div>
		<div style={{position: 'absolute', left: 20, bottom: 100}}>
                    <Button onClick={this.handleCloseOpen} variant="outlined" color="primary">Estatisticas</Button>

                    <Dialog maxWidth={"lg"} onClose={this.handleCloseOpen} open={this.state.dialogOpen} >
                        <DialogContent>
                        <div check>
                        <DialogActions>
                            <IconButton color="primary" aria-label="menu" onClick={this.handleCloseOpen}>
                                <CloseIcon />
                            </IconButton>
                        </DialogActions>
                        <input
                            type="radio"
                            value="option1" // this is te value which will be picked up after radio button change
                            checked={this.state.selectedValue === "option1"} // when this is true it show the male radio button in checked
                            onChange={this.handleRadioChange} // whenever it changes from checked to uncheck or via-versa it goes to the handleRadioChange function
                        />
                        <span style={{ marginLeft: "5px" }}>Últimas 24 horas</span>
                        </div>
                        <div check>
                        <input
                            type="radio"
                            value="option2"
                            checked={this.state.selectedValue === "option2"}
                            onChange={this.handleRadioChange}
                        />
                        <span style={{ marginLeft: "5px" }}>Ultima semana</span>
                        </div>
                        <Chart label={this.state.label} labels={this.state.labels} data={this.state.data} redraw={true} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        );
    }
}
