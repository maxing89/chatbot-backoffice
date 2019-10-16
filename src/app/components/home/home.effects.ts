import { Injectable } from '@angular/core';

// import @ngrx
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as rootReducer from '../../store/root.reducer';

import * as homeActions from './home.actions';

// import services
import { CategoryService } from '../../services/category.service';

@Injectable()
export class HomeEffects {

  /* Category Add */
  @Effect()
  public categoryGet$: Observable<Action> = this.actions
    .ofType(homeActions.GET_CATEGORIES)
    .map(toPayload)
    .switchMap(payload => {
      return this.categoryService.categoryGet()
        .map(categorias => new homeActions.GetCategoriesSuccess(categorias))
        .catch(error => Observable.of(new homeActions.GetCategoriesError(error.message)));
    });

  /* Category Delete */
  @Effect()
  public categoryDelete$: Observable<Action> = this.actions
    .ofType(homeActions.DELETE_CATEGORY)
    .map(toPayload)
    .switchMap(payload => {
      return this.categoryService.categoryDelete(payload.idCategory)
        .map(() => new homeActions.DeleteCategorySuccess())
        .catch(error => Observable.of(new homeActions.DeleteCategoryError(error.message)));
    });

  @Effect()
  public categoryDeleteSuccess$: Observable<Action> = this.actions
    .ofType(homeActions.DELETE_CATEGORY_SUCCESS)
    .mergeMap(() =>
      [
        new homeActions.GetCategories()
      ]
    );

  constructor(
    private actions: Actions,
    private store$: Store<rootReducer.State>,
    private categoryService: CategoryService
  ) {}
}
