import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MedecinsComponent } from './medecins.component';
import { MedecinsRoutingModule } from './medecins-routing.module';
import { PlanificationModalComponent } from './planification-modal/planification-modal.component';

@NgModule({
  declarations: [
    MedecinsComponent,
    PlanificationModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedecinsRoutingModule,
    NgbModule
  ]
})
export class MedecinsModule { }
