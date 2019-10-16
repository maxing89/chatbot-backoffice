import * as actions from './item.actions';

import { Item, ItemInitValue, Synonym, SynonymInitValue } from './item.models';

/* Subreducers imports */
import * as itemAddReducer from './item-add-popup/item-add-popup.reducer';

export interface State {
  items: Array<Item>;
  itemsError: string;
  item: Item;
  itemError: string;
  synonyms: Array<Synonym>;
  synonymsError: string;
}

export const initialState: State = {
  items: [ItemInitValue],
  itemsError: null,
  item: ItemInitValue,
  itemError: null,
  synonyms: [SynonymInitValue],
  synonymsError: null
};

export function reducer(state = initialState, action): State {
  /* Subreducers call */
  state = itemAddReducer.reducer(state, action);

  function buildItems(items: Array<any>) {
    let itemsResult: Array<Item> = [];
    items.map(item => {
      itemsResult = itemsResult.concat([
        {
          id: item.id,
          description: item.description,
          synonyms: buildSynonyms(item.synonyms)
        }
      ]);
    });
    return itemsResult;
  }

  function buildSynonyms(synonymsArray: Array<any>) {
    let resultArray: Array<Synonym> = [];
    synonymsArray.map((synonym, index) => {
      resultArray = resultArray.concat([
        {
          value: synonym.id,
          display: synonym.id,
          parent: synonym.parent_id
        }
      ]);
    });
    return resultArray;
  }

  switch (action.type) {
    case actions.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: buildItems(action.payload.items)
      };
    case actions.GET_ITEMS_ERROR:
      return {
        ...state,
        itemsError: action.payload.error
      };
    case actions.GET_SYNONYMS_ERROR:
      return {
        ...state,
        synonymsError: action.payload.error
      };
    default:
      return state;
  }
}

export const getItems = (state: State) => state.items;
export const getItemsError = (state: State) => state.itemsError;
export const getItem = (state: State) => state.item;
export const getItemError = (state: State) => state.itemError;
export const getSynonyms = (state: State) => state.synonyms;
export const getSynonymsError = (state: State) => state.synonymsError;
