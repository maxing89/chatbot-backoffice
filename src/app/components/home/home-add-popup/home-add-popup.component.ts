import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as rootReducer from '../../../store/root.reducer';

// actions
import * as homeAddActions from './home-add-popup.actions';

@Component({
  selector: 'app-home-add-popup',
  templateUrl: './home-add-popup.component.html',
  styleUrls: ['./home-add-popup.component.scss']
})
export class HomeAddPopupComponent implements OnInit {

  @Output() onSelectBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectSubmit: EventEmitter<any> = new EventEmitter<any>(); // Eliminar cuando este la API
  addCategoriaForm: FormGroup;
  submitted: boolean;

  formErrors = {
    'nombreCategoria': '',
    'descripcionCategoria': ''
  };

  validationMessages = {
    'nombreCategoria': { 'required': 'El nombre de la categoría es requerido.', 'pattern': 'No se permiten los espacios en blanco.' },
    'descripcionCategoria': {
      'required': 'La descripción de la categoría es requerida.', 'pattern': 'La descripción de la categoría es requerida.'
    }
  };

  constructor(private formBuilder: FormBuilder,
              private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.submitted = false;
    this.buildForm();
  }

  buildForm(): void {
    this.addCategoriaForm = this.formBuilder.group({
      nombreCategoria: [null, [Validators.required, Validators.pattern(/^\S*$/)]],
      descripcionCategoria: [null, [Validators.required]]
    });
    this.addCategoriaForm.valueChanges.subscribe(data => this.checkValidations(data));
  }

  checkValidations(data?: any) {
    if (!this.addCategoriaForm) { return; }
    const form = this.addCategoriaForm;
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
    this.addCategoriaForm.reset();
  }

  submit() {
    this.submitted = true;
    if (this.addCategoriaForm.valid) {
      this.back();
      this.store.dispatch(new homeAddActions.CategoryAdd(
        this.addCategoriaForm.controls['nombreCategoria'].value,
        this.addCategoriaForm.controls['descripcionCategoria'].value
      ));
    } else {
      this.checkValidations();
    }
  }

}
