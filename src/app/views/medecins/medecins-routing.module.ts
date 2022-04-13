import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';

import { MedecinsComponent } from './medecins.component';

const routes: Routes = [
  {
    path: '',
    component: MedecinsComponent,
    data: {
      title: 'Médecins',
      roles: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedecinsRoutingModule {}
