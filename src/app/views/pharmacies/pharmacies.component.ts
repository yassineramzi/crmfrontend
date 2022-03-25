import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Pharmacie from '@models/pharmacie.model';
import { PaginationComponent } from '@views/commun/pagination.component';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html'
})
export class PharmaciesComponent extends PaginationComponent<Pharmacie>{

  public affichageCritereRecherche: boolean = false;

  constructor(
    protected formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  public afficherCritereRecherche(): void {
    this.affichageCritereRecherche = !this.affichageCritereRecherche;
  }

}
