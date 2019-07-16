import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFamiliarComponent } from './custom-familiar.component';

describe('CustomFamiliarComponent', () => {
  let component: CustomFamiliarComponent;
  let fixture: ComponentFixture<CustomFamiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFamiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
