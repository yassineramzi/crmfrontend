import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { FicheMedecinComponent } from './fiche-medecin.component';

const routes: Routes = [
  {
    path: ':id',
    component: FicheMedecinComponent,
    data: {
      title: 'Fiche médecin',
      roles: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FicheMedecinRoutingModule {}
