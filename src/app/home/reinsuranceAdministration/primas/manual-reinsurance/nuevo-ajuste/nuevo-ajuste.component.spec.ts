import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAjusteComponent } from './nuevo-ajuste.component';

describe('NuevoAjusteComponent', () => {
  let component: NuevoAjusteComponent;
  let fixture: ComponentFixture<NuevoAjusteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAjusteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoAjusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
