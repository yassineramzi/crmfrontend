import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PotentielService from '../../services/potentiel.service';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';
import Echantillon from '../../models/echantillon.model';
import { EchantillonModalComponent } from './echantillon-modal/echantillon-modal.component';
import CritereRechercheEchantillon from '../../models/critereRechercheEchantillon.model';
import { HttpResponse } from '@angular/common/http';
import EchantillonService from '../../services/echantillon.service';

type EntityArrayResponseEchantillonType = HttpResponse<Echantillon[]>;

@Component({
  selector: 'app-echantillons',
  templateUrl: './echantillons.component.html',
  styleUrls: ['./echantillons.component.scss']
})
export class EchantillonsComponent extends RechercheAbsractComponent<Echantillon> {
  
  public rechercheEchantillonForm: FormGroup = this.formBuilder.group(
    {
      nom : new FormControl(null),
      categorie : new FormControl(null),
      potentiel : new FormControl(null)
    }
  );

  constructor(
    protected formBuilder: FormBuilder,
    protected modalService: NgbModal,
    protected potentielService: PotentielService,
    protected echantillonService: EchantillonService
  ) {
    super(formBuilder, modalService, potentielService);
    this.affichageModeListe = true;
  }

  public rechercherEchantillons(): void {
    this.initData();
    const critereRechercheEchantillon: CritereRechercheEchantillon = new CritereRechercheEchantillon(this.rechercheEchantillonForm);
    this.echantillonService.search(critereRechercheEchantillon).subscribe(
      (medecins: EntityArrayResponseEchantillonType) => {
        this.dataArray = medecins.body;
        this.addItems();
      }
    );
  }

  public initialiserCritereRecherche(): void {
    this.rechercheEchantillonForm.patchValue(
      {
        nom : null,
        categorie : null,
        potentiel : null
      }
    );
  }

  public openPlanificationModal(): void {
    const modalRef = this.modalService.open(EchantillonModalComponent, {size: 'md'});
  }

  public selectionner(id: number): void {
    const predicate: any = (entite: Echantillon)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    let entiteSelectionne: Echantillon = this.entiteSelectionnes.find(predicate);
    if (entiteSelectionne) {
      const idEchantillonSelectionne = this.entiteSelectionnes.indexOf(entiteSelectionne);
      this.entiteSelectionnes.splice(idEchantillonSelectionne, 1);
    } else {
      entiteSelectionne = this.dataArray.find(predicate);
      this.entiteSelectionnes.push(entiteSelectionne);
    }
  }

  public isSelectionne(id: number): boolean {
    const predicate: any = (entite: Echantillon)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    return this.entiteSelectionnes.some(predicate);
  }

}