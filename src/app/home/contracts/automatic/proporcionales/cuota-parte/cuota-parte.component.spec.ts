import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotaParteComponent } from './cuota-parte.component';

describe('CuotaParteComponent', () => {
  let component: CuotaParteComponent;
  let fixture: ComponentFixture<CuotaParteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotaParteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuotaParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
