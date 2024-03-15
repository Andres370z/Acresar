import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFacultativoComponent } from './reporte-facultativo.component';

describe('ReporteFacultativoComponent', () => {
  let component: ReporteFacultativoComponent;
  let fixture: ComponentFixture<ReporteFacultativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteFacultativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteFacultativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
