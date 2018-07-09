import React, { Component } from 'react';
import PsCharts from "./PsCharts";

export default class PsHorizontalBarChart extends Component {
    render() {
        return (
            <PsCharts
                {...this.props}
                type='horizontalBar'
            />
        );
    }
}