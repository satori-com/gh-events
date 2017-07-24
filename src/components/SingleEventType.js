import React, { PureComponent } from 'react';
import { processName } from '../lib/utils';
import eventTypes from '../lib/eventTypes';
import Types from 'prop-types';

class SingleEventType extends PureComponent {
  static defaultProps = {
    event: {},
  };

  static propTypes = {
    eventType: Types.object,
    events: Types.object,
  };

  componentDidMount() {
    this.type = this.props.match.params.type;
    this.props.onMount(this.type, this.props.repo);
  }

  componentWillUnmount() {
    this.props.onBack();
    this.events = null;
  }

  render() {
    const type = this.props.match.params.type;

    return (
      <div className="single-event-menu">
        <div className="single-event-menu-header">
          <span
            className="legend-close"
            onClick={this.props.history.goBack}
          />
          <span
            className="legend-item-indicator"
            style={{ backgroundColor: eventTypes[type].color }}
          />
          <h1 className="single-event-title">{processName(this.props.match.params.type)}</h1>
          <h2 className="single-event-subtitle">Showing last 100</h2>
        </div>
        <div className="single-event-menu-content">
          {
            this.props.events[type] &&
            this.props.events[type].map(event => {
              return (
                <div
                  className="single-event-item"
                  key={event.id}
                >
                  <a href={event.url} className="side-menu-link-event-item" target="blank">
                    {
                      event.name
                    }
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default SingleEventType;
