import eventTypes from '../lib/eventTypes';

function shortenSha(sha) {
  return sha.slice(0, 10);
}

export function processName(name) {
  return name.replace('Event', '').split(/(?=[A-Z])/).join(" ");
}

export function generateUrl(event) {
  const { comment, name, before, head, type, pull } = event;
  const baseURL = 'https://github.com';
  const repoUrl = `${baseURL}/${name}`;

  switch (type) {
    case 'PushEvent':
      return `${repoUrl}/compare/${shortenSha(before)}...${shortenSha(head)}`;

    case 'IssueCommentEvent':
      return comment;

    case 'PullRequestEvent':
      return pull;

    case 'PullRequestReviewCommentEvent':
      return comment;

    default:
      return `${repoUrl}`;
  }
}

export function formatEvent(message) {
  const { id, created_at, type, repo: { name, url }, actor: { login, avatar_url } } = message;
  const event = {
    type,
    id,
    created_at,
    name,
    url,
    login,
    avatar_url,
    color: eventTypes[type].color,
    size: 10,
  };

  if (type === 'PushEvent' && message.payload) {
    const { size, head, before } = message.payload;

    event.size += size;
    event.before = before;
    event.head = head;
  }

  if ((type === 'IssueCommentEvent' || type === 'PullRequestReviewCommentEvent') && message.payload) {
    event.comment = message.payload.comment.html_url;
  }

  if (type === 'PullRequestEvent' && message.payload) {
    event.pull = message.payload.pull_request.html_url;
  }

  event.url = generateUrl(event);

  return event;
}

