import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAddPopupComponent } from './home-add-popup.component';

describe('HomeAddPopupComponent', () => {
  let component: HomeAddPopupComponent;
  let fixture: ComponentFixture<HomeAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAddPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
