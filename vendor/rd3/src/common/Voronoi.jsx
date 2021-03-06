'use strict';

import { voronoi } from 'd3-voronoi';

const React = require('react');
const Polygon = require('./Polygon');

module.exports = React.createClass({

  displayName: 'Voronoi',

  // TODO: PropTypes.any
  propTypes: {
    xScale: React.PropTypes.any,
    yScale: React.PropTypes.any,
    width: React.PropTypes.any,
    height: React.PropTypes.any,
    structure: React.PropTypes.any,
    data: React.PropTypes.any,
  },

  render() {
    const xScale = this.props.xScale;
    const yScale = this.props.yScale;

    const voronoiGenerator = voronoi()
      .x(d => xScale(d.coord.x))
      .y(d => yScale(d.coord.y))
      .extent([[0, 0], [this.props.width, this.props.height]]);

    const regions = voronoiGenerator(this.props.data).polygons().map((vnode, idx) => (
      <Polygon structure={this.props.structure} key={idx} id={vnode.data.id} vnode={vnode} />
    ));

    return (
      <g>
        {regions}
      </g>
    );
  },
});
