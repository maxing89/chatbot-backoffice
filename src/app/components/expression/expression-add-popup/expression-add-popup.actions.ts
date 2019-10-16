import { Action } from '@ngrx/store';

export const EXPRESSION_ADD = 'EXPRESSION_ADD';
export const EXPRESSION_ADD_SUCCESS = 'EXPRESSION_ADD_SUCCESS';
export const EXPRESSION_ADD_ERROR = 'EXPRESSION_ADD_ERROR';
export const EXPRESSION_ADD_FINISHES = 'EXPRESSION_ADD_FINISHES';

export const START_LOADING_ACTIONS = [
  EXPRESSION_ADD
];

export const STOP_SPINNING_ACTIONS = [
  EXPRESSION_ADD_ERROR,
  EXPRESSION_ADD_FINISHES,
];

export class ExpressionAdd implements Action {
  readonly type = EXPRESSION_ADD;
  readonly payload: object;
  constructor(expressions: Array<any>, categoria: string, item: string) {
    this.payload = {
      expressions: expressions,
      categoria: categoria,
      item: item
    };
  }
}

export class ExpressionAddSuccess implements Action {
  readonly type = EXPRESSION_ADD_SUCCESS;
  readonly payload: object;
  constructor() {

  }
}

export class ExpressionAddError implements Action {
  readonly type = EXPRESSION_ADD_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class ExpressionAddFinishes implements Action {
  readonly type = EXPRESSION_ADD_FINISHES;
  readonly payload: object;
  constructor(categoria: string, item: string) {
    this.payload = {
      categoria: categoria,
      item: item
    };
  }
}

export type Actions
  = ExpressionAdd
  | ExpressionAddSuccess
  | ExpressionAddError
  | ExpressionAddFinishes;
