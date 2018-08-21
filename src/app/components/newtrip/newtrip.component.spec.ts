import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtripComponent } from './newtrip.component';

describe('NewtripComponent', () => {
  let component: NewtripComponent;
  let fixture: ComponentFixture<NewtripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
