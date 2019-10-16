import { Action } from '@ngrx/store';

export const GET_EXPRESSIONS = 'GET_EXPRESSIONS';
export const GET_EXPRESSIONS_SUCCESS = 'GET_EXPRESSIONS_SUCCESS';
export const GET_EXPRESSIONS_ERROR = 'GET_EXPRESSIONS_ERROR';
export const DELETE_EXPRESSION = 'DELETE_EXPRESSION';
export const DELETE_EXPRESSION_SUCCESS = 'DELETE_EXPRESSION_SUCCESS';
export const DELETE_EXPRESSION_ERROR = 'DELETE_EXPRESSION_ERROR';

export const START_LOADING_ACTIONS = [
  GET_EXPRESSIONS,
  DELETE_EXPRESSION
];

export const STOP_SPINNING_ACTIONS = [
  GET_EXPRESSIONS_SUCCESS,
  GET_EXPRESSIONS_ERROR,
  DELETE_EXPRESSION_SUCCESS,
  DELETE_EXPRESSION_ERROR
];

export class GetExpressions implements Action {
  readonly type = GET_EXPRESSIONS;
  readonly payload: object;
  constructor(categoria: String, item: String) {
    this.payload = {
      categoria: categoria,
      item: item
    };
  }
}

export class GetExpressionsSuccess implements Action {
  readonly type = GET_EXPRESSIONS_SUCCESS;
  readonly payload: object;
  constructor(expressions: Array<any>) {
    this.payload = {
      expressions: expressions
    };
  }
}

export class GetExpressionsError implements Action {
  readonly type = GET_EXPRESSIONS_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class DeleteExpression implements Action {
  readonly type = DELETE_EXPRESSION;
  readonly payload: object;
  constructor(idExpression: string, categoria: string, item: string) {
    this.payload = {
      idExpression: idExpression,
      categoria: categoria,
      item: item
    };
  }
}

export class DeleteExpressionSuccess implements Action {
  readonly type = DELETE_EXPRESSION_SUCCESS;
  readonly payload: object;
  constructor(categoria: string, item: string) {
    this.payload = {
      categoria: categoria,
      item: item
    };
  }
}

export class DeleteExpressionError implements Action {
  readonly type = DELETE_EXPRESSION_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export type Actions
  = GetExpressions
  | GetExpressionsSuccess
  | GetExpressionsError
  | DeleteExpression
  | DeleteExpressionSuccess
  | DeleteExpressionError;
