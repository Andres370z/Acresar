import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionProveedoresComponent } from './asignacion-proveedores.component';

describe('AsignacionProveedoresComponent', () => {
  let component: AsignacionProveedoresComponent;
  let fixture: ComponentFixture<AsignacionProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
