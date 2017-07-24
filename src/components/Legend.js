import React, { Component } from 'react';
import Types from 'prop-types';
import eventTypes from '../lib/eventTypes';

class Legend extends Component {
  static defaultProps = {
    onClick: (e) => {
      e.preventDefault();
    },
    isVisible: false,
  };

  static propTypes = {
    eventTypes: Types.object.isRequired,
    onClick: Types.func,
    onClose: Types.func,
    isVisible: Types.bool,
  };

  state = {
    selectedType: null
  };

  constructor(props) {
    super(props);

    this.handleClearFilter = this.handleClearFilter.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(type, event) {
    event.preventDefault();
    this.props.onClick(type);
    this.setState({ selectedType: type });
  }

  handleClearFilter(event) {
    event.preventDefault();

    this.setState({ selectedType: null });
    this.props.onClick(false);
  }

  render() {
    return (
      <div id="legend" style={{visibility: !this.props.isVisible ? 'hidden': 'visible'}}>
        <span
          className="legend-close"
          dangerouslySetInnerHTML={{__html: '&#x2715'}}
          onClick={this.props.onClose}
        />
        <div className="legend-header">
          <h1>All Events</h1>
          {
            this.state.selectedType &&
            <a
              href="/clear"
              onClick={this.handleClearFilter}
            >Clear Filter</a>
          }
        </div>
        {
          Object.keys(this.props.eventTypes).map((type, index) => {
            return (
              <div
                key={index}
                className="legend-item"
              >
                <span
                  className={`legend-item-indicator ${this.state.selectedType === type ? 'active' : ''}`}
                  style={{ backgroundColor: eventTypes[type].color }}
                />
                <a href={type}
                   onClick={(event) => this.handleOnClick(type, event)}
                >
                  {type}
                </a>: {this.props.eventTypes[type]}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Legend;
