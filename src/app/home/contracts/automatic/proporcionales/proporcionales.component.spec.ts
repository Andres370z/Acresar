import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProporcionalesComponent } from './proporcionales.component';

describe('ProporcionalesComponent', () => {
  let component: ProporcionalesComponent;
  let fixture: ComponentFixture<ProporcionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProporcionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProporcionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
