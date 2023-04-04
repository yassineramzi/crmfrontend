import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { DeleguesComponent } from './delegues.component';

const routes: Routes = [
  {
    path: '',
    component: DeleguesComponent,
    data: {
      title: 'Délegués',
      roles: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleguesRoutingModule {}
