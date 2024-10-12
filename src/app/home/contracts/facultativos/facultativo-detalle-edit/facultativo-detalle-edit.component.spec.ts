import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultativoDetalleEditComponent } from './facultativo-detalle-edit.component';

describe('FacobDetalleEditComponent', () => {
  let component: FacultativoDetalleEditComponent;
  let fixture: ComponentFixture<FacultativoDetalleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultativoDetalleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultativoDetalleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
