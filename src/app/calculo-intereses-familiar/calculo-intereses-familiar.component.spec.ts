import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoInteresesFamiliarComponent } from './calculo-intereses-familiar.component';

describe('CalculoInteresesFamiliarComponent', () => {
  let component: CalculoInteresesFamiliarComponent;
  let fixture: ComponentFixture<CalculoInteresesFamiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoInteresesFamiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoInteresesFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
