import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteFacultativoComponent } from './ajuste-facultativo.component';

describe('AjusteFacultativoComponent', () => {
  let component: AjusteFacultativoComponent;
  let fixture: ComponentFixture<AjusteFacultativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjusteFacultativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjusteFacultativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
