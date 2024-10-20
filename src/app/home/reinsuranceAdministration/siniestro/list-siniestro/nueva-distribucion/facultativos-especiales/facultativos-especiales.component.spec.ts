import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultativosEspecialesComponent } from './facultativos-especiales.component';

describe('FacultativosEspecialesComponent', () => {
  let component: FacultativosEspecialesComponent;
  let fixture: ComponentFixture<FacultativosEspecialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultativosEspecialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultativosEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
