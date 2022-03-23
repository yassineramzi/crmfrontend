import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PharmaciesComponent } from './pharmacies.component';
import { PharmaciesRoutingModule } from './pharmacies-routing.module';



@NgModule({
  declarations: [
    PharmaciesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PharmaciesRoutingModule,
    NgbModule
  ]
})
export class PharmaciesModule { }
