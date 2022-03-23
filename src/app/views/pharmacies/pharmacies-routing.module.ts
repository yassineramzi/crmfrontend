import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PharmaciesComponent } from './pharmacies.component';

const routes: Routes = [
  {
    path: '',
    component: PharmaciesComponent,
    data: {
      title: 'Pharmacies'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmaciesRoutingModule {}
