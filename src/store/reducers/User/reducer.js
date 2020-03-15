import {produce} from 'immer';

export default function User(state = null, action) {
  switch (action.type) {
    case 'INICIAR_DADOS_USUARIO': {
      return action.user;
    }
    case 'RESETAR_USUARIO': {
      return null;
    }
    default: {
      return state;
    }
  }
}
