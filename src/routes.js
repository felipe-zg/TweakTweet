import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import Botao from './styles/BotaoHeader';
import Texto from './styles/Texto';

import Load from '../src/pages/Load';
import Home from '../src/pages/Home';
import SignIn from '../src/pages/Login';
import SignUp from '../src/pages/SignUp';
import Profile from '../src/pages/Profile';
import EditPost from '../src/pages/EditPost';
import Login from '../src/pages/Login';
import {resetarUsuario} from './store/actions/User';

const Stack = createStackNavigator();

export default function Routes() {
  const dispatch = useDispatch();
  function LogOut(navigation) {
    auth().signOut();
    dispatch(resetarUsuario());
    navigation.goBack();
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Load"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(21, 32, 43)',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 1,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'O Boticario'}}
        />
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
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({navigation}) => ({
            title: 'Perfil',
            headerRight: () => (
              <Botao onPress={() => LogOut(navigation)}>
                <Texto>Sair</Texto>
              </Botao>
            ),
          })}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{title: 'Editar'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
