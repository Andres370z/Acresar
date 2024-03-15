import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderauxComponent } from './borderaux.component';

describe('BorderauxComponent', () => {
  let component: BorderauxComponent;
  let fixture: ComponentFixture<BorderauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorderauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
