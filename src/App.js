import React, { PureComponent } from 'react';
import GithubContainer from './components/GithubContainer';
import { AppShell, AppHeader } from '@satori-sdk/component-library';

//styles
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <AppShell>
        <AppHeader projectUrl="https://github.com/satori-com/gh-events" />
        <GithubContainer {...this.props} />
        <div className="overlay" />
      </AppShell>
    )
  }
}

export default App;
