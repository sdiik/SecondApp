import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ObjectStackParamList } from './types';

import ObjectListScreen from '../../modules/objects/presentation/screen/ ObjectListScreen';
import CreateObjectScreen from '../../modules/objects/presentation/screen/CreateObjectScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<ObjectStackParamList>();

const ObjectNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ObjectList">
      <Stack.Screen name="ObjectList" component={TabNavigator} />
      <Stack.Screen name="CreateObject" component={CreateObjectScreen} />
      
    </Stack.Navigator>
  );
};

export default ObjectNavigator;
