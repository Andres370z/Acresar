import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultativoComponent } from './facultativo.component';

describe('FacultativoComponent', () => {
  let component: FacultativoComponent;
  let fixture: ComponentFixture<FacultativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
