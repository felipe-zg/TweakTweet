import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Toast from 'react-native-root-toast';
import Lottie from 'lottie-react-native';

import {Header, TouchFoto, Foto, InputPost} from './styles';
import loadingAnimated from '../../animations/form_loading.json';

export default function HeaderHome({navigation}) {
  const [post, setPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.User);

  function getPostDate() {
    var now = new Date();
    const postDate = {
      date: `${now.getDate()}/${now.getMonth() + 1}`,
      time: `${now.getHours()}:${now.getMinutes()}`,
    };
    return postDate;
  }

  async function postar() {
    setIsLoading(true);
    const postDate = getPostDate();
    const ref = database().ref('/posts/');
    const key = await ref.push().key;

    let postagem = {
      id: key,
      uId: user.uId,
      autor: user.nome,
      foto: user.foto,
      data: postDate.date,
      hora: postDate.time,
      texto: post,
    };
    await ref
      .child(key)
      .set(postagem)
      .then(() => {
        Toast.show('Post publicado com sucesso');
      })
      .catch(e => {
        Toast.show('Ocorreu um erro ao publicar');
      });
    setPost('');
    setIsLoading(false);
  }

  return (
    <Header>
      <TouchFoto onPress={() => navigation.push('Profile')}>
        <Foto source={{uri: user.foto}} />
      </TouchFoto>
      {isLoading && (
        <Lottie resizeMode="contain" source={loadingAnimated} autoPlay loop />
      )}
      {!isLoading && (
        <InputPost
          placeholder="Qual é a boa de hoje ?"
          placeholderTextColor="#fff"
          multiline={true}
          numberOfLines={2}
          maxLength={280}
          value={post}
          onChangeText={p => {
            setPost(p);
            if (p.length === 280) {
              Toast.show('Você atingiu os 280 caracteres permitidos');
            }
          }}
          autoGrow={false}
          returnKeyType="send"
          blurOnSubmit={true}
          onSubmitEditing={postar}
        />
      )}
    </Header>
  );
}
