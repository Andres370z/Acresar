import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsOneComponent } from './modals-one.component';

describe('ModalsOneComponent', () => {
  let component: ModalsOneComponent;
  let fixture: ComponentFixture<ModalsOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
