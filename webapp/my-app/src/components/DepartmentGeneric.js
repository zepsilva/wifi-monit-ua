import React from 'react';
import {GridWithImage} from './GridWithImage';

function getNumDevicesOfAP(AP) {
    var numDevices = 0;
    if (AP == "salaEstudo"){
        numDevices = 20;
    } else if (AP == "makerLab"){
        numDevices = 40;
    } else { // AP == "nucleos"
        numDevices = 10;
    }
    return numDevices;
}

function getColorFromNumDevices(numDevices){
    if (numDevices >= 0 && numDevices <= 10 ){
        console.log(numDevices);
        return "rgba(260,0,0,0.2)";
    } else if (numDevices > 10 && numDevices <= 20){
        return "rgba(260,0,0,0.4)";
    } else { //numDevices > 20 
        return "rgba(260,0,0,0.6)";
    }
}

function getClickAPText(AP) {
    return "AP: " + AP + ", NUM OF CONNECTED DEVICES: " + getNumDevicesOfAP(AP);
}

export class DepartmentGeneric extends React.Component{
    render() {
        var imagempiso1 = "./logo512.png";
        var imagempiso2 = "./logo512.png";
        var imagempiso3 = "./logo512.png";
        var MAP1 = {name : "deafult", areas: []};

        //console.log(getNumDevicesOfAP("salaEstudo"));
        //console.log(getNumDevicesOfAP("makerLab"));
        //console.log(getNumDevicesOfAP("nucleos"));
        //console.log(this.props.id.depNum);

        switch(this.props.id.depNum) {
            case 4:
                imagempiso1 = "./images/detipiso1.png";
                imagempiso2 = "./images/dep4piso2.png";
                imagempiso3 = "./images/dep4piso3.png";
                MAP1 = {
                    name: "mapadetipiso1",
                    areas: [
                        // APs
                        {name: getClickAPText("salaEstudo"), shape: "circle", coords: [555,108,15], fillColor: "rgba(0,0,250,0.5)"},
                        {name: getClickAPText("makerLab"), shape: "circle", coords: [771,77,15], fillColor: "rgba(0,0,250,0.5)"},
                        {name: getClickAPText("sala dos nucleos"), shape: "circle", coords: [1109,85,15], fillColor: "rgba(0,0,250,0.5)"},

                        // salas mais perto do AP da sala de estudo
                        {name: "4.1.18", shape: "rect", coords: [469,92,574,178], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("salaEstudo") )}, // 4.1.18
                        {name: "4.1.19", shape: "rect", coords: [469,2,648,91], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("salaEstudo") )}, // 4.1.19

                        // salas mais perto do AP makerlab
                        {name: "4.1.20", shape: "rect", coords: [649,2,754,91], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, // 4.1.20
                        {name: "4.1.23", shape: "rect", coords: [755,2,870,91], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, //4.1.23
                        {name: "4.1.26", shape: "rect", coords: [871,2,959,91], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, // 4.1.26
                        {name: "4.1.27", shape: "rect", coords: [960,2,1004,91], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("makerLab") )}, // 4.1.27

                        // salas mais perto do AP sala dos nucleos
                        {name: "4.1.28", shape: "rect", coords: [1005,2,1092,91], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("sala dos nucleos") )}, // 4.1.28
                        {name: "4.1.32", shape: "rect", coords: [1093,2,1181,91], preFillColor: getColorFromNumDevices( getNumDevicesOfAP("sala dos nucleos") )}, // 4.1.32
                    ]
                };
                break;
            case 23:
                break;
            default:

        }

        return (
            <div>
                <h1 align="center"> {this.props.id.depName} </h1>
                <h3 align="center"> Piso 1 </h3>
                <GridWithImage image={imagempiso1} map={MAP1} />
                <h3 align="center"> Piso 2 </h3>
                <GridWithImage image={imagempiso2} map={MAP1} />
                <h3 align="center"> Piso 3 </h3>
                <GridWithImage image={imagempiso3} map={MAP1} />
            </div>
        );
    }
}