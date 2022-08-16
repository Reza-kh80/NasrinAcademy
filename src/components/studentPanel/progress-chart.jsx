import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class ProgressChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [
                {
                    name: "Plan",
                    data: [],
                },
                {
                    name: "Student Progress",
                    data: [],
                }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#05',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#3266a8', '#f2cb07'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Progress Report',
                    align: 'left',
                    margin: 10,
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#1509bd'
                    },
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                tooltip: {
                    // fillSeriesColor: true,
                    enabled: true,
                    enabledOnSeries: undefined,
                    shared: true,
                    theme: "dark",
                    onDatasetHover: {
                        highlightDataSeries: false,
                    },
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: [],
                    title: {
                        text: 'Month'
                    },
                    labels: {
                        show: true,
                        rotate: 0,
                        rotateAlways: false,
                        hideOverlappingLabels: true,
                        showDuplicates: false,
                        trim: false,
                        minHeight: undefined,
                        maxHeight: 120,
                    },
                },
                yaxis: {
                    title: {
                        text: 'Progress (0-100%)'
                    },
                    min: 0,
                    max: 100
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            },


        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const series = [...this.state.series]
        series[0].data = nextProps.plan;
        series[1].data = nextProps.actual;
        this.setState({ series });
    }
    updateSeries() {
        const series = [...this.state.series]
        series[0].data = this.props.plan;
        series[1].data = this.props.actual;
        this.setState({ series });
    }
    componentDidMount() {
        this.updateSeries();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.plan !== this.props.plan) {
            this.updateSeries();
        }
        if (prevProps.actual !== this.props.actual) {
            this.updateSeries();
        }
    }
    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" />
            </div>)
    }
}
export default ProgressChart;
