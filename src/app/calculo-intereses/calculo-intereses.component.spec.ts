import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoInteresesComponent } from './calculo-intereses.component';

describe('CalculoInteresesComponent', () => {
  let component: CalculoInteresesComponent;
  let fixture: ComponentFixture<CalculoInteresesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoInteresesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoInteresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
