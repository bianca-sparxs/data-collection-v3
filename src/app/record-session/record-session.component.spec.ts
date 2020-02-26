import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSessionComponent } from './record-session.component';

describe('RecordSessionComponent', () => {
  let component: RecordSessionComponent;
  let fixture: ComponentFixture<RecordSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
