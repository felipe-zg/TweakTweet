import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import { Container } from './styles';

import Home from '../src/pages/Home';
import SignIn from '../src/pages/Login';
import SignUp from '../src/pages/SignUp';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" headerMode="none">
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: 'Entrar'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Cadastrar'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
