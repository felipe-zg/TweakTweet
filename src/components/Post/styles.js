import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 5px;
  border-bottom-width: 1px;
  border-color: #ddd;
  border-style: solid;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 2px;
`;

export const Foto = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin: 2px;
  align-self: flex-start;
`;

export const PostBody = styled.View`
  padding: 2px;
  width: 90%;
`;

export const Data = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 2px;
  justify-content: flex-end;
  width: 95%;
`;
export const Acoes = styled.TouchableOpacity`
  padding: 1px 4px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const EditInput = styled.TextInput.attrs({
  textAlignVertical: 'top',
})`
  height: 80%;
  margin: 2px;
  font-size: 16px;
  color: #fff;
`;

export const Botao = styled.TouchableOpacity`
  margin-right: 10px;
  background-color: #2510a3;
  border-radius: 5px;
  padding: 5px;
`;
