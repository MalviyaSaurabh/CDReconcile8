import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnifiedDataComponent } from './view-unified-data.component';

describe('ViewUnifiedDataComponent', () => {
  let component: ViewUnifiedDataComponent;
  let fixture: ComponentFixture<ViewUnifiedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUnifiedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUnifiedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
