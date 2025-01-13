import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
const CategoryScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Kategori</Text>
      </View>
      <RNPickerSelect
        onValueChange={value => console.log(value)}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      />
    </SafeAreaView>
  );
};

export default CategoryScreen;
