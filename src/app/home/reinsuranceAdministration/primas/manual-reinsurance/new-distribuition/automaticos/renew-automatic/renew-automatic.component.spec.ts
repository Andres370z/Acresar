import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewAutomaticComponent } from './renew-automatic.component';

describe('RenewAutomaticComponent', () => {
  let component: RenewAutomaticComponent;
  let fixture: ComponentFixture<RenewAutomaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewAutomaticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewAutomaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
