import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PotentielService from '../../services/potentiel.service';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';
import Produit from '../../models/produit.model';
import { ProduitModalComponent } from './produit-modal/produit-modal.component';
import CritereRechercheProduit from '../../models/critereRechercheProduit.model';
import { HttpResponse } from '@angular/common/http';
import ProduitService from '../../services/produit.service';

type EntityArrayResponseProduitType = HttpResponse<Produit[]>;

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent extends RechercheAbsractComponent<Produit> {
  
  public rechercheProduitForm: FormGroup = this.formBuilder.group(
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
    protected produitService: ProduitService
  ) {
    super(formBuilder, modalService, potentielService);
  }

  public rechercherProduits(): void {
    this.initData();
    const critereRechercheProduit: CritereRechercheProduit = new CritereRechercheProduit(this.rechercheProduitForm);
    this.produitService.search(critereRechercheProduit).subscribe(
      (medecins: EntityArrayResponseProduitType) => {
        this.dataArray = medecins.body;
        this.addItems();
      }
    );
  }

  public initialiserCritereRecherche(): void {
    this.rechercheProduitForm.patchValue(
      {
        nom : null,
        categorie : null,
        potentiel : null
      }
    );
  }

  public openPlanificationModal(): void {
    const modalRef = this.modalService.open(ProduitModalComponent, {size: 'md'});
  }

  public selectionner(id: number): void {
    const predicate: any = (entite: Produit)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    let entiteSelectionne: Produit = this.entiteSelectionnes.find(predicate);
    if (entiteSelectionne) {
      const idProduitSelectionne = this.entiteSelectionnes.indexOf(entiteSelectionne);
      this.entiteSelectionnes.splice(idProduitSelectionne, 1);
    } else {
      entiteSelectionne = this.dataArray.find(predicate);
      this.entiteSelectionnes.push(entiteSelectionne);
    }
  }

  public isSelectionne(id: number): boolean {
    const predicate: any = (entite: Produit)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    return this.entiteSelectionnes.some(predicate);
  }

}
