import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasfavoritasComponent } from './carrerasfavoritas.component';

describe('CarrerasfavoritasComponent', () => {
  let component: CarrerasfavoritasComponent;
  let fixture: ComponentFixture<CarrerasfavoritasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrerasfavoritasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasfavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
