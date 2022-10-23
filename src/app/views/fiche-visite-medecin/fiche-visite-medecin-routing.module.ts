import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { FicheVisiteMedecinComponent } from './fiche-visite-medecin.component';

const routes: Routes = [
  {
    path: ':id',
    component: FicheVisiteMedecinComponent,
    data: {
      title: 'Fiche visite médecin',
      roles: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FicheVisiteMedecinRoutingModule {}
