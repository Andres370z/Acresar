import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProveedoresComponent } from './new-proveedores.component';

describe('NewProveedoresComponent', () => {
  let component: NewProveedoresComponent;
  let fixture: ComponentFixture<NewProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProveedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
