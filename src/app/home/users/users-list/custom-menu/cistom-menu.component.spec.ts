import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CistomMenuComponent } from './custom-menu.component';

describe('CistomMenuComponent', () => {
  let component: CistomMenuComponent;
  let fixture: ComponentFixture<CistomMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CistomMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CistomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
