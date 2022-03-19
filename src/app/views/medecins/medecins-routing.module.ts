import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedecinsComponent } from './medecins.component';

const routes: Routes = [
  {
    path: '',
    component: MedecinsComponent,
    data: {
      title: 'Médecins'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedecinsRoutingModule {}
