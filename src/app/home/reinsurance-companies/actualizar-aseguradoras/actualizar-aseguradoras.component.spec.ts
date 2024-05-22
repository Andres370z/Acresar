import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAseguradorasComponent } from './actualizar-aseguradoras.component';

describe('ActualizarAseguradorasComponent', () => {
  let component: ActualizarAseguradorasComponent;
  let fixture: ComponentFixture<ActualizarAseguradorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarAseguradorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAseguradorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
