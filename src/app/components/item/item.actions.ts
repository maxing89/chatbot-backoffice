import { Action } from '@ngrx/store';
import { Item, ItemInitValue, Synonym, SynonymInitValue } from './item.models';

export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';
export const GET_SYNONYMS = 'GET_SYNONYMS';
export const GET_SYNONYMS_SUCCESS = 'GET_SYNONYMS_SUCCESS';
export const GET_SYNONYMS_ERROR = 'GET_SYNONYMS_ERROR';
export const ADD_SYNONYM = 'ADD_SYNONYM';
export const ADD_SYNONYM_SUCCESS = 'ADD_SYNONYM_SUCCESS';
export const ADD_SYNONYM_ERROR = 'ADD_SYNONYM_ERROR';
export const DELETE_SYNONYM = 'DELETE_SYNONYM';
export const DELETE_SYNONYM_SUCCESS = 'DELETE_SYNONYM_SUCCESS';
export const DELETE_SYNONYM_ERROR = 'DELETE_SYNONYM_ERROR';

export const START_LOADING_ACTIONS = [
  GET_ITEMS,
  DELETE_ITEM,
  ADD_SYNONYM,
  DELETE_SYNONYM
];

export const STOP_SPINNING_ACTIONS = [
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
  ADD_SYNONYM_SUCCESS,
  ADD_SYNONYM_ERROR,
  DELETE_SYNONYM_SUCCESS,
  DELETE_SYNONYM_ERROR
];

export class GetItems implements Action {
  readonly type = GET_ITEMS;
  readonly payload: object;
  constructor(categoria: String) {
    this.payload = {
      categoria: categoria
    };
  }
}

export class GetItemsSuccess implements Action {
  readonly type = GET_ITEMS_SUCCESS;
  readonly payload: object;
  constructor(items: Array<Item>) {
    this.payload = {
      items: items
    };
  }
}

export class GetItemsError implements Action {
  readonly type = GET_ITEMS_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;
  readonly payload: object;
  constructor(idItem: string, categoria: string) {
    this.payload = {
      idItem: idItem,
      categoria: categoria
    };
  }
}

export class DeleteItemSuccess implements Action {
  readonly type = DELETE_ITEM_SUCCESS;
  readonly payload: object;
  constructor(categoria: string) {
    this.payload = {
      categoria: categoria
    };
  }
}

export class DeleteItemError implements Action {
  readonly type = DELETE_ITEM_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class GetSynonyms implements Action {
  readonly type = GET_SYNONYMS;
  readonly payload: object;
  constructor(categoria: string, items: Array<Item>) {
    this.payload = {
      categoria: categoria,
      items: items
    };
  }
}

export class GetSynonymsSuccess implements Action {
  readonly type = GET_SYNONYMS_SUCCESS;
  readonly payload: object;
  constructor(synonyms: Array<Synonym>, items: Array<Item>) {
    this.payload = {
      synonyms: synonyms,
      items: items
    };
  }
}

export class GetSynonymsError implements Action {
  readonly type = GET_SYNONYMS_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class AddSynonym implements Action {
  readonly type = ADD_SYNONYM;
  readonly payload: object;
  constructor(categoria: string, item: string, synonym: string) {
    this.payload = {
      categoria: categoria,
      item: item,
      synonym: synonym
    };
  }
}

export class AddSynonymSuccess implements Action {
  readonly type = ADD_SYNONYM_SUCCESS;
  readonly payload: object;
  constructor() {}
}

export class AddSynonymError implements Action {
  readonly type = ADD_SYNONYM_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class DeleteSynonym implements Action {
  readonly type = DELETE_SYNONYM;
  readonly payload: object;
  constructor(categoria: string, item: string, sinonimo: string) {
    this.payload = {
      categoria: categoria,
      item: item,
      sinonimo: sinonimo
    };
  }
}

export class DeleteSynonymSuccess implements Action {
  readonly type = DELETE_SYNONYM_SUCCESS;
  readonly payload: object;
  constructor() {}
}

export class DeleteSynonymError implements Action {
  readonly type = DELETE_SYNONYM_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export type Actions
  = GetItems
  | GetItemsSuccess
  | GetItemsError
  | DeleteItem
  | DeleteItemSuccess
  | DeleteItemError
  | GetSynonyms
  | GetSynonymsSuccess
  | GetSynonymsError
  | AddSynonym
  | AddSynonymSuccess
  | AddSynonymError
  | DeleteSynonym
  | DeleteSynonymSuccess
  | DeleteSynonymError;
