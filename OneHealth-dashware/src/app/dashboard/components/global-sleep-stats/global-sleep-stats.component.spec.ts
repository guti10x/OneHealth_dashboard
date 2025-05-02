import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSleepStatsComponent } from './global-sleep-stats.component';

describe('GlobalSleepStatsComponent', () => {
  let component: GlobalSleepStatsComponent;
  let fixture: ComponentFixture<GlobalSleepStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalSleepStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSleepStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
