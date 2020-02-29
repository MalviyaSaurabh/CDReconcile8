import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedCdrDetailsComponent } from './unified-cdr-details.component';

describe('UnifiedCdrDetailsComponent', () => {
  let component: UnifiedCdrDetailsComponent;
  let fixture: ComponentFixture<UnifiedCdrDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnifiedCdrDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnifiedCdrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
