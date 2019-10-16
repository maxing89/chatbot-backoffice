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

import * as itemActions from './item.actions';

// import services
import { ItemService } from '../../services/item.service';
import { SynonymService } from '../../services/synonym.service';

import { Item, Synonym } from './item.models';

@Injectable()
export class ItemEffects {

  /* Item Get */
  @Effect()
  public itemGet$ = this.actions
    .ofType(itemActions.GET_ITEMS)
    .map(toPayload)
    .switchMap(payload => this.itemService.itemGet(payload.categoria)
      .mergeMap(items => [
        new itemActions.GetSynonyms(payload.categoria, items)
      ])
      .catch(error => Observable.of(new itemActions.GetItemsError(error.description))));

  @Effect()
  getSynonyms$ = this.actions
    .ofType(itemActions.GET_SYNONYMS)
    .map(toPayload)
    .switchMap(payload => {
      if (!payload.items.length) {
        return Observable.of([]);
      }

      const feeSolutionsBatch = [];

      payload.items.forEach((item: Item, index: number) => {
        feeSolutionsBatch.push(
          this.synonymService.synonymGet(payload.categoria, item.id)
            .map((synonyms) => new itemActions.GetSynonymsSuccess(synonyms, payload.items))
            .catch(error => Observable.of(new itemActions.GetSynonymsError(error.description)))
        );
      });

      return Observable.forkJoin(feeSolutionsBatch);
    })
    .mergeMap((results: any[]) => {
      let items: Array<Item> = [];
      let synonymsAll: Array<any> = [];
      let synonymsPerItem: Array<any>;
      results.forEach((res: any, index: number) => {
        synonymsAll = synonymsAll.concat(res.payload.synonyms);
      });
      if (results.length) {
        results[0].payload.items.map(item => {
          synonymsPerItem = [];
          synonymsAll.map(synonym => {
            if (item.id === synonym.parent_id) {
              synonymsPerItem.push(synonym);
            }
          });
          items = items.concat([
            {
              id: item.id,
              description: item.description,
              synonyms: synonymsPerItem
            }
          ]);
          if (results[0].type === itemActions.GET_SYNONYMS_ERROR) {
            return Observable.of(new itemActions.GetSynonymsError(results[0].payload.error));
          }
        });
      }
      return Observable.of(new itemActions.GetItemsSuccess(items));
    });

  /* Item Delete */
  @Effect()
  public itemDelete$: Observable<Action> = this.actions
    .ofType(itemActions.DELETE_ITEM)
    .map(toPayload)
    .switchMap(payload => {
      return this.itemService.itemDelete(payload.idItem, payload.categoria)
        .map(() => new itemActions.DeleteItemSuccess(payload.categoria))
        .catch(error => Observable.of(new itemActions.DeleteItemError(error.description)));
    });

  @Effect()
  public itemDeleteSuccess$: Observable<Action> = this.actions
    .ofType(itemActions.DELETE_ITEM_SUCCESS)
    .map(toPayload)
    .mergeMap((payload) =>
      [
        new itemActions.GetItems(payload.categoria)
      ]
    );

    /* Synonym Add */
    @Effect()
    public synonymAdd$: Observable<Action> = this.actions
      .ofType(itemActions.ADD_SYNONYM)
      .map(toPayload)
      .switchMap(payload => {
        return this.synonymService.synonymAdd(payload.categoria, payload.item, payload.synonym)
          .map(synonym => new itemActions.AddSynonymSuccess())
          .catch(error => Observable.of(new itemActions.AddSynonymError(error.message)));
      });

    /* Synonym Delete */
    @Effect()
    public synonymDelete$: Observable<Action> = this.actions
      .ofType(itemActions.DELETE_SYNONYM)
      .map(toPayload)
      .switchMap(payload => {
        return this.synonymService.synonymDelete(payload.categoria, payload.item, payload.sinonimo)
          .map(() => new itemActions.DeleteSynonymSuccess())
          .catch(error => Observable.of(new itemActions.DeleteSynonymError(error.description)));
      });

  constructor(
    private actions: Actions,
    private store$: Store<rootReducer.State>,
    private itemService: ItemService,
    private synonymService: SynonymService
  ) {}
}
