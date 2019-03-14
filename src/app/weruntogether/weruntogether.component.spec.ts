import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeruntogetherComponent } from './weruntogether.component';

describe('WeruntogetherComponent', () => {
  let component: WeruntogetherComponent;
  let fixture: ComponentFixture<WeruntogetherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeruntogetherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeruntogetherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
