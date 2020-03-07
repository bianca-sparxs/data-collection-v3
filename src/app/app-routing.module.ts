import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RecordSessionComponent} from "./record-session/record-session.component";
import {ViewReferenceComponent} from "./view-reference/view-reference.component";
import {RecordResponseComponent} from "./record-response/record-response.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'record',
    component: RecordSessionComponent,
    children: [
      {
        path: '',
        component: ViewReferenceComponent
      },
      {
        path: 'view',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'response',
        component: RecordResponseComponent
      }
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
