import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionsComponent } from './positions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositionsRoutingModule } from './positions-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PositionModalComponent } from './position-modal/position-modal.component';

@NgModule({
  declarations: [
    PositionsComponent,
    PositionModalComponent
  ],
  imports: [
    PositionsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule
  ]
})
export class PositionsModule { }
