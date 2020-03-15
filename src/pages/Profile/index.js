import React, {useEffect, useState} from 'react';
import {Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';

import {iniciarPostsUsuario} from '../../store/actions/Posts';
import Post from '../../components/Post';
import Container from '../../styles/Container';
import LoadingView from '../../styles/LoadingView';
import loadingAnimated from '../../animations/form_loading.json';

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
