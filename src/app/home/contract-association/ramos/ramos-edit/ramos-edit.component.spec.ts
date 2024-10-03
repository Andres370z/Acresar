import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamosEditComponent } from './ramos-edit.component';

describe('RamosEditComponent', () => {
  let component: RamosEditComponent;
  let fixture: ComponentFixture<RamosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RamosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
