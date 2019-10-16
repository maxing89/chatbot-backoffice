import { State, initialState } from '../item.reducer';

/* Actions imports */
import * as actions from './item-add-popup.actions';

export function reducer(state = initialState, action): State {

  switch (action.type) {
    /* Item actions */
    case actions.ITEM_ADD_SUCCESS:
      return {
        ...state,
        item: action.payload.item
      };
    case actions.ITEM_ADD_ERROR:
      return {
        ...state,
        itemError: action.payload.error
      };

    default:
      return state;
  }
}
