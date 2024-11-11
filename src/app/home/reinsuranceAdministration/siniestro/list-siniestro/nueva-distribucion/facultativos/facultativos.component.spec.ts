import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultativosComponent } from './facultativos.component';

describe('FacultativosComponent', () => {
  let component: FacultativosComponent;
  let fixture: ComponentFixture<FacultativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultativosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
