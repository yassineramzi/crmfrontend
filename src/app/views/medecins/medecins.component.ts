import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Medecin from '../../models/medecin.model';
import PaginationComponent from '../commun/pagination.component';
import MedecinService from '../../services/medecin.service';
import { HttpResponse } from '@angular/common/http';
import CritereRechercheMedecin from '../../models/critereRechercheMedecin.model';

type EntityArrayResponseType = HttpResponse<Medecin[]>;

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html'
})
export class MedecinsComponent extends PaginationComponent<Medecin>{

  public affichageCritereRecherche: boolean = true;

  public rechercheMedecinForm: FormGroup = this.formBuilder.group(
    {
      secteur : new FormControl(null),
      ville : new FormControl(null),
      specialite : new FormControl(null)
    }
  );

  constructor(
    protected formBuilder: FormBuilder,
    private medecinService: MedecinService
  ) {
    super(formBuilder);
  }

  public afficherCritereRecherche(): void {
    this.affichageCritereRecherche = !this.affichageCritereRecherche;
  }

  public rechercherMedecins(): void {
    const critereRechercheMedecin: CritereRechercheMedecin = new CritereRechercheMedecin(this.rechercheMedecinForm);
    this.medecinService.search(critereRechercheMedecin).subscribe(
      (medecins: EntityArrayResponseType) => {
        this.dataArray = medecins.body;
        this.refresh();
      }
    );
  }

  public initialiserCritereRecherche(): void {
    this.rechercheMedecinForm.patchValue(
      {
        secteur : null,
        ville : null,
        specialite : null
      }
    );
  }

}
