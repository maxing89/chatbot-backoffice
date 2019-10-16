import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionAddPopupComponent } from './expression-add-popup.component';

describe('ExpressionAddPopupComponent', () => {
  let component: ExpressionAddPopupComponent;
  let fixture: ComponentFixture<ExpressionAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionAddPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
