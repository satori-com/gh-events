import React, { Component } from 'react';
import Github from './Github'
import SideMenu from './SideMenu';
import code from '../resources/code.svg';
import { Console } from '@satori-sdk/component-library';
import qs from 'qs';
import {
  getAllEvents,
  getEventsByRepo,
  startVisibility,
  stopVisibility
} from '../lib/Satori';
import { formatEvent } from '../lib/utils';

class GithubContainer extends Component {
  static defaultProps = {};

  static propTypes = {};

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEventTypeClick = this.handleEventTypeClick.bind(this);

    this.eventIds = [];
    this.eventQueue = {};
  }

  state = {
    repo: '',
    event: {},
    type: null,
    eventTypes: {},
    showConsole: false,
  };

  componentDidMount() {
    this.initSubscription();

    if (!this.events) {
      return;
    }

    startVisibility();

    this.events = this.events.map((frame) => frame.body.messages).subscribe((messages) => {
      messages.forEach((message) => {
        this.message = message;
        const event = formatEvent(message);
        const type = event.type;

        if (!this.eventIds.includes(event.id)) {

          this.eventIds.push(event.id);

          if (!this.eventQueue[type]) {
            this.eventQueue[type] = [];
          }

          this.eventQueue[type].unshift(event);

          if (this.eventQueue[type].length > 100) {
            this.eventQueue[type].pop();
          }

          if (this.eventIds.length > 2000) {
            this.eventIds = [];
          }

          this.setState(() => {
            const eventTypes = Object.assign({}, this.state.eventTypes, { [event.type]: ++this.state.eventTypes[event.type] || 1 });
            return { event, eventTypes };
          });
        }
      });
    });
  }

  componentWillUnmount() {
    stopVisibility();
  }

  initSubscription() {
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

    if (!query.repo) {
      this.events = getAllEvents();
    } else {
      this.setState({ repo: query.repo });
      this.events = getEventsByRepo(query.repo);
    }
  }

  handleEventTypeClick(type) {
    this.setState({ type })
  }

  handleBackButton() {
    this.setState({ type: null });
  }

  handleSearchOnChange(repo) {
    this.setState({ repo });
  }

  handleSubmit(repo) {
    if (!repo) {
      this.setState({ repo: null });

      this.props.history.push({ pathname: '/', search: null });

      return this.events = getAllEvents();
    }

    this.eventQueue = {};
    this.events = getEventsByRepo(repo);
    this.props.history.push({ pathname: '/', search: `?repo=${encodeURI(repo)}` });

    this.setState({ eventTypes: {}, event: {}, repo });
  }

  handleShowConsole() {
    this.setState({ showConsole: !this.state.showConsole })
  }

  render() {
    return (
      <div>
        <SideMenu
          {...this.props}
          onChange={this.handleSearchOnChange.bind(this)}
          onSubmit={this.handleSubmit}
          onBack={this.handleBackButton.bind(this)}
          onEventClick={this.handleEventTypeClick}
          eventTypes={this.state.eventTypes}
          events={this.eventQueue}
          repo={this.state.repo}
        />
        <Github
          eventTypes={this.state.eventTypes}
          event={this.state.event}
        />
        <button
          className="console-control"
          onClick={this.handleShowConsole.bind(this)}
        >
          <img src={code} alt="" />
          <p className="console-control-text">See the Live Data</p>
        </button>
        {
          this.state.showConsole &&
          <Console message={this.message} />
        }
      </div>
    );
  }
}

export default GithubContainer;
