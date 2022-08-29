import { AuthGuard } from './../../services/auth/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';


import { MedecinsComponent } from './medecins.component';

const routes: Routes = [
  {
    path: '',
    component: MedecinsComponent,
    data:{
         title: "Médecins",
         roles: ['ROLE_ADMIN']
         
    },
    
  
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedecinsRoutingModule {}
