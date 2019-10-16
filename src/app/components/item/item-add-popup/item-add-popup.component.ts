import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as rootReducer from '../../../store/root.reducer';

// actions
import * as itemAddActions from './item-add-popup.actions';

@Component({
  selector: 'app-item-add-popup',
  templateUrl: './item-add-popup.component.html',
  styleUrls: ['./item-add-popup.component.scss']
})
export class ItemAddPopupComponent implements OnInit {

  @Input() categoria: string;
  @Output() onSelectBack: EventEmitter<any> = new EventEmitter<any>();
  addItemForm: FormGroup;
  submitted: boolean;

  formErrors = {
    'nombreItem': '',
    'descripcionItem': ''
  };

  validationMessages = {
    'nombreItem': { 'required': 'El nombre del ítem es requerido.', 'pattern': 'No se permiten los espacios en blanco.' },
    'descripcionItem': { 'required': 'La respuesta asociada al ítem es requerida.', 'pattern': 'La respuesta asociada al ítem es requerida.' }
  };

  constructor(private formBuilder: FormBuilder,
              private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.submitted = false;
    this.buildForm();
  }

  buildForm(): void {
    this.addItemForm = this.formBuilder.group({
      nombreItem: [null, [Validators.required]],
      descripcionItem: [null, [Validators.required]]
    });
    this.addItemForm.valueChanges.subscribe(data => this.checkValidations(data));
  }

  checkValidations(data?: any) {
    if (!this.addItemForm) { return; }
    const form = this.addItemForm;
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

  resetForm() {
    this.submitted = false;
    this.addItemForm.reset();
  }

  submit() {
    this.submitted = true;
    if (this.addItemForm.valid) {
      this.back();
      this.store.dispatch(new itemAddActions.ItemAdd(
        this.addItemForm.controls['nombreItem'].value,
        this.addItemForm.controls['descripcionItem'].value,
        this.categoria
      ));
      this.resetForm();
    } else {
      this.checkValidations();
    }
  }

}
