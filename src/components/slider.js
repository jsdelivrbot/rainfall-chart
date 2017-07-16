import React, {Component} from 'react';

export default class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {value: this.props.value};

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(e.target.value);
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div className="slider">
                {this.props.title}
                <input type ="range" onChange={this.onChange}  value={this.props.value} min={this.props.min} max={this.props.max} />
                {this.state.value}
            </div>
        );
    }
}
