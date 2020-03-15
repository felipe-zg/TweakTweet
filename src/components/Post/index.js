import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Alert, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import Toast from 'react-native-root-toast';

import {
  deletarPostUsuario,
  atualizarPostUsuario,
} from '../../store/actions/Posts';
import Texto from '../../styles/Texto';
import {
  Container,
  Header,
  Foto,
  PostBody,
  Data,
  Acoes,
  Row,
  EditInput,
  Botao,
} from './styles';

export default function Post({navigation, post, ehAutor, editMode}) {
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState(post.texto);
  const [caracteres, setCaracteres] = useState(post.texto.length);

  function exibeMenu() {
    Alert.alert(
      'Menu',
      'Escolha a ação que deseja realizar',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('exclusão cancelada'),
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            confirmarExclusao();
          },
        },
        {
          text: 'Editar',
          onPress: () => {
            navigation.push('EditPost', {post});
          },
        },
      ],
      {cancelable: false},
    );
  }

  function confirmarExclusao() {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja deletar o post ?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('exclusão cancelada'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deletar();
          },
        },
      ],
      {cancelable: false},
    );
  }

  async function deletar() {
    database()
      .ref(`/posts/${post.id}`)
      .remove()
      .then(() => {
        dispatch(deletarPostUsuario(post.id));
      })
      .catch(e => Toast.show('Erro ao deletar'));
  }

  async function editar() {
    database()
      .ref(`/posts/${post.id}`)
      .child('texto')
      .set(newPost)
      .then(() => {
        dispatch(atualizarPostUsuario(post.id, newPost));
        Toast.show('POst editado com sucesso');
        navigation.goBack();
      })
      .catch(e => Toast.show('Erro ao editar'));
  }

  return (
    <Container>
      <Header>
        <Foto source={{uri: post.foto}} />
        <PostBody>
          <Row>
            <Texto color="#fff" weight="bold">
              {post.autor}
            </Texto>
            {ehAutor && !editMode && (
              <Acoes onPress={() => exibeMenu()}>
                <Icon name="keyboard-arrow-down" color="#fff" size={25} />
              </Acoes>
            )}
            {editMode && (
              <Botao onPress={editar}>
                <Texto>Salvar</Texto>
              </Botao>
            )}
          </Row>
          {!editMode && (
            <>
              <Texto color="#fff">{post.texto}</Texto>
              <Data>
                <Texto color="#fff" size="10px">
                  {post.data} às {post.hora}hrs
                </Texto>
              </Data>
            </>
          )}
        </PostBody>
      </Header>
      {editMode && (
        <KeyboardAvoidingView behavior="padding" enabled>
          <EditInput
            multiline={true}
            numberOfLines={2}
            maxLength={280}
            value={newPost}
            onChangeText={p => {
              setNewPost(p);
              setCaracteres(p.length);
            }}
            autoGrow={false}
          />
          <Texto size="10px" color="#fff">
            {caracteres} caracteres
          </Texto>
        </KeyboardAvoidingView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  formulario: {
    padding: 10,
  },
});
