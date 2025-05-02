import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStadisticsComponent } from './location-stadistics.component';

describe('LocationStadisticsComponent', () => {
  let component: LocationStadisticsComponent;
  let fixture: ComponentFixture<LocationStadisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationStadisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationStadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
