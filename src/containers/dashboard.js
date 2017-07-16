import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Chart from '../components/chart';
import Slider from '../components/slider';
import {fetchRainfall} from '../actions/index';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pressure: 1000,
            temperature: 23
        };

        this.chanceOfRain = this.chanceOfRain.bind(this);
        this.setPressure = this.setPressure.bind(this);
        this.setTemperature = this.setTemperature.bind(this);
    }

    componentDidMount() {
        this.props.fetchRainfall();
    }

    setPressure(pressure) {
        this.setState({pressure});
    }

    setTemperature(temperature) {
        this.setState({temperature});
    }

    chanceOfRain(pressure, temperature, amount) {
        var score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);
        var mean = Math.min(Math.max(score, 0), 100);
        var upper_bound = Math.min(1.5 * mean, 100);
        var lower_bound = Math.max(0.5 * mean, 0);
        return [lower_bound, mean, upper_bound];
    }

    render() {
        if (!this.props.rainfall[0]) {
            return <div>Loading...</div>;
        }

        const chancesOfRain = this.props.rainfall[0][0].days.map(day => {
            return {
                day: day.day,
                lowerBound: this.chanceOfRain(this.state.pressure,this.state.temperature,day.amount)[0],
                mean: this.chanceOfRain(this.state.pressure,this.state.temperature,day.amount)[1],
                upperBound: this.chanceOfRain(this.state.pressure,this.state.temperature,day.amount)[2]
            }; //return mean
        });

        return (
            <table className= "table table-hover">
                <tbody>
                    <tr>
                        <td><Slider onChange={this.setPressure} min={970} max ={1030} title="Pressure (hPa)" value={this.state.pressure}/></td>
                        <td><Chart data={chancesOfRain} /></td>
                    </tr>
                    <tr>
                        <td><Slider onChange={this.setTemperature} min={10} max={35} title="Temperature (C)" value={this.state.temperature}/></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({rainfall}) { // == const rainfall = state.rainfall
    return {rainfall}; // == {rainfall: rainfall}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRainfall}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
