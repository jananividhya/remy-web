import React, { Component } from 'react';
import PsCharts from "./PsCharts";

export default class PsLineChart extends Component {
    render() {
        return (
            <PsCharts
                {...this.props}
                type='line'
            />
        );
    }
}