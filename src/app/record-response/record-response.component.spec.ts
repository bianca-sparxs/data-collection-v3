import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordResponseComponent } from './record-response.component';

describe('RecordResponseComponent', () => {
  let component: RecordResponseComponent;
  let fixture: ComponentFixture<RecordResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
