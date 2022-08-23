import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheMedecinComponent } from './fiche-medecin.component';
import { FicheMedecinRoutingModule } from './fiche-medecin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FicheMedecinComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FicheMedecinRoutingModule,
    NgbModule,
  ]
})
export class FicheMedecinModule { }
