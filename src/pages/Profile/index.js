import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';

import {iniciarPostsUsuario} from '../../store/actions/Posts';
import Post from '../../components/Post';
import Container from '../../styles/Container';
import LoadingView from '../../styles/LoadingView';
import Texto from '../../styles/Texto';
import loadingAnimated from '../../animations/form_loading.json';
import sadAnimation from '../../animations/sad.json';
import {Animacao} from './styles';

export default function Profile({navigation}) {
  const user = useSelector(state => state.User);
  const posts = useSelector(state => state.Posts);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  function onSnapshot(snapshot) {
    const list = [];

    snapshot.forEach(post => {
      list.push({
        ...post.toJSON(),
      });
    });

    dispatch(iniciarPostsUsuario(list));
    setLoading(false);
  }

  useEffect(() => {
    if (user != null) {
      const ref = database().ref('/posts');
      ref
        .orderByChild('uId')
        .equalTo(user.uId)
        .once('value', onSnapshot);
    }
  });

  if (loading) {
    return (
      <LoadingView>
        <Lottie resizeMode="contain" source={loadingAnimated} autoPlay loop />
      </LoadingView>
    );
  }

  if (posts.length < 1) {
    return (
      <LoadingView>
        <Animacao>
          <Lottie resizeMode="contain" source={sadAnimation} autoPlay loop />
        </Animacao>
        <Texto>Você não possui nenhum post</Texto>
      </LoadingView>
    );
  }

  return (
    <Container>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Post navigation={navigation} post={item} ehAutor={true} />
        )}
      />
    </Container>
  );
}
