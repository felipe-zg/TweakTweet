import styled from 'styled-components/native';

const Texto = styled.Text`
  color: ${props => (props.color ? props.color : '#fff')};
  font-size: ${props => (props.size ? props.size : '14px')};
  font-weight: ${props => (props.weight ? props.weight : 'normal')};
`;

export default Texto;
