import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultativoEditComponent } from './facultativo-edit.component';

describe('FacultativoEditComponent', () => {
  let component: FacultativoEditComponent;
  let fixture: ComponentFixture<FacultativoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultativoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultativoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
