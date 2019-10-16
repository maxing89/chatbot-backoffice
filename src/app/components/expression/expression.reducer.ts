import * as actions from './expression.actions';

/* Subreducers imports */
import * as expressionAddReducer from './expression-add-popup/expression-add-popup.reducer';

export interface State {
  expressions: Array<any>;
  expressionsError: string;
  expressionError: string;
}

export const initialState: State = {
  expressions: [],
  expressionsError: null,
  expressionError: null
};

export function reducer(state = initialState, action): State {
  /* Subreducers call */
  state = expressionAddReducer.reducer(state, action);

  switch (action.type) {
    case actions.GET_EXPRESSIONS_SUCCESS:
      return {
        ...state,
        expressions: action.payload.expressions
      };
    case actions.GET_EXPRESSIONS_ERROR:
      return {
        ...state,
        expressionsError: action.payload.error
      };
    default:
      return state;
  }
}

export const getExpressions = (state: State) => state.expressions;
export const getExpressionsError = (state: State) => state.expressionsError;
export const getExpressionError = (state: State) => state.expressionError;
