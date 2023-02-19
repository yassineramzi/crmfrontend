import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PotentielService from '../../services/potentiel.service';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';
import Materiel from '../../models/materiel.model';
import { MaterielModalComponent } from './materiel-modal/materiel-modal.component';
import CritereRechercheMateriel from '../../models/critereRechercheMateriel.model';
import { HttpResponse } from '@angular/common/http';
import MaterielService from '../../services/materiel.service';

type EntityArrayResponseMaterielType = HttpResponse<Materiel[]>;

@Component({
  selector: 'app-materiels',
  templateUrl: './materiels.component.html',
  styleUrls: ['./materiels.component.scss']
})
export class MaterielsComponent extends RechercheAbsractComponent<Materiel> {
  
  public rechercheMaterielForm: FormGroup = this.formBuilder.group(
    {
      nom : new FormControl(null),
      categorie : new FormControl(null),
      potentiel : new FormControl(null),
      description : new FormControl(null)
    }
  );

  constructor(
    protected formBuilder: FormBuilder,
    protected modalService: NgbModal,
    protected potentielService: PotentielService,
    protected materielService: MaterielService
  ) {
    super(formBuilder, modalService, potentielService);
    this.affichageModeListe = true;
  }

  public rechercherMateriels(): void {
    this.initData();
    const critereRechercheMateriel: CritereRechercheMateriel = new CritereRechercheMateriel(this.rechercheMaterielForm);
    this.materielService.search(critereRechercheMateriel).subscribe(
      (medecins: EntityArrayResponseMaterielType) => {
        this.dataArray = medecins.body;
        this.addItems();
      }
    );
  }

  public initialiserCritereRecherche(): void {
    this.rechercheMaterielForm.patchValue(
      {
        nom : null,
        categorie : null,
        potentiel : null,
        description : null
      }
    );
  }

  public openModal(materiel?: Materiel): void {
    const modalRef = this.modalService.open(MaterielModalComponent, {size: 'md'});
    modalRef.componentInstance.materiel = materiel;
    modalRef.result.then(() => {
      this.rechercherMateriels();
    });
  }

  public selectionner(id: number): void {
    const predicate: any = (entite: Materiel)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    let entiteSelectionne: Materiel = this.entiteSelectionnes.find(predicate);
    if (entiteSelectionne) {
      const idMaterielSelectionne = this.entiteSelectionnes.indexOf(entiteSelectionne);
      this.entiteSelectionnes.splice(idMaterielSelectionne, 1);
    } else {
      entiteSelectionne = this.dataArray.find(predicate);
      this.entiteSelectionnes.push(entiteSelectionne);
    }
  }

  public isSelectionne(id: number): boolean {
    const predicate: any = (entite: Materiel)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    return this.entiteSelectionnes.some(predicate);
  }

  public delete(): void {
    if(confirm("Voulez-vous supprimer les materiels selectionnés ?")) {
      this.entiteSelectionnes.forEach( materiel => {
        this.materielService.delete(materiel.id).subscribe(
          response => {
            this.rechercherMateriels();
          }
        );
      });
    }
  }

  public edit(idMateriel: number): void {
    let materiel: Materiel = this.dataArray.filter(
      materielTemp => materielTemp.id === idMateriel
    )[0];
    if ( materiel !== null ) {
      this.openModal(materiel);
    }
  }

  public deleteOne(idMateriel: number): void {
    if(confirm("Voulez-vous supprimer ce materiel ?")) {
      this.materielService.delete(idMateriel).subscribe(
        response => {
          this.rechercherMateriels();
        }
      );
    }
  }
}
