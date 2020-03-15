import React, {useState, useEffect} from 'react';
import {Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';

import Container from '../../styles/Container';
import LoadingView from '../../styles/LoadingView';
import Header from '../../components/HeaderHome';
import Post from '../../components/Post';
import loadingAnimated from '../../animations/form_loading.json';

export default function Home({navigation}) {
  const user = useSelector(state => state.User);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user != null) {
      loadPosts();
    } else {
      navigation.replace('SignIn');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function onSnapshot(snapshot) {
    const list = [];

    snapshot.forEach(post => {
      const postagem = post.toJSON();
      if (postagem.uId !== user.uId) {
        list.push({
          ...postagem,
        });
      }
    });

    setPosts(list);
    setLoading(false);
  }

  async function loadPosts() {
    const ref = database().ref('/posts');
    await ref.once('value', onSnapshot);
  }

  function refreshPosts() {
    setIsRefreshing(true);
    loadPosts().then(() => setIsRefreshing(false));
  }

  if (loading || user == null) {
    return (
      <LoadingView>
        <Lottie resizeMode="contain" source={loadingAnimated} autoPlay loop />
      </LoadingView>
    );
  }

  return (
    <Container>
      <Header navigation={navigation} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Post post={item} ehAutor={false} />}
        onRefresh={refreshPosts}
        refreshing={isRefreshing}
      />
    </Container>
  );
}
