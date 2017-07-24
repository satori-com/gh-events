/**
 * Handles execution when tab focus changes in most browsers.
 * Author: @alextaylor
 */

class PageVisibility {
  constructor() {
    let visibilityChangeEvent = "visibilityChange";
    this.hiddenKey = "hidden";
    this.listeners = [];

    if (typeof document.mozHidden !== "undefined") {
      this.hiddenKey = "mozHidden";
      visibilityChangeEvent = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      this.hiddenKey = "msHidden";
      visibilityChangeEvent = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      this.hiddenKey = "webkitHidden";
      visibilityChangeEvent = "webkitvisibilitychange";
    }

    document.addEventListener(visibilityChangeEvent, this._handleVisibilityChange.bind(this), false);
  }

  onVisibilityChange(listener) {
    this.listeners.push(listener);
  }

  offVisibilityChange(func) {
    this.listeners = this.listeners.filter(listener => {
      return listener !== func;
    });
  }

  _handleVisibilityChange() {
    this.listeners.forEach(listener => listener.call(null, !document[this.hiddenKey]));
  }
}

let pageVisibility;

try {
  pageVisibility = new PageVisibility();
} catch(err) {
  // fail silently if does not have document (webworker)
}

export default pageVisibility;
