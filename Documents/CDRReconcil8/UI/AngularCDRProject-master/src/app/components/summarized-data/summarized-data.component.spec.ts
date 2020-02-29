import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizedDataComponent } from './summarized-data.component';

describe('SummarizedDataComponent', () => {
  let component: SummarizedDataComponent;
  let fixture: ComponentFixture<SummarizedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarizedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
