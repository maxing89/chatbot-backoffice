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

import * as itemAddActions from './item-add-popup.actions';
import * as itemActions from '../item.actions';

// import services
import { ItemService } from '../../../services/item.service';

@Injectable()
export class ItemAddEffects {

  /* Category Add */
  @Effect()
  public itemAdd$: Observable<Action> = this.actions
    .ofType(itemAddActions.ITEM_ADD)
    .map(toPayload)
    .switchMap(payload => {
      return this.itemService.itemAdd(payload.nombre, payload.descripcion, payload.categoria)
        .map(item => new itemAddActions.ItemAddSuccess(item, payload.categoria))
        .catch(error => Observable.of(new itemAddActions.ItemAddError(error.message)));
    });

  @Effect()
  public itemAddSuccess$: Observable<Action> = this.actions
    .ofType(itemAddActions.ITEM_ADD_SUCCESS)
    .map(toPayload)
    .mergeMap((payload) =>
      [
        new itemActions.GetItems(payload.categoria)
      ]
    );

  constructor(
    private actions: Actions,
    private store$: Store<rootReducer.State>,
    private itemService: ItemService
  ) {}
}
