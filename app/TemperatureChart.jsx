import React from 'react';
import { connect } from 'react-redux';
import d3 from 'd3';
import { LineChart } from '../vendor/rd3/src';

import * as utils from './lib/utils';
import {
    isRequestingChartData,
    getChartData,
} from './selectors/chart';

import './TemperatureChart.scss';

class TemperatureChart extends React.Component {
    constructor(props) {
        super(props);

        this.timeFormatter = d3.time.format('%-m/%-d %-I:%M %p');
        this.formatTooltip = this.formatTooltip.bind(this);
    }

    getFormattedData() {
        const { min, data } = this.props;

        const actual = { name : 'Actual', values : [] };
        const target = { name : 'Target', values : [] };

        if (data && data.length) {
            data.forEach(value => {
                const time = utils.date(value.timestamp);
                if (typeof value.temperature === 'number') {
                    actual.values.push({ x : time, y : value.temperature });
                }
                if (typeof value.setpoint === 'number') {
                    target.values.push({ x : time, y : value.setpoint });
                }
            });
        } else {
            // LineChart needs at least 1 data value?
            actual.values.push({ x : utils.date(min), y : 0 });
            target.values.push({ x : utils.date(min), y : 0 });
        }

        return [actual, target];
    }

    getDomain() {
        const { min, max, data } = this.props;

        let temperatureRange;
        if (data && data.length) {
            temperatureRange = d3.extent(data, point => point.temperature);
        } else {
            temperatureRange = [Infinity, -Infinity];
        }

        return {
            x : [
                utils.date(min),
                utils.date(max),
            ],
            y : [
                Math.min(temperatureRange[0], 0),
                Math.max(temperatureRange[1], 100),
            ],
        };
    }

    formatTooltip(d) {
        return [
            this.timeFormatter(d.xValue),
            d.seriesName + ': ' + String(d.yValue),
        ].join('\n');
    }

    render() {
        const { loading, readError } = this.props;
        const circleRadius = {
            inactive : 0,
            active   : 4,
        };

        return (
            <div className="TemperatureChart">
                <LineChart
                    legend
                    data={ this.getFormattedData() }
                    xAxisFormatter={ this.timeFormatter }
                    domain={ this.getDomain() }
                    tooltipFormat={ this.formatTooltip }
                    title="Line Chart"
                    width={ 1000 }
                    circleRadius={ circleRadius }
                />
                { loading && (
                    <div className="loading">
                        Loading...
                    </div>
                ) }
                { readError && (
                    <div className="error">
                        Error fetching data from API:
                        { readError }
                    </div>
                ) }
            </div>
        );
    }
}

TemperatureChart.propTypes = {
    min       : React.PropTypes.number,
    max       : React.PropTypes.number,
    loading   : React.PropTypes.bool,
    data      : React.PropTypes.array,
    readError : React.PropTypes.string,
};

export default connect((state, props) => {
    const range     = state.chart.range;
    const loading   = isRequestingChartData(state);
    const data      = getChartData(state);
    const readError = state.errors.dataRequest;

    return {
        min : range.min,
        max : range.max,
        loading,
        data,
        readError,
    };
})(TemperatureChart);
