import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { RootStackParamList } from './types';

import AuthNavigator from './AuthNavigator';
import ObjectNavigator from './ObjectNavigator';

import{ RootState } from '../../app/store/store';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogginIn);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <RootStack.Screen name="Object" component={ObjectNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
