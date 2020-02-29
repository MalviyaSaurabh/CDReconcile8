import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrListDetailsComponent } from './cdr-list-details.component';

describe('CdrListDetailsComponent', () => {
  let component: CdrListDetailsComponent;
  let fixture: ComponentFixture<CdrListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdrListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdrListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
