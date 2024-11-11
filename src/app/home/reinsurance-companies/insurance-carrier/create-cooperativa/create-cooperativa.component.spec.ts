import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCooperativaComponent } from './create-cooperativa.component';

describe('CreateCooperativaComponent', () => {
  let component: CreateCooperativaComponent;
  let fixture: ComponentFixture<CreateCooperativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCooperativaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCooperativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
