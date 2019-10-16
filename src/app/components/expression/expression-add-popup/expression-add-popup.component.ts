import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as rootReducer from '../../../store/root.reducer';

// actions
import * as expressionAddActions from './expression-add-popup.actions';

@Component({
  selector: 'app-expression-add-popup',
  templateUrl: './expression-add-popup.component.html',
  styleUrls: ['./expression-add-popup.component.scss']
})
export class ExpressionAddPopupComponent implements OnInit {

  @Input() categoria: string;
  @Input() item: string;
  @Output() onSelectBack: EventEmitter<any> = new EventEmitter<any>();
  addExpresionForm: FormGroup;
  submitted: boolean;
  expresionesNuevas: Array<any>;

  formErrors = {
    'expresion': ''
  };

  validationMessages = {
    'expresion': { 'required': 'La expresión es requerida.', 'pattern': 'La expresión es requerida.' }
  };

  constructor(private formBuilder: FormBuilder,
              private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.expresionesNuevas = [];
    this.submitted = false;
    this.buildForm();
  }

  buildForm(): void {
    this.addExpresionForm = this.formBuilder.group({
      'expresion': [null, [Validators.required, Validators.pattern('.*\\S.*')]]
    });
    this.addExpresionForm.valueChanges.subscribe(data => this.checkValidations(data));
  }

  resetForm() {
    this.submitted = false;
    this.addExpresionForm.reset();
  }

  checkValidations(data?: any) {
    if (!this.addExpresionForm) { return; }
    const form = this.addExpresionForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid && this.submitted) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  back() {
    this.onSelectBack.emit();
  }

  submit() {
    this.submitted = true;
    if (this.addExpresionForm.valid) {
      this.expresionesNuevas.push({'descripcion': this.addExpresionForm.controls.expresion.value});
      this.resetForm();
    } else {
      this.checkValidations();
    }
  }

  deleteExpresion(index: number) {
    this.expresionesNuevas.splice(index, 1);
  }

  agregarNuevasExpresiones() {
    this.store.dispatch(new expressionAddActions.ExpressionAdd(
      this.expresionesNuevas,
      this.categoria,
      this.item
    ));
    this.expresionesNuevas = [];
    this.resetForm();
    this.back();
  }

}
