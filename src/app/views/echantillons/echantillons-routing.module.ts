import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { EchantillonsComponent } from './echantillons.component';

const routes: Routes = [
  {
    path: '',
    component: EchantillonsComponent,
    data: {
      title: 'Echantillons',
      roles: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EchantillonsRoutingModule {}
