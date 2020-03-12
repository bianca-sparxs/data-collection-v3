import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  // declarations: [PasswordComponent],
  imports: [CommonModule, SharedModule, PasswordRoutingModule]
})
export class PasswordModule {}
