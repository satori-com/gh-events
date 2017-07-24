import React, { Component } from 'react';
import { processName } from '../lib/utils';
import eventTypes from '../lib/eventTypes';
import Types from 'prop-types';
import { Link } from 'react-router-dom';

class AllEvents extends Component {
  static defaultProps = {
    eventTypes: Types.object,
  };

  state = {
    selectedType: null,
  };

  static propTypes = {};

  renderLink(type) {
    if (this.props.location.search) {
      return {
        pathname: `/event/${type}`,
        search: this.props.location.search,
      }
    }

    return {
      pathname: `/event/${type}`
    }
  }

  render() {
    return (
      <div className="event-list">
        {
          !this.state.selectedType &&
          Object.keys(this.props.eventTypes).map((type, index) => {
            return (
              <div
                key={index}
                className="legend-item"
              >
                <span
                  className="legend-item-indicator"
                  style={{ backgroundColor: eventTypes[type].color }}
                />
                <Link
                  to={this.renderLink(type)}
                  className="side-menu-link"
                >
                  {processName(type)}
                </Link>: {this.props.eventTypes[type]}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default AllEvents;
