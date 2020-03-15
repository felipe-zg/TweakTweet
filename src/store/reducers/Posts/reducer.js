import {produce} from 'immer';

export default function Posts(state = [], action) {
  switch (action.type) {
    case 'INICIAR_POSTS_USUARIO': {
      return action.posts;
    }
    case 'DELETAR_POST_USUARIO': {
      return produce(state, draft => {
        const postIndex = draft.findIndex(p => p.id === action.id);
        draft.splice(postIndex, 1);
      });
    }
    case 'ATUALIZAR_POST_USUARIO': {
      return produce(state, draft => {
        const postIndex = draft.findIndex(p => p.id === action.id);
        draft[postIndex].texto = action.newPost;
      });
    }
    default: {
      return state;
    }
  }
}
