import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { CalendrierComponent } from './calendrier.component';

const routes: Routes = [
  {
    path: '',
    component: CalendrierComponent,
    data: {
      title: 'Agenda',
      roles: ['ROLE_ADMIN', 'ROLE_DELEGUE']
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendrierRoutingModule {}
