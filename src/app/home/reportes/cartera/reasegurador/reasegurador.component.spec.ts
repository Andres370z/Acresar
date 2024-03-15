import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaseguradorComponent } from './reasegurador.component';

describe('ReaseguradorComponent', () => {
  let component: ReaseguradorComponent;
  let fixture: ComponentFixture<ReaseguradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaseguradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaseguradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
