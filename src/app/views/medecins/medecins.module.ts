import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MedecinsComponent } from './medecins.component';
import { MedecinsRoutingModule } from './medecins-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    MedecinsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedecinsRoutingModule,
    NgbModule,
    InfiniteScrollModule
  ]
})
export class MedecinsModule { }
