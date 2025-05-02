import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnxietyLevelsComponent } from './anxiety-levels.component';

describe('AnxietyLevelsComponent', () => {
  let component: AnxietyLevelsComponent;
  let fixture: ComponentFixture<AnxietyLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnxietyLevelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnxietyLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
