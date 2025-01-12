import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Lottie = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../../assets/lottie/loading.json')}
        autoPlay
        loop
        style={{width: 100, height: 100}}
      />
    </View>
  );
};

export default Lottie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
