import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheVisiteMedecinComponent } from './fiche-visite-medecin.component';
import { FicheVisiteMedecinRoutingModule } from './fiche-visite-medecin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    FicheVisiteMedecinComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FicheVisiteMedecinRoutingModule,
    NgbModule,
    TabsModule
  ]
})
export class FicheVisiteMedecinModule { }
