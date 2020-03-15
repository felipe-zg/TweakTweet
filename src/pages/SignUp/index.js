import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';
import validator from 'email-validator';

import loadingAnimated from '../../animations/form_loading.json';
import fotoPerfil from '../../assets/perfil.png';
import Botao from '../../styles/Botao';
import Texto from '../../styles/Texto';
import Input from '../../styles/input';
import LoadingView from '../../styles/LoadingView';
import ViewInput from '../../styles/ViewInput';
import Container from '../../styles/Container';
import {Header, TouchFoto, Foto} from './styles';

export default function SignUp({navigation}) {
  const [foto, setFoto] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputs = [];

  function focusField(index) {
    inputs[index].focus();
  }

  function toggleSenha() {
    setSecure(!secure);
  }

  function senhasSaoIuais() {
    return password === confirmPassword;
  }

  function adicionaFoto() {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        let source = response;
        setFoto(source);
      }
    });
  }

  async function salvaFoto(uId, filePath) {
    const storageRef = storage().ref('fotos');
    const caminhoFinal = storageRef.child(uId + '/fotoPerfil.jpg');
    await caminhoFinal.putFile(filePath);
  }

  async function getUrlFoto(uId) {
    const storageRef = storage().ref('fotos/' + uId + '/fotoPerfil.jpg');
    try {
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (err) {
      console.log(err);
    }
  }

  function formEhValido() {
    if (nome === '' || email === '' || password === '') {
      Toast.show('Todos os campos são obrigatórios');
      return false;
    }
    if (!validator.validate(email)) {
      Toast.show('O e-mail é inválido');
      return false;
    }
    if (!senhasSaoIuais()) {
      Toast.show('As senhas são diferentes');
      return false;
    }
    if (password.length < 7) {
      Toast.show('A senha precisa ter no mínimo 7 caracteres');
      return false;
    }
    if (foto == null) {
      Toast.show('Adicione sua foto de perfil');
      return false;
    }

    return true;
  }

  async function signUp() {
    if (!formEhValido()) {
      return;
    }
    setIsLoading(true);
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          const user = auth().currentUser;
          await salvaFoto(user.uid, foto.path);
          const downloadUrl = await getUrlFoto(user.uid);
          await user.updateProfile({
            displayName: nome,
            photoURL: downloadUrl,
          });
          navigation.replace('Load');
          setIsLoading(false);
        })
        .catch(e => {
          if (e.code === 'auth/email-already-in-use') {
            Toast.show('Esse e-mail já está sendo usado por outro usuário');
          }
          setIsLoading(false);
        });
    } catch (e) {
      setIsLoading(false);
      Toast.show('Erro ao realizar cadastro');
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
        <Header>
          <TouchFoto onPress={() => adicionaFoto()}>
            {foto !== null && <Foto source={{uri: foto.uri}} />}
            {foto === null && <Foto source={fotoPerfil} />}
          </TouchFoto>
        </Header>
        <ViewInput>
          <MIcon name="person" color="#fff" size={30} />
          <Input
            autoCapitalize="words"
            placeholder="Nome completo"
            placeholderTextColor="#fff"
            value={nome}
            onChangeText={nome => setNome(nome)}
            returnKeyType="next"
            onSubmitEditing={() => {
              focusField('email');
            }}
            blurOnSubmit={false}
          />
        </ViewInput>
        <ViewInput>
          <MIcon name="email" color="#fff" size={30} />
          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Endereço de e-mail"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={email => setEmail(email)}
            ref={input => {
              inputs.email = input;
            }}
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
            onSubmitEditing={() => {
              focusField('confirmPassword');
            }}
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
            placeholder="confirme sua senha"
            placeholderTextColor="#fff"
            value={confirmPassword}
            onChangeText={confirmation => setConfirmPassword(confirmation)}
            ref={input => {
              inputs.confirmPassword = input;
            }}
            returnKeyType="send"
            onSubmitEditing={signUp}
          />
        </ViewInput>
        <Botao color="#2510a3" onPress={() => signUp()}>
          <Texto weight="bold">Cadastrar</Texto>
        </Botao>
      </KeyboardAwareScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  formulario: {
    padding: 10,
  },
});
