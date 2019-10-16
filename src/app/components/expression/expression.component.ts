import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as rootReducer from '../../store/root.reducer';

// actions
import * as expressionActions from './expression.actions';

@Component({
  selector: 'app-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.scss']
})
export class ExpressionComponent implements OnInit {

  public subscription: Subscription = new Subscription();
  categoria: string;
  item: string;
  @ViewChild('expressionAddPopup') expressionAddPopup: ModalDirective;
  expresiones: Array<any>;
  expresiones$: Observable<Array<any>>;

  constructor(private route: ActivatedRoute,
              private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.expresiones$ = this.store.select(rootReducer.getExpressions);
    this.subscription.add(this.expresiones$.subscribe(expresiones => {
      this.expresiones = expresiones;
    }));
    this.subscription.add(this.route.paramMap.subscribe(paramMap => {
      this.categoria = paramMap.get('nombreCategoria');
      this.item = paramMap.get('nombreItem');
      this.store.dispatch(new expressionActions.GetExpressions(this.categoria, this.item));
    }));
  }

  autofocus() {
    setTimeout(() => {
      document.getElementById('expresion').focus();
    }, 500);
  }

  showAddPopup() {
    this.expressionAddPopup.show();
    this.autofocus();
  }

  hideAddPopup() {
    this.expressionAddPopup.hide();
  }

  addExpresion(expresion) {
    this.expresiones.push({'descripcion': expresion, 'categoria': this.categoria, 'item': this.item});
  }

  deleteExpresion(idExpression: string) {
    this.store.dispatch(new expressionActions.DeleteExpression(idExpression, this.categoria, this.item));
  }

}
