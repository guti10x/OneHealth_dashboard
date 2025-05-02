import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPredictionsComponent } from './health-predictions.component';

describe('HealthPredictionsComponent', () => {
  let component: HealthPredictionsComponent;
  let fixture: ComponentFixture<HealthPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthPredictionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
