export const iniciarPostsUsuario = posts => {
  return {
    type: 'INICIAR_POSTS_USUARIO',
    posts,
  };
};

export const deletarPostUsuario = id => {
  return {
    type: 'DELETAR_POST_USUARIO',
    id,
  };
};

export const atualizarPostUsuario = (id, newPost) => {
  return {
    type: 'ATUALIZAR_POST_USUARIO',
    id,
    newPost,
  };
};
