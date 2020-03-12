import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Botao from '../../styles/Botao';
import Texto from '../../styles/Texto';
import {Container, ViewInput, Input, Cadastro} from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  function signin() {
    console.warn('logging in');
  }

  function signup() {
    console.warn('signing up');
  }
  return (
    <Container>
      <KeyboardAwareScrollView
        style={{backgroundColor: '#fff'}}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.formulario}
        scrollEnabled={false}>
        <ViewInput>
          <MIcon name="email" color="#fff" size={30} />
          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Endereço de e-mail"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={email => setEmail(email)}
          />
        </ViewInput>
        <ViewInput>
          <MIcon name="lock-open" color="#fff" size={30} />
          <Input
            secureTextEntry={secure}
            autoCapitalize="none"
            placeholder="Senha"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={password => setPassword(password)}
          />
        </ViewInput>
        <Botao color="#00f" onPress={() => signin()}>
          <Texto weight="bold">Entrar</Texto>
        </Botao>
        <Cadastro onPress={() => signup()}>
          <Texto color="#000">Cadastre-se</Texto>
        </Cadastro>
      </KeyboardAwareScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  formulario: {
    padding: 10,
  },
});
