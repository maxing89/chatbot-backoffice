import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

// environment
import { environment } from '../../environments/environment';

// reducers
import * as spinner from '../components/shared/spinner/spinner.reducer';
import * as login from '../components/auth/login/login.reducer';
import * as homeReducer from '../components/home/home.reducer';
import * as itemReducer from '../components/item/item.reducer';
import * as expressionReducer from '../components/expression/expression.reducer';

export interface State {
  spinner: spinner.State;
  login: login.State;
  homeReducer: homeReducer.State;
  itemReducer: itemReducer.State;
  expressionReducer: expressionReducer.State;
}

const reducers = {
  spinner: spinner.reducer,
  login: login.reducer,
  homeReducer: homeReducer.reducer,
  itemReducer: itemReducer.reducer,
  expressionReducer: expressionReducer.reducer,
};

// development reducer includes storeFreeze to prevent state from being mutated
const developmentReducer: ActionReducer<State> = compose(
storeFreeze,
localStorageSync({keys: ['login'], rehydrate: true}),
combineReducers)(reducers);


// production reducer
const productionReducer: ActionReducer<State> = compose(
localStorageSync({keys: ['login'], rehydrate: true}),
combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// Spinner
export const getSpinnerState = (state: State) => state.spinner;
export const getSpin = createSelector(getSpinnerState, spinner.getSpin);

// Login
export const getUsersState = (state: State) => state.login;
export const isAuthenticated = createSelector(getUsersState, login.isAuthenticated);
export const getAuthorizationToken = createSelector(getUsersState, login.getAuthorizationToken);
export const getAuthenticatedUser = createSelector(getUsersState, login.getAuthenticatedUser);
export const getAuthenticationError = createSelector(getUsersState, login.getAuthenticationError);
export const isAuthenticationLoading = createSelector(getUsersState, login.isLoading);

// Home (Categories)
export const getCategoryState = (state: State) => state.homeReducer;
export const getCategorias = createSelector(getCategoryState, homeReducer.getCategorias);
export const getCategoria = createSelector(getCategoryState, homeReducer.getCategoria);

// Items
export const getItemState = (state: State) => state.itemReducer;
export const getItems = createSelector(getItemState, itemReducer.getItems);
export const getItem = createSelector(getItemState, itemReducer.getItem);
export const getSynonyms = createSelector(getItemState, itemReducer.getSynonyms);

// Expressions
export const getExpressionState = (state: State) => state.expressionReducer;
export const getExpressions = createSelector(getExpressionState, expressionReducer.getExpressions);
