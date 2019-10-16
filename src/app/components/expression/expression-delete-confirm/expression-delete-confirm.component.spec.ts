import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDeleteConfirmComponent } from './expression-delete-confirm.component';

describe('ExpressionDeleteConfirmComponent', () => {
  let component: ExpressionDeleteConfirmComponent;
  let fixture: ComponentFixture<ExpressionDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
