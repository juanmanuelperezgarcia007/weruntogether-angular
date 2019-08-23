import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderActivoComponent } from './header-activo.component';

describe('HeaderActivoComponent', () => {
  let component: HeaderActivoComponent;
  let fixture: ComponentFixture<HeaderActivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderActivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
