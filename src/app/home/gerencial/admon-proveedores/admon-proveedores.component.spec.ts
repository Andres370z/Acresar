import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonProveedoresComponent } from './admon-proveedores.component';

describe('AdmonProveedoresComponent', () => {
  let component: AdmonProveedoresComponent;
  let fixture: ComponentFixture<AdmonProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmonProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmonProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
