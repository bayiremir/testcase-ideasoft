import React from 'react';
import HomeStack from './src/navigation/stack/HomeStack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {CustomModalProvider} from './src/components/other_components/Modal/CustomModal/CustomModalProvider';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <CustomModalProvider>
          <HomeStack />
        </CustomModalProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
