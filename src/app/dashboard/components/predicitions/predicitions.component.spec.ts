import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredicitionsComponent } from './predicitions.component';

describe('PredicitionsComponent', () => {
  let component: PredicitionsComponent;
  let fixture: ComponentFixture<PredicitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PredicitionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredicitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
