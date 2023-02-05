import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { MaterielsComponent } from './materiels.component';

const routes: Routes = [
  {
    path: '',
    component: MaterielsComponent,
    data: {
      title: 'Materiels',
      roles: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterielsRoutingModule {}
