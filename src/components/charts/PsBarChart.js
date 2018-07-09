import React, { Component } from 'react';
import PsCharts from "./PsCharts";

export default class PsBarChart extends Component {
    render() {
        return (
            <PsCharts
                {...this.props}
                type='bar'
            />
        );
    }
}