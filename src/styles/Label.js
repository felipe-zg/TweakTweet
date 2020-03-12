import styled from 'styled-components/native';

const Label = styled.Text`
  font-size: ${props => (props.size ? props.size : '13px')};
  color: ${props => (props.color ? props.color : '#fff')};
  font-weight: bold;
`;

export default Label;
