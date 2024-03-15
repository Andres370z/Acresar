import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestroReaseguradorComponent } from './siniestro-reasegurador.component';

describe('SiniestroReaseguradorComponent', () => {
  let component: SiniestroReaseguradorComponent;
  let fixture: ComponentFixture<SiniestroReaseguradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiniestroReaseguradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiniestroReaseguradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
