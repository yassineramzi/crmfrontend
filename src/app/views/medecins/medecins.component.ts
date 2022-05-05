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

  public affichageModeListe: boolean = false;

  public medecinsSelectionnes: Array<Medecin> = new Array();

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

  public changerAffichage(): void {
    this.affichageModeListe = !this.affichageModeListe;
  }

  public selectionnerMedecin(id: number): void {
    const predicateMedecin: any = (medecin: Medecin)=>{
      if(medecin.id === id) {
        return medecin;
      }else {
        return null;
      }
    };
    let medecinSelectionne: Medecin = this.medecinsSelectionnes.find(predicateMedecin);
    if (medecinSelectionne) {
      const idMedecinSelectionne = this.medecinsSelectionnes.indexOf(medecinSelectionne);
      this.medecinsSelectionnes.splice(idMedecinSelectionne, 1);
    } else {
      medecinSelectionne = this.dataArray.find(predicateMedecin);
      this.medecinsSelectionnes.push(medecinSelectionne);
    }
  }

  public isMedecinSelectionne(id: number): boolean {
    const predicateMedecin: any = (medecin: Medecin)=>{
      if(medecin.id === id) {
        return medecin;
      }else {
        return null;
      }
    };
    return this.medecinsSelectionnes.some(predicateMedecin);
  }

}
