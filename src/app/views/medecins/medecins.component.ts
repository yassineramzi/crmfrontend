import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Medecin from '@models/medecin.model';
import { PaginationComponent } from '@views/commun/pagination.component';

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html'
})
export class MedecinsComponent extends PaginationComponent<Medecin>{

  public affichageCritereRecherche: boolean = true;

  constructor(
    protected formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  public afficherCritereRecherche(): void {
    this.affichageCritereRecherche = !this.affichageCritereRecherche;
  }

}
