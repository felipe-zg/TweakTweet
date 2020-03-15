import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #ddd;
`;

export const Foto = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export const InputPost = styled.TextInput.attrs({
  textAlignVertical: 'top',
})`
  border: 1px solid #ddd;
  border-radius: 50px;
  width: 80%;
  margin: 10px 10px 0px 0;
  padding: 10px;
  color: #fff;
`;

export const TouchFoto = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin: 10px;
`;
