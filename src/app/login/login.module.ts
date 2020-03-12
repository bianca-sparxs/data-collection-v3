import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

// import { PasswordComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  // declarations: [PasswordComponent],
  imports: [CommonModule, SharedModule, LoginRoutingModule]
})
export class LoginModule {}
