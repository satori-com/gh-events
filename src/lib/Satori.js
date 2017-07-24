import SatoriSDK from 'satori-rtm-sdk';
import { Observable } from 'rxjs';
import pageVisibility from './pageVisibility';

const config = {
  appKey: process.env.REACT_APP_APP_KEY,
  endpoint: process.env.REACT_APP_ENDPOINT,
  channel: process.env.REACT_APP_CHANNEL,
};

const satori = new SatoriSDK(config.endpoint, config.appKey);
satori.start();

const visible = () => {
  if (!satori.isStopped()) {
    satori.stop();
  } else {
    satori.start();
  }
};

export const startVisibility = pageVisibility.onVisibilityChange.bind(pageVisibility, visible);
export const stopVisibility = pageVisibility.onVisibilityChange.bind(pageVisibility, visible);

export function getAllEvents() {
  if (!satori.getSubscription(config.channel)) {
    const sat = satori.subscribe(config.channel, SatoriSDK.SubscriptionMode.SIMPLE);

    return Observable.fromEvent(sat, 'rtm/subscription/data');
  } else {
    const sat = satori.resubscribe(config.channel, SatoriSDK.SubscriptionMode.SIMPLE);

    return Observable.fromEvent(sat, 'rtm/subscription/data');
  }
}

export function getEventsByRepo(repo) {
  if (!repo) {
    throw new Error('Repo required');
  }

  let filter = `SELECT * FROM \`${config.channel}\` WHERE repo.name LIKE '${repo}%'`;

  const options = {};

  if (!satori.getSubscription(config.channel)) {
    options.filter = filter;
    const sat = satori.subscribe(config.channel, SatoriSDK.SubscriptionMode.SIMPLE, options);

    return Observable.fromEvent(sat, 'rtm/subscription/data');
  } else {
    options.filter = filter;
    const sat = satori.resubscribe(config.channel, SatoriSDK.SubscriptionMode.SIMPLE, options);

    return Observable.fromEvent(sat, 'rtm/subscription/data');
  }
}
