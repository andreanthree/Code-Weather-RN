/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';

import store from './app/redux/configureStore';
import Route from './app/routes/route';
class App extends Component {

  render() {
    return (
      <Provider store={store()}>
        <Route />
      </Provider>
    );
  }
}

export default App;
