import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Medecin from '../../models/medecin.model';
import MedecinService from '../../services/medecin.service';
import { HttpResponse } from '@angular/common/http';
import CritereRechercheMedecin from '../../models/critereRechercheMedecin.model';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';

type EntityArrayResponseMedecinType = HttpResponse<Medecin[]>;

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html'
})
export class MedecinsComponent extends RechercheAbsractComponent<Medecin>{

  public rechercheMedecinForm: FormGroup = this.formBuilder.group(
    {
      secteur : new FormControl(null),
      ville : new FormControl(null),
      specialite : new FormControl(null),
      potentiel : new FormControl(null),
    }
  );

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  sum = 100;
  direction = "";
  array = [];
  

  constructor(
    protected formBuilder: FormBuilder,
    private medecinService: MedecinService
  ) {
    super(formBuilder);
    this.appendItems(0, this.sum);
  }


  addItems(startIndex?, endIndex?, _method?) {
    for (let i = 0; i < this.sum; ++i) {
      this.array[_method]([i, " ", this.generateWord()].join("")); 
    }
  }

  generateWord() {
    return "DM21"+this.sum;
  }

  appendItems(startIndex?, endIndex?) {
    this.addItems(startIndex, endIndex, "push");
  }

  prependItems(startIndex?, endIndex?) {
    this.addItems(startIndex, endIndex, "unshift");
  }

  onScrollDown(ev?) {
    console.log("scrolled down!!", ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);

    this.direction = "down";
  }

  onUp(ev?) {
    console.log("scrolled up!", ev);
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = "up";
  }

  public rechercherMedecins(): void {
    const critereRechercheMedecin: CritereRechercheMedecin = new CritereRechercheMedecin(this.rechercheMedecinForm);
    this.medecinService.search(critereRechercheMedecin).subscribe(
      (medecins: EntityArrayResponseMedecinType) => {
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
        specialite : null,
        potentiel : null
      }
    );
  }

  public selectionner(id: number): void {
    const predicate: any = (entite: Medecin)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    let entiteSelectionne: Medecin = this.entiteSelectionnes.find(predicate);
    if (entiteSelectionne) {
      const idMedecinSelectionne = this.entiteSelectionnes.indexOf(entiteSelectionne);
      this.entiteSelectionnes.splice(idMedecinSelectionne, 1);
    } else {
      entiteSelectionne = this.dataArray.find(predicate);
      this.entiteSelectionnes.push(entiteSelectionne);
    }
  }

  public isSelectionne(id: number): boolean {
    const predicate: any = (entite: Medecin)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    return this.entiteSelectionnes.some(predicate);
  }

}
