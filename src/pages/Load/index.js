/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Lottie from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

// import { Container } from './styles';
import LoadingView from '../../styles/LoadingView';
import loadingAnimated from '../../animations/form_loading.json';
import {iniciarUsuario} from '../../store/actions/User';

export default function Load({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      dispatch(
        iniciarUsuario({
          nome: user.displayName,
          foto: user.photoURL,
          uId: user.uid,
        }),
      );
    }
    navigation.replace(user ? 'Home' : 'SignIn');
  });

  return (
    <LoadingView>
      <Lottie resizeMode="contain" source={loadingAnimated} autoPlay loop />
    </LoadingView>
  );
}
