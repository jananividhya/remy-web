import React, { Component } from 'react';
import PsCharts from "./PsCharts";

export default class PsPieChart extends Component {
    render() {
        return (
            <PsCharts
                {...this.props}
                type='pie'
            />
        );
    }
}