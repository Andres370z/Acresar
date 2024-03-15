import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauxComponent } from './bordereaux.component';

describe('BordereauxComponent', () => {
  let component: BordereauxComponent;
  let fixture: ComponentFixture<BordereauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BordereauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BordereauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
