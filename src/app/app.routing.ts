import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
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
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
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
      },
      {
        path: 'fiche-medecin',
        loadChildren: () => import('./views/fiche-medecin/fiche-medecin.module').then(m => m.FicheMedecinModule)
      },
      {
        path: 'fiche-visite-medecin',
        loadChildren: () => import('./views/fiche-visite-medecin/fiche-visite-medecin.module').then(m => m.FicheVisiteMedecinModule)
      },
      {
        path: 'produits',
        loadChildren: () => import('./views/produits/produits.module').then(m => m.ProduitsModule)
      },
      {
        path: 'echantillons',
        loadChildren: () => import('./views/echantillons/echantillons.module').then(m => m.EchantillonsModule)
      },
      {
        path: 'materiels',
        loadChildren: () => import('./views/materiels/materiels.module').then(m => m.MaterielsModule)
      },
      {
        path: 'delegues',
        loadChildren: () => import('./views/delegues/delegues.module').then(m => m.DeleguesModule)
      },
      {
        path: 'positions',
        loadChildren: () => import('./views/positions/positions.module').then(m => m.PositionsModule)
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
