import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveExample1Component } from './reactive-example1.component';

describe('ReactiveExample1Component', () => {
  let component: ReactiveExample1Component;
  let fixture: ComponentFixture<ReactiveExample1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveExample1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
