import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsComponent } from './produits.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitsRoutingModule } from './produits-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProduitModalComponent } from './produit-modal/produit-modal.component';

@NgModule({
  declarations: [
    ProduitsComponent,
    ProduitModalComponent
  ],
  imports: [
    ProduitsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule
  ]
})
export class ProduitsModule { }
