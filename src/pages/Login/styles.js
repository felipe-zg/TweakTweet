import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ViewInput = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  background-color: rgba(1, 1, 1, 0.6);
  padding: 8px 25px;
  margin: 10px 0;
`;

export const Input = styled.TextInput`
  margin-left: 10px;
  width: 85%;
  color: #fff;
`;

export const Cadastro = styled.TouchableOpacity`
  align-self: center;
  justify-content: center;
  margin-top: 30px;
`;
