import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Pharmacie from '../../models/pharmacie.model';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html'
})
export class PharmaciesComponent extends RechercheAbsractComponent<Pharmacie>{

  constructor(
    protected formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  public selectionner(id: number): void {
    const predicate: any = (entite: Pharmacie)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    let entiteSelectionne: Pharmacie = this.entiteSelectionnes.find(predicate);
    if (entiteSelectionne) {
      const idPharmacieSelectionne = this.entiteSelectionnes.indexOf(entiteSelectionne);
      this.entiteSelectionnes.splice(idPharmacieSelectionne, 1);
    } else {
      entiteSelectionne = this.dataArray.find(predicate);
      this.entiteSelectionnes.push(entiteSelectionne);
    }
  }

  public isSelectionne(id: number): boolean {
    const predicate: any = (entite: Pharmacie)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    return this.entiteSelectionnes.some(predicate);
  }
}
