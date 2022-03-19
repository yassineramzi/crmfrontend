import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedecinsComponent } from './medecins.component';
import { FormsModule } from '@angular/forms';
import { MedecinsRoutingModule } from './medecins-routing.module';



@NgModule({
  declarations: [
    MedecinsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MedecinsRoutingModule
  ]
})
export class MedecinsModule { }
