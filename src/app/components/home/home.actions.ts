import { Action } from '@ngrx/store';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR';

export const START_LOADING_ACTIONS = [
  GET_CATEGORIES,
  DELETE_CATEGORY
];

export const STOP_SPINNING_ACTIONS = [
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR
];

export class GetCategories implements Action {
  readonly type = GET_CATEGORIES;
  readonly payload: object;
  constructor() {}
}

export class GetCategoriesSuccess implements Action {
  readonly type = GET_CATEGORIES_SUCCESS;
  readonly payload: object;
  constructor(categorias: Array<any>) {
    this.payload = {
      categorias: categorias
    };
  }
}

export class GetCategoriesError implements Action {
  readonly type = GET_CATEGORIES_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class DeleteCategory implements Action {
  readonly type = DELETE_CATEGORY;
  readonly payload: object;
  constructor(idCategory: string) {
    this.payload = {
      idCategory: idCategory
    };
  }
}

export class DeleteCategorySuccess implements Action {
  readonly type = DELETE_CATEGORY_SUCCESS;
  readonly payload: object;
  constructor() {}
}

export class DeleteCategoryError implements Action {
  readonly type = DELETE_CATEGORY_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export type Actions
  = GetCategories
  | GetCategoriesSuccess
  | GetCategoriesError
  | DeleteCategory
  | DeleteCategorySuccess
  | DeleteCategoryError;
