import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerencialTwoComponent } from './gerencial-two.component';

describe('GerencialTwoComponent', () => {
  let component: GerencialTwoComponent;
  let fixture: ComponentFixture<GerencialTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerencialTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerencialTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
