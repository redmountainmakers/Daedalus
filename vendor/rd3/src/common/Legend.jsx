'use strict';

import { scaleOrdinal, schemeCategory20c } from 'd3-scale';

const React = require('react');

module.exports = React.createClass({

  displayName: 'Legend',

  propTypes: {
    className: React.PropTypes.string,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    data: React.PropTypes.array.isRequired,
    itemClassName: React.PropTypes.string,
    margins: React.PropTypes.object,
    text: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      className: 'rd3-legend',
      colors: scaleOrdinal(schemeCategory20c),
      colorAccessor: (d, idx) => idx,
      itemClassName: 'rd3-legend-item',
      text: '#000',
    };
  },

  render() {
    const props = this.props;

    const textStyle = {
      color: 'black',
      fontSize: '50%',
      verticalAlign: 'top',
      position: 'relative',
      top: '2px',
      left: '-6px',
    };

    const legendItems = [];

    props.data.forEach((series, idx) => {
      const itemStyle = {
        color: props.colors(props.colorAccessor(series, idx)),
        lineHeight: '60%',
        fontSize: '200%',
      };

      legendItems.push(
        <li
          key={idx}
          className={props.itemClassName}
          style={itemStyle}
        >
          <span
            style={textStyle}
          >
            {series.name}
          </span>
        </li>
      );
    });

    const topMargin = props.margins.top;

    const legendBlockStyle = {
      wordWrap: 'break-word',
      width: props.width,
      paddingLeft: 0,
      marginBottom: 0,
      marginTop: topMargin,
      listStylePosition: 'outside',
      listStyleType: 'disc',
    };

    return (
      <ul
        className={props.className}
        style={legendBlockStyle}
      >
        {legendItems}
      </ul>
    );
  },
});
