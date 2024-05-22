import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAutomaticosComponent } from './modificar-automaticos.component';

describe('ModificarAutomaticosComponent', () => {
  let component: ModificarAutomaticosComponent;
  let fixture: ComponentFixture<ModificarAutomaticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAutomaticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAutomaticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
