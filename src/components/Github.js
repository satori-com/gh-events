import React, { Component } from 'react';
import Types from 'prop-types';
import EventItem from './EventItem';

class Github extends Component {
  static defaultProps = {};

  static propTypes = {
    event: Types.object,
  };

  static shortenSha(sha) {
    return sha.slice(0, 10);
  }

  render() {
    return (
      <div
        id="github-visual"
      >
        {Object.keys(this.props.eventTypes).map((eventType, index) => {
          return (
            <EventItem
              key={index}
              event={this.props.event.type === eventType ? this.props.event : {}}
            />
          )
        })}
      </div>
    );
  }
}

export default Github;

