import { Injectable } from '@angular/core';

// import @ngrx
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as rootReducer from '../../../store/root.reducer';

import * as expressionAddActions from './expression-add-popup.actions';
import * as expressionActions from '../expression.actions';

// import services
import { ExpressionService } from '../../../services/expression.service';

@Injectable()
export class ExpressionAddEffects {

  /* Expression Add */
  @Effect()
  public expressionAdd$ = this.actions
    .ofType(expressionAddActions.EXPRESSION_ADD)
    .map(toPayload)
    .switchMap(payload => {
      if (!payload.expressions.length) {
        return Observable.empty();
      }

      const expressionsBatch = [];
      expressionsBatch.push(Observable.of(payload));
      payload.expressions.forEach((expression, index) => {
        expressionsBatch.push(
          this.expressionService.expressionAdd(expression.descripcion, payload.categoria, payload.item)
            .map(() => new expressionAddActions.ExpressionAddSuccess())
            .catch(error => Observable.of(new expressionAddActions.ExpressionAddError(error.message)))
        );
      });
      return Observable.forkJoin(expressionsBatch);
    })
    .mergeMap((results: any[]) => {
      return Observable.of(new expressionAddActions.ExpressionAddFinishes(results[0].categoria, results[0].item));
    });


  @Effect()
  public expressionAddFinishes$: Observable<Action> = this.actions
    .ofType(expressionAddActions.EXPRESSION_ADD_FINISHES)
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
