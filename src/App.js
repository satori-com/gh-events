import React, { PureComponent } from 'react';
import GithubContainer from './components/GithubContainer';

//styles
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <GithubContainer {...this.props} />
        <div className="overlay" />
      </div>
    )
  }
}

export default App;
