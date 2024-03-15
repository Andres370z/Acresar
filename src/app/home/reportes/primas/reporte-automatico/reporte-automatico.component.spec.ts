import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAutomaticoComponent } from './reporte-automatico.component';

describe('ReporteAutomaticoComponent', () => {
  let component: ReporteAutomaticoComponent;
  let fixture: ComponentFixture<ReporteAutomaticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAutomaticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAutomaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
