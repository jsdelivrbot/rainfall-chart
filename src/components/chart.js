import React, {Component} from 'react';
import d3 from 'd3';
import {LineChart} from 'react-d3-basic';

const title = 'Probability of Rain',
    width = 600,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    chartSeries = [{
        field: 'lowerBound',
        name: 'Lower Bound'
    },
    {
        field: 'mean',
        name: 'Mean'
    },
    {
        field: 'upperBound',
        name: 'Upper Bound'
    }],
    x = data => data.day,
    xScale = 'ordinal',
    yScale = 'linear',
    xLabel = 'Day',
    yLabel = 'Probability of Rain (%)';

export default class Chart extends Component {
    render() {
        return (
            <div>
                <LineChart
                    data = {this.props.data}
                    title = {title}
                    width = {width}
                    height = {height}
                    margins = {margins}
                    chartSeries = {chartSeries}
                    x = {x}
                    xScale = {xScale}
                    yScale = {yScale}
                    xLabel = {xLabel}
                    yLabel = {yLabel}
                />
            </div>
        );
    }
}
