import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielsComponent } from './materiels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterielsRoutingModule } from './materiels-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterielModalComponent } from './materiel-modal/materiel-modal.component';

@NgModule({
  declarations: [
    MaterielsComponent,
    MaterielModalComponent
  ],
  imports: [
    MaterielsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule
  ]
})
export class MaterielsModule { }
