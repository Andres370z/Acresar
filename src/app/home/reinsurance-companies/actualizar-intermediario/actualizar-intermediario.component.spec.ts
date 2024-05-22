import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarIntermediarioComponent } from './actualizar-intermediario.component';

describe('ActualizarIntermediarioComponent', () => {
  let component: ActualizarIntermediarioComponent;
  let fixture: ComponentFixture<ActualizarIntermediarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarIntermediarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarIntermediarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
