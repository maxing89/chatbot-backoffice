import { State, initialState } from '../expression.reducer';

/* Actions imports */
import * as actions from './expression-add-popup.actions';

export function reducer(state = initialState, action): State {

  switch (action.type) {
    /* Expression actions */
    case actions.EXPRESSION_ADD_ERROR:
      return {
        ...state,
        expressionError: action.payload.error
      };

    default:
      return state;
  }
}
