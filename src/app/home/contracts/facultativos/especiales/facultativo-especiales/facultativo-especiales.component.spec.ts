import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultativoEspecialesComponent } from './facultativo-especiales.component';

describe('FacultativoEspecialesComponent', () => {
  let component: FacultativoEspecialesComponent;
  let fixture: ComponentFixture<FacultativoEspecialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultativoEspecialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultativoEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
