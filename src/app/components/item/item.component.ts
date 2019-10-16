import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import * as rootReducer from '../../store/root.reducer';

// actions
import * as itemActions from './item.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public subscription: Subscription = new Subscription();
  categoria: string;
  @ViewChild('itemAddPopup') itemAddPopup: ModalDirective;
  items: Array<any>;
  items$: Observable<Array<any>>;
  synonyms$: Observable<Array<any>>;
  synonyms: Array<any>;

  constructor(private route: ActivatedRoute,
              private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.items$ = this.store.select(rootReducer.getItems);
    this.synonyms$ = this.store.select(rootReducer.getSynonyms);
    this.subscription.add(this.items$.subscribe(items => {
      this.items = items;
    }));
    this.subscription.add(this.synonyms$.subscribe(synonyms => {
      this.synonyms = synonyms;
    }));
    this.subscription.add(this.route.paramMap.subscribe(paramMap => {
      this.categoria = paramMap.get('nombreCategoria');
      this.store.dispatch(new itemActions.GetItems(this.categoria));
    }));
  }

  deleteItem(idItem: string) {
    this.store.dispatch(new itemActions.DeleteItem(idItem, this.categoria));
  }

  showAddPopup() {
    this.itemAddPopup.show();
    this.autofocus();
  }

  hideAddPopup() {
    this.itemAddPopup.hide();
  }

  autofocus() {
    setTimeout(() => {
      document.getElementById('nombreItem').focus();
    }, 500);
  }

  showExpresiones(nombreItem) {
    this.store.dispatch(go(['/category', this.categoria, 'item', nombreItem]));
  }

  onAddSynonym(synonym: any, item: string) {
    this.store.dispatch(new itemActions.AddSynonym(this.categoria, item, synonym.value));
  }

  onRemoveSynonym(synonym: any, item: string) {
    this.store.dispatch(new itemActions.DeleteSynonym(this.categoria, item, synonym.value));
  }
}
