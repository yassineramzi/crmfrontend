import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleguesComponent } from './delegues.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleguesRoutingModule } from './delegues-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DelegueModalComponent } from './delegue-modal/delegue-modal.component';

@NgModule({
  declarations: [
    DeleguesComponent,
    DelegueModalComponent
  ],
  imports: [
    DeleguesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule
  ]
})
export class DeleguesModule { }
