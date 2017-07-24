import React, { Component } from 'react';
import Types from 'prop-types';
import {
  select,
  scaleTime,
  timer,
  easeCubicOut,
  easeCubicIn,
  easeLinear,
} from 'd3';

class EventItem extends Component {
  static defaultProps = {};

  static propTypes = {
    event: Types.object,
  };

  constructor(props) {
    super(props);

    this.events = [];
    this.initRenderer = this.initRenderer.bind(this);
    this.start = this.start.bind(this);
    this.initRenderer();

    window.addEventListener('resize', () => {
      this.start(this.element);
    });
  }

  componentWillMount() {
    this.receiveEvent();
  }

  start(element) {
    if (!element) {
      return;
    }

    if (this.svg) {
      this.svg.remove();
    }

    const size = element.getBoundingClientRect();

    const svg = select(element)
    .append('svg')
    .attr('width', size.width)
    .attr('height', size.height);

    const margin = { top: 30, right: 30, bottom: 20, left: 30 };
    const width = svg.attr('width') - margin.left - margin.right;
    const height = svg.attr('height') - margin.top - margin.bottom;

    const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
    const x = scaleTime().range([0, width]);

    x.tickFormat(() => null);

    timer(() => {
      const now = Date.now();
      x.domain([now - 10000, now]);
    });

    this.svg = svg;
    this.x = x;
    this.g = g;
    this.height = height;
    this.width = width;
    this.element = element;
  }

  initRenderer() {
    this.update();
    requestAnimationFrame(this.initRenderer);
  }

  receiveEvent() {
    const { event } = this.props;

    this.events.push(event);
  }

  update() {
    if (this.events.length === 0) {
      return;
    }

    const time = Date.now();

    if (!time) {
      return;
    }

    const { color } = this.events.shift();

    const circle = this.g.append('circle')
    .attr('r', 10)
    .attr('fill', color)
    .attr('opacity', 0.8)
    .attr('cy', Math.random() * this.height);

    circle.transition('time')
    .duration(10000)
    .ease(easeLinear)
    .attrTween("cx", (d) => (t) => this.x(time));

    circle.transition()
    .duration(750)
    .ease(easeCubicOut)
    .attr('r', 10)
    .attr('opacity', 0.8)
    .transition()
    .delay(10000 - 750 * 2)
    .ease(easeCubicIn)
    .attr('r', 10)
    .attr('stroke-opacity', 0)
    .remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.event && this.props.event.name && (this.props.event !== nextProps.event)) {
      this.receiveEvent();
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    return (
      <div
        className="visual-item-container"
        ref={this.start}
      />
    );
  }
}

export default EventItem;

