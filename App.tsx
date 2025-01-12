import React from 'react';
import HomeStack from './src/navigation/stack/HomeStack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
