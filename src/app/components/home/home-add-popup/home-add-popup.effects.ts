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

import * as rootReducer from '../../../store/root.reducer';

import * as homeAddActions from './home-add-popup.actions';
import * as homeActions from '../home.actions';

// import services
import { CategoryService } from '../../../services/category.service';

@Injectable()
export class HomeAddEffects {

  /* Category Add */
  @Effect()
  public categoryAdd$: Observable<Action> = this.actions
    .ofType(homeAddActions.CATEGORY_ADD)
    .map(toPayload)
    .switchMap(payload => {
      return this.categoryService.categoryAdd(payload.nombre, payload.descripcion)
        .map(categoria => new homeAddActions.CategoryAddSuccess(categoria))
        .catch(error => Observable.of(new homeAddActions.CategoryAddError(error.message)));
    });

  @Effect()
  public categoryAddSuccess$: Observable<Action> = this.actions
    .ofType(homeAddActions.CATEGORY_ADD_SUCCESS)
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
