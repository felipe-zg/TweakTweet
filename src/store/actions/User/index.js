export const iniciarUsuario = user => {
  return {
    type: 'INICIAR_DADOS_USUARIO',
    user,
  };
};

export const resetarUsuario = () => {
  return {
    type: 'RESETAR_USUARIO',
  };
};
