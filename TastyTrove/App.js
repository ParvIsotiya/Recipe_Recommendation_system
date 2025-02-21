import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React, {memo, useCallback, FlatList} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import stacks from './src/route/stackNavigation';

export default function App() {
  const SharedStack = createStackNavigator();

  const Screen = () => {
    return (
      <SharedStack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{
          useNativeDriver: true,
          animationEnabled: true,
          gestureEnabled: false,
        }}>
        {stacks.map((item, index) => {
          return (
            <SharedStack.Screen
              key={index}
              name={item.Screen}
              component={item.component}
              options={item.Options}
            />
          );
        })}
      </SharedStack.Navigator>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={{colors: {background: '#2C2F38'}}}>
        <StatusBar
          backgroundColor={'#2C2F38'}
          animated
          barStyle={'light-content'}></StatusBar>

        <Screen />
      </NavigationContainer>
    </SafeAreaView>
  );
}
