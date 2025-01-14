import {StyleSheet, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';

const TestCaseScreen = () => {
  return (
    <View style={styles.container}>
      <GoBackTabBar add={false} category={false} title="" />
      <WebView
        showsVerticalScrollIndicator={false}
        source={{
          uri: 'https://testcase.myideasoft.com/',
        }}
      />
    </View>
  );
};

export default TestCaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
});
