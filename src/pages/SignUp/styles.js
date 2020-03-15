import styled from 'styled-components/native';

export const Header = styled.View`
  border-bottom-width: 1px;
  border-color: #ddd;
  border-style: solid;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

export const TouchFoto = styled.TouchableOpacity`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border: 1px solid #fff;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const Foto = styled.Image.attrs({
  resizeMode: 'cover',
})`
  align-self: stretch;
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;
