import styled from 'styled-components/native';

const Botao = styled.TouchableOpacity`
  margin-top: 30px;
  padding: 15px;
  border-radius: 25px;
  overflow: hidden;
  background-color: ${props => (props.color ? props.color : '#ddd')};
  align-items: center;
`;

export default Botao;
