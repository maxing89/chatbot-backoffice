import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeleteConfirmComponent } from './home-delete-confirm.component';

describe('HomeDeleteConfirmComponent', () => {
  let component: HomeDeleteConfirmComponent;
  let fixture: ComponentFixture<HomeDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
