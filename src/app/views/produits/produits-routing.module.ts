import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { ProduitsComponent } from './produits.component';

const routes: Routes = [
  {
    path: '',
    component: ProduitsComponent,
    data: {
      title: 'Produits',
      roles: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitsRoutingModule {}
