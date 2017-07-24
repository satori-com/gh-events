import React, { Component } from 'react';
import AllEvents from './AllEvents';
import RepoInput from './RepoInput';

import SingleEventType from './SingleEventType';
import { Switch, Route } from 'react-router-dom';
import Types from 'prop-types';

const SEARCH_ENABLED = process.env.REACT_APP_SEARCH_ENABLED;

class SideMenu extends Component {
  static defaultProps = {};

  static propTypes = {
    events: Types.object,
    eventTypes: Types.object,
    onSubmit: Types.func,
    onEventClick: Types.func,
  };

  render() {
    return (
      <div className="side-menu">
        <div className="total-event-count">
          <h1>
            Github events: {
            Object.keys(this.props.eventTypes).reduce((acc, ele) => {
              acc += this.props.eventTypes[ele];

              return acc;
            }, 0)
          }
          </h1>
        </div>
        {
          SEARCH_ENABLED === 'true' &&
            this.props.match.isExact &&
          <RepoInput
            onSubmit={this.props.onSubmit}
            onChange={this.props.onChange}
            value={this.props.repo}
          />
        }
        {
          Object.keys(this.props.eventTypes).length === 0 &&
          <div>
            <p>Waiting for events to appear</p>
          </div>
        }
        <div className="side-menu-content">
          <Switch>
            <Route
              exact
              path={'/'}
              render={(props) => {
                return (
                  <AllEvents
                    eventTypes={this.props.eventTypes}
                    {...props}
                  />
                )
              }}
            />

            <Route
              path={'/event/:type'}
              render={(props) => (
                <SingleEventType
                  events={this.props.events}
                  onBack={this.props.onBack}
                  onMount={this.props.onEventClick}
                  repo={this.props.repo}
                  {...props}
                />)
              }
            />
            <Route component={() => <h1>No Match for that</h1>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default SideMenu;
