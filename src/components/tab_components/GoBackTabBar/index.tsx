import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ChevronLeftIcon as ChevronLeftIconOutline} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const GoBackTabBar = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <ChevronLeftIconOutline color="black" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoBackTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingTop: 50,
    marginVertical: 10,
  },
});
