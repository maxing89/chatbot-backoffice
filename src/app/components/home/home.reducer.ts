import * as actions from './home.actions';

/* Subreducers imports */
import * as homeAddReducer from './home-add-popup/home-add-popup.reducer';

export interface State {
  categorias: Array<any>;
  categoriasError: string;
  categoria: any;
  categoriaError: string;
}

export const initialState: State = {
  categorias: [],
  categoriasError: null,
  categoria: null,
  categoriaError: null
};

export function reducer(state = initialState, action): State {
  /* Subreducers call */
  state = homeAddReducer.reducer(state, action);

  switch (action.type) {
    case actions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categorias: action.payload.categorias
      };
    case actions.GET_CATEGORIES_ERROR:
      return {
        ...state,
        categoriasError: action.payload.error
      };
    default:
      return state;
  }
}

export const getCategorias = (state: State) => state.categorias;
export const getCategoriasError = (state: State) => state.categoriasError;
export const getCategoria = (state: State) => state.categoria;
export const getCategoriaError = (state: State) => state.categoriaError;
