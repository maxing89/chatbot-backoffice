import { Action } from '@ngrx/store';

export const CATEGORY_ADD = 'CATEGORY_ADD';
export const CATEGORY_ADD_SUCCESS = 'CATEGORY_ADD_SUCCESS';
export const CATEGORY_ADD_ERROR = 'CATEGORY_ADD_ERROR';

export const START_LOADING_ACTIONS = [
  CATEGORY_ADD
];

export const STOP_SPINNING_ACTIONS = [
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_ERROR
];

export class CategoryAdd implements Action {
  readonly type = CATEGORY_ADD;
  readonly payload: object;
  constructor(nombre: string, descripcion: string) {
    this.payload = {
      nombre: nombre,
      descripcion: descripcion
    };
  }
}

export class CategoryAddSuccess implements Action {
  readonly type = CATEGORY_ADD_SUCCESS;
  readonly payload: object;
  constructor(categoria: any) {
    this.payload = {
      categoria: categoria
    };
  }
}

export class CategoryAddError implements Action {
  readonly type = CATEGORY_ADD_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export type Actions
  = CategoryAdd
  | CategoryAddSuccess
  | CategoryAddError;
