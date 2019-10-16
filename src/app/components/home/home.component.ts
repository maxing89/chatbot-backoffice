import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as rootReducer from '../../store/root.reducer';

// actions
import * as homeActions from './home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public subscription: Subscription = new Subscription();
  @ViewChild('homeAddPopup') homeAddPopup: ModalDirective;
  @ViewChild('homeAddAnswer') homeAddAnswer: ModalDirective;
  categorias: Array<any>;
  categorias$: Observable<Array<any>>;

  constructor(private store: Store<rootReducer.State>) {

  }

  ngOnInit()  {
    this.store.dispatch(new homeActions.GetCategories());
    this.categorias$ = this.store.select(rootReducer.getCategorias);
    this.subscription.add(this.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    }));
  }

  deleteCategoria(idCategory: string) {
    this.store.dispatch(new homeActions.DeleteCategory(idCategory));
  }

  showAddPopup() {
    this.homeAddPopup.show();
    this.autofocus();
  }

  hideAddPopup() {
    this.homeAddPopup.hide();
  }

  autofocus() {
    setTimeout(() => {
      document.getElementById('nombreCategoria').focus();
    }, 500);
  }

  submitAddPopup() {
    this.store.dispatch(new homeActions.GetCategories());
  }

  showItems(nombreCategoria) {
    this.store.dispatch(go(['/category', nombreCategoria]));
  }

}
