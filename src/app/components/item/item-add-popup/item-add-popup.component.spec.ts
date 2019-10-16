import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddPopupComponent } from './item-add-popup.component';

describe('ItemAddPopupComponent', () => {
  let component: ItemAddPopupComponent;
  let fixture: ComponentFixture<ItemAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAddPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
