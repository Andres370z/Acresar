import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResApiComponent } from './res-api.component';

describe('ResApiComponent', () => {
  let component: ResApiComponent;
  let fixture: ComponentFixture<ResApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
