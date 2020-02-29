import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSummarizedDataComponent } from './view-summarized-data.component';

describe('ViewSummarizedDataComponent', () => {
  let component: ViewSummarizedDataComponent;
  let fixture: ComponentFixture<ViewSummarizedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSummarizedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSummarizedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
