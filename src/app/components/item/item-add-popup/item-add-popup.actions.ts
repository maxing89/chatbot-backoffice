import { Action } from '@ngrx/store';

export const ITEM_ADD = 'ITEM_ADD';
export const ITEM_ADD_SUCCESS = 'ITEM_ADD_SUCCESS';
export const ITEM_ADD_ERROR = 'ITEM_ADD_ERROR';

export const START_LOADING_ACTIONS = [
  ITEM_ADD
];

export const STOP_SPINNING_ACTIONS = [
  ITEM_ADD_SUCCESS,
  ITEM_ADD_ERROR
];

export class ItemAdd implements Action {
  readonly type = ITEM_ADD;
  readonly payload: object;
  constructor(nombre: string, descripcion: string, categoria: string) {
    this.payload = {
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria
    };
  }
}

export class ItemAddSuccess implements Action {
  readonly type = ITEM_ADD_SUCCESS;
  readonly payload: object;
  constructor(item: any, categoria: string) {
    this.payload = {
      item: item,
      categoria: categoria
    };
  }
}

export class ItemAddError implements Action {
  readonly type = ITEM_ADD_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export type Actions
  = ItemAdd
  | ItemAddSuccess
  | ItemAddError;
