import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchantillonsComponent } from './echantillons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EchantillonsRoutingModule } from './echantillons-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EchantillonModalComponent } from './echantillon-modal/echantillon-modal.component';

@NgModule({
  declarations: [
    EchantillonsComponent,
    EchantillonModalComponent
  ],
  imports: [
    EchantillonsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule
  ]
})
export class EchantillonsModule { }
