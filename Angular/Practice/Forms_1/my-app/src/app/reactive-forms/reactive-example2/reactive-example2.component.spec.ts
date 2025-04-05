import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveExample2Component } from './reactive-example2.component';

describe('ReactiveExample2Component', () => {
  let component: ReactiveExample2Component;
  let fixture: ComponentFixture<ReactiveExample2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveExample2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveExample2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
