import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
    static defaultProps = {
        labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','19:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        data: [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240],
        label: 'Numéro de Devices'
    }

    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: this.props.labels,
                datasets:[
                    {
                        label:this.props.label,
                        data: this.props.data,
                        backgroundColor:[
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ]
                    }
                ]
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // update chart according to prop change
        this.setState({
            chartData:{
                labels: nextProps.labels,
                datasets:[
                    {
                        label: nextProps.label,
                        data: nextProps.data,
                        backgroundColor:[
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ]
                    }
                ]
            }
        })
	console.log("ON GRAPH:");
        console.log(this.state.chartData.datasets);
    }

    render(){
        return(
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    height={500}
                    width={1000}
                    options = {{
                        responsive:false,
                        title:{
                            display:true,
                            text:'Numero de pessoas no edifício',
                            fontSize:40
                        },
                        label:{
                            fontSize:40
                        },
                        scales: {
                          yAxes: [{
                            ticks: {
                              beginAtZero: true,
                              min: 0
                            }   
                          }]
                        }
                    }}
                />
            </div>
        )
    }
}
export default Chart;
