import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCdrComponent } from './add-cdr.component';

describe('AddCdrComponent', () => {
  let component: AddCdrComponent;
  let fixture: ComponentFixture<AddCdrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCdrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
