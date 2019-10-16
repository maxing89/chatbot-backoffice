import { Injectable } from '@angular/core';

import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as rootReducer from '../../../store/root.reducer';
import * as spinnerActions from './spinner.actions';
import * as loginActions from '../../auth/login/login.actions';
import * as homeAddActions from '../../home/home-add-popup/home-add-popup.actions';
import * as homeActions from '../../home/home.actions';
import * as itemActions from '../../item/item.actions';
import * as itemAddActions from '../../item/item-add-popup/item-add-popup.actions';
import * as expressionActions from '../../expression/expression.actions';
import * as expressionAddActions from '../../expression/expression-add-popup/expression-add-popup.actions';

@Injectable()
export class SpinnerEffects {

  @Effect()
    startLoading$: Observable<Action> = this.actions
    .ofType(
      ...loginActions.START_LOADING_ACTIONS,
      ...homeAddActions.START_LOADING_ACTIONS,
      ...homeActions.START_LOADING_ACTIONS,
      ...itemActions.START_LOADING_ACTIONS,
      ...itemAddActions.START_LOADING_ACTIONS,
      ...expressionActions.START_LOADING_ACTIONS,
      ...expressionAddActions.START_LOADING_ACTIONS,
    )
    .map(() => new spinnerActions.StartLoading());

  @Effect()
    stopSpinning$: Observable<Action> = this.actions
    .ofType(
      ...loginActions.STOP_SPINNING_ACTIONS,
      ...homeAddActions.STOP_SPINNING_ACTIONS,
      ...homeActions.STOP_SPINNING_ACTIONS,
      ...itemActions.STOP_SPINNING_ACTIONS,
      ...itemAddActions.STOP_SPINNING_ACTIONS,
      ...expressionActions.STOP_SPINNING_ACTIONS,
      ...expressionAddActions.STOP_SPINNING_ACTIONS,
    )
    .map(() => new spinnerActions.StopSpinning());

  constructor(
    private actions: Actions,
    private store: Store<rootReducer.State>
  ) {}

}
