import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteAutomaticoComponent } from './ajuste-automatico.component';

describe('AjusteAutomaticoComponent', () => {
  let component: AjusteAutomaticoComponent;
  let fixture: ComponentFixture<AjusteAutomaticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjusteAutomaticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjusteAutomaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
