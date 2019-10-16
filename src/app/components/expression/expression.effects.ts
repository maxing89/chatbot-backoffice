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

import * as expressionActions from './expression.actions';

// import services
import { ExpressionService } from '../../services/expression.service';

@Injectable()
export class ExpressionEffects {

  /* Expression Get */
  @Effect()
  public expressionGet$: Observable<Action> = this.actions
    .ofType(expressionActions.GET_EXPRESSIONS)
    .map(toPayload)
    .switchMap(payload => {
      return this.expressionService.expressionGet(payload.categoria, payload.item)
        .map(expressions => new expressionActions.GetExpressionsSuccess(expressions))
        .catch(error => Observable.of(new expressionActions.GetExpressionsError(error.message)));
    });

    /* Expression Delete */
    @Effect()
    public expressionDelete$: Observable<Action> = this.actions
      .ofType(expressionActions.DELETE_EXPRESSION)
      .map(toPayload)
      .switchMap(payload => {
        return this.expressionService.expressionDelete(payload.idExpression, payload.categoria, payload.item)
          .map(() => new expressionActions.DeleteExpressionSuccess(payload.categoria, payload.item))
          .catch(error => Observable.of(new expressionActions.DeleteExpressionError(error.description)));
      });

    @Effect()
    public expressionDeleteSuccess$: Observable<Action> = this.actions
      .ofType(expressionActions.DELETE_EXPRESSION_SUCCESS)
      .map(toPayload)
      .mergeMap((payload) =>
        [
          new expressionActions.GetExpressions(payload.categoria, payload.item)
        ]
      );

  constructor(
    private actions: Actions,
    private store$: Store<rootReducer.State>,
    private expressionService: ExpressionService
  ) {}
}
