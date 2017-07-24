# Satori powered Github Events Demo

![Satori Image](public/satori-logo-banner.jpg)


Satori provides an API that sends data between apps at high speed. The API uses a publish/subscribe model: Apps *publish* data of any type to a *channel*, and
other apps *subscribe* to that channel and retrieve data from it. The API, based on WebSocket, transfers any amount of data with almost no delay.

The Github events demo app displays live data that represents events occurring on the GitHub repository site. As events occur, the app displays them as dots on the screen. The most recent events appear at the right, and flow to the left to indicate the change in events over time.
The different colors represent different types of events. For example, yellow represents pull requests, and turquoise represents issue comments.

The left-hand column summarizes the live data:

* At the top, the **Github events** counter shows the total number of events that have occurred since you navigated to the page.
* Below this counter is a search box that lets you display events for a particular repository.
* The color legend shows the color of each event in the live data stream and the type of event it represents. The legend also displays counts of events by type.
* In the lower right-hand corner of the screen is the **See the code** button, which lets you see the messages in the live data stream as they arrive.

Run the online demo in your browser, or get the demo app and run it locally. THe next section shows you how to run the online demo. To learn how to run a local demo, see the section "Run the demo locally".

# Run the online demo

1. Navigate to the [GitHub events site](https://gh.satori.com) to see the main page of the demo.
2. To search for the events for a particular GitHub repository, enter its name in the search box and press **Enter**.
3. To clear the search, click the **x** icon at the right of the search box.
4. To see the names of repositories that are generating a particular event type, click an event type to open the event type page.
5. On the event type page, you see a list of repositories. The event type appears at the top of the list. The display shows the events of that type.
6. To return to the main page, click the left arrow next to the event type.
7. To see the messages in the live data stream, click **See the code** in the lower right-hand corner of the main page. A small window appears, showing a stream of messages in JSON format.
8. To close the message window, click **See the code** again.

# Run the demo locally
You can run the demo locally, using source files you get from GitHub. They include the app, Satori libraries, and a local app server.

## Prerequisites
To run the local demo, you need the following:

* A computer that supports Node.js.
* Node.js version 6.0.0 or later

Ensure that the Node package manager `npm` is available.

Everything else you need is included in the GitHub clone, or it is installed using `npm` after you have the code.

## Get credentials from Satori
Set up a Satori account and get the appkey, endpoint, and channel name for the app.

1. Log in or sign up for a Satori account at [https://developer.satori.com](https://developer.satori.com).
2. Navigate to the [Satori GitHub.com public events page](https://www.satori.com/channels/github-events) page.
3. In the **Getting Started** section, copy the following values for your demo app:
    * **Appkey**
    * **Endpoint**
    * **Channel Name**
4. Save this information. You add it to a configuration file after you get the demo code.

## Get the demo code
The demo source is available from a public GitHub repository. The demo is based on React, using the [Create React App](https://github.com/facebookincubator/create-react-app) framework. As a result, you have access to all the tools provided by `react-scripts`.

To use the code, clone it from GitHub, build it, and run it.

**Note:** The [Create React App documentation](https://github.com/facebookincubator/create-react-app/blob/master/README.md) describes the framework in more detail. To learn more about creating Satori projects for your own apps, see the [Dev Portal tutorial](https://www.satori.com/docs/tutorials/tutorial-steps-devportal).

1. Clone the demo source files from GitHub:

```
git clone git@github.com:satori-com/github-events.git
cd github-events
```

2. Build the code
```
npm install
```

3. In `github-events`, edit `.env`, then add the `appkey`, `endpoint`, and `channel-names` values you copied previously:

```
REACT_APP_ENDPOINT='<endpoint_value>'
REACT_APP_APPKEY='<appkey_value>'
REACT_APP_CHANNEL='<channel_name_value>'
```

## Run the app server
```
npm run start
```

This starts the local server, which uses port 3000 (https://localhost:3000).

The local server displays the live data coming from GitHub.

# App architecture

# Other demo apps
Satori has a suite of demo apps that show you how to work with live data:

* [Satori Motion Demo](https://github.com/satori-com/motion) sends live movement data from mobile devices to other mobile and computer clients.
* [Satori Chat Demo](https://github.com/satori-com/chat) is a chat app that works on computers and mobile devices. It includes a streambot that answers simple weather questions from NOAA live data.
* [Satori Paint Demo](https://github.com/satori-com/paint) is a multi-user live data whiteboard.
* [Satori Fitness Demo](https://github.com/satori-com/fitness) shares live fitness data from a user's Apple Watch to a connected iPhone. The iPhone can share the live data with other iPhones that are running the app.

# Next steps
This demo shows you a simple app that shares a whiteboard among users. Try extending this application to include more complex drawing tools or more colors. You may embed this app in your other projects or the other demo projects we provide.

# Further reading
* [Satori Developer Documentation](https://www.satori.com/docs/introduction/new-to-satori): Documentation for the entire Satori Live Data Ecosystem
* [Satori JavaScript SDK](https://github.com/satori-com/satori-rtm-sdk-js): The Satori JavaScript API and developer tools
* [Satori JavaScript tutorial](https://www.satori.com/docs/tutorials/javascript-tutorial)):  Tutorial that shows you how to write JavaScript apps that use the RTM SDK and the [Satori Live Messaging](https://www.satori.com/docs/using-satori/rtm-api) platform.
