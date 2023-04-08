import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';

import { PharmaciesComponent } from './pharmacies.component';

const routes: Routes = [
  {
    path: '',
    component: PharmaciesComponent,
    data: {
      title: 'Pharmacies',
      roles: ['ROLE_ADMIN','ROLE_DELEGUE']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmaciesRoutingModule {}
