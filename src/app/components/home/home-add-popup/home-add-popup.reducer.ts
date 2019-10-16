import { State, initialState } from '../home.reducer';

/* Actions imports */
import * as actions from './home-add-popup.actions';

export function reducer(state = initialState, action): State {

  switch (action.type) {
    /* Home actions */
    case actions.CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        categoria: action.payload.categoria
      };
    case actions.CATEGORY_ADD_ERROR:
      return {
        ...state,
        categoriaError: action.payload.error
      };

    default:
      return state;
  }
}
