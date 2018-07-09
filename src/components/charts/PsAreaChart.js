import React, { Component } from 'react';
import PsCharts from "./PsCharts";

export default class PsAreaChart extends Component {
    render() {
        return (
            <PsCharts
                {...this.props}
                type='area'
            />
        );
    }
}