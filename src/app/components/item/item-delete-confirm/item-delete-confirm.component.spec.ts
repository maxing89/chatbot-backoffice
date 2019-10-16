import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeleteConfirmComponent } from './item-delete-confirm.component';

describe('ItemDeleteConfirmComponent', () => {
  let component: ItemDeleteConfirmComponent;
  let fixture: ComponentFixture<ItemDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
