import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password.component';

const routes: Routes = [
  {
    path: 'password',
    component: PasswordComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule {}
