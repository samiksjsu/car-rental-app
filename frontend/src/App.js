import React from 'react';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import './App.css';

const store = configureStore()

const App = (props) => {
  return (

    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
