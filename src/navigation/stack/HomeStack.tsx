import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/core/HomeScreen';
import CategoryScreen from '../../screens/tabs/CategoryScreen';
import ProductScreen from '../../screens/tabs/ProductScreen';
import ProductForm from '../../components/products/ProductForm';
import ProductAddScreen from '../../screens/other/ProductAddScreen';
import CategoryAddScreen from '../../screens/other/CategoryAddScreen';
import CategoryForm from '../../components/categories/CategoryForm';
import TestCaseScreen from '../../screens/tabs/TestCaseScreen';
import CategoryEditScreen from '../../screens/other/CategoryEditScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="TestCaseScreen" component={TestCaseScreen} />
      <Stack.Screen name="ProductForm" component={ProductForm} />
      <Stack.Screen name="ProductAddScreen" component={ProductAddScreen} />
      <Stack.Screen name="CategoryAddScreen" component={CategoryAddScreen} />
      <Stack.Screen name="CategoryEditScreen" component={CategoryEditScreen} />
      <Stack.Screen name="CategoryForm" component={CategoryForm} />
    </Stack.Navigator>
  );
};

export default HomeStack;
