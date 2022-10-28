
import { AddmedecinComponent } from './views/addmedecin/addmedecin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { SocieteComponent } from './views/societe/societe.component';





export const routes: Routes = [
  
  {path: "add",component:AddmedecinComponent},
  
  
  
  
  
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Accueil'
    },
    children: [

      {
        path: 'societe',
        component:SocieteComponent
      },

      {
        path: 'medecins',
        loadChildren: () => import('./views/medecins/medecins.module').then(m => m.MedecinsModule)
      },
      {
        path: 'pharmacies',
        loadChildren: () => import('./views/pharmacies/pharmacies.module').then(m => m.PharmaciesModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('./views/calendrier/calendrier.module').then(m => m.CalendrierModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
