import React from 'react';
import {View} from 'react-native';

import Post from '../../components/Post';
import Container from '../../styles/Container';
// import { Container } from './styles';

export default function EditPost({route, navigation}) {
  const {post} = route.params;
  return (
    <Container>
      <Post navigation={navigation} post={post} editMode={true} />
    </Container>
  );
}
