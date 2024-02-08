import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultativosEspecialesDetalleComponent } from './facultativos-especiales-detalle.component';

describe('FacultativosEspecialesDetalleComponent', () => {
  let component: FacultativosEspecialesDetalleComponent;
  let fixture: ComponentFixture<FacultativosEspecialesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultativosEspecialesDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultativosEspecialesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
