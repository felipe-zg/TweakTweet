import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';

import loadingAnimated from '../../animations/form_loading.json';
import Botao from '../../styles/Botao';
import Texto from '../../styles/Texto';
import Input from '../../styles/input';
import LoadingView from '../../styles/LoadingView';
import ViewInput from '../../styles/ViewInput';
import Container from '../../styles/Container';
import {Cadastro} from './styles';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputs = [];

  function focusField(index) {
    inputs[index].focus();
  }

  function toggleSenha() {
    setSecure(!secure);
  }

  async function signin() {
    try {
      setIsLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Load');
      setIsLoading(false);
    } catch (e) {
      Toast.show('E-mail ou senha incorretos');
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <LoadingView>
        <Lottie resizeMode="contain" source={loadingAnimated} autoPlay loop />
      </LoadingView>
    );
  }
  return (
    <Container>
      <KeyboardAwareScrollView
        style={{backgroundColor: 'rgb(21, 32, 43)'}}
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
            returnKeyType="next"
            onSubmitEditing={() => {
              focusField('password');
            }}
            blurOnSubmit={false}
          />
        </ViewInput>
        <ViewInput>
          <TouchableOpacity onPress={toggleSenha}>
            <MIcon
              name={secure ? 'lock-outline' : 'lock-open'}
              color="#fff"
              size={30}
            />
          </TouchableOpacity>
          <Input
            secureTextEntry={secure}
            autoCapitalize="none"
            placeholder="Senha"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={password => setPassword(password)}
            ref={input => {
              inputs.password = input;
            }}
            returnKeyType="send"
            onSubmitEditing={signin}
          />
        </ViewInput>
        <Botao color="#2510a3" onPress={() => signin()}>
          <Texto weight="bold">Entrar</Texto>
        </Botao>
        <Cadastro onPress={() => navigation.replace('SignUp')}>
          <Texto color="#fff">Cadastre-se</Texto>
        </Cadastro>
      </KeyboardAwareScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  formulario: {
    padding: 10,
    marginTop: 20,
  },
});
