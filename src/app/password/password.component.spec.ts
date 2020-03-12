import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'PAGES.LOGIN.TITLE'
    );
  }));
});
