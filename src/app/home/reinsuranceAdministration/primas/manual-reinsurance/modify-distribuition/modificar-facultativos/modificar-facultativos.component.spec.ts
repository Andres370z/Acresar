import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFacultativosComponent } from './modificar-facultativos.component';

describe('ModificarFacultativosComponent', () => {
  let component: ModificarFacultativosComponent;
  let fixture: ComponentFixture<ModificarFacultativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarFacultativosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarFacultativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
