import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PotentielService from '../../services/potentiel.service';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';
import Delegue from '../../models/delegue.model';
import { DelegueModalComponent } from './delegue-modal/delegue-modal.component';
import CritereRechercheDelegue from '../../models/critereRechercheDelegue.model';
import { HttpResponse } from '@angular/common/http';
import DelegueService from '../../services/delegue.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { JwtResponse } from '../../models/jwtResponse.model';

type EntityArrayResponseDelegueType = HttpResponse<Delegue[]>;

@Component({
  selector: 'app-delegues',
  templateUrl: './delegues.component.html',
  styleUrls: ['./delegues.component.scss']
})
export class DeleguesComponent extends RechercheAbsractComponent<Delegue> {
  
  public rechercheDelegueForm: FormGroup = this.formBuilder.group(
    {
      nom : new FormControl(null),
      prenom : new FormControl(null),
      email : new FormControl(null)
    }
  );

  constructor(
    protected formBuilder: FormBuilder,
    protected modalService: NgbModal,
    protected potentielService: PotentielService,
    protected delegueService: DelegueService,
    protected tokenStorageService: TokenStorageService
  ) {
    super(formBuilder, modalService, potentielService);
    this.affichageModeListe = true;
    this.findAll();
  }

  public rechercherDelegues(): void {
    this.initData();
    const critereRechercheDelegue: CritereRechercheDelegue = new CritereRechercheDelegue(this.rechercheDelegueForm);
    this.delegueService.search(critereRechercheDelegue).subscribe(
      (delegues: EntityArrayResponseDelegueType) => {
        this.dataArray = delegues.body;
        this.addItems();
      }
    );
  }

  public findAll(): void {
    const token: JwtResponse = this.tokenStorageService.getUser();
    this.delegueService.findAll(token.societe.id).subscribe(
      (delegues: EntityArrayResponseDelegueType) => {
        this.dataArray = delegues.body;
        this.addItems();
      }
    );
  }

  public initialiserCritereRecherche(): void {
    this.rechercheDelegueForm.patchValue(
      {
        nom : null,
        categorie : null,
        potentiel : null
      }
    );
  }

  public openModal(delegue?: Delegue): void {
    const modalRef = this.modalService.open(DelegueModalComponent, {size: 'md'});
    modalRef.componentInstance.delegue = delegue;
    modalRef.result.then(() => {
      this.rechercherDelegues();
    });
  }

  public selectionner(id: number): void {
    const predicate: any = (entite: Delegue)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    let entiteSelectionne: Delegue = this.entiteSelectionnes.find(predicate);
    if (entiteSelectionne) {
      const idDelegueSelectionne = this.entiteSelectionnes.indexOf(entiteSelectionne);
      this.entiteSelectionnes.splice(idDelegueSelectionne, 1);
    } else {
      entiteSelectionne = this.dataArray.find(predicate);
      this.entiteSelectionnes.push(entiteSelectionne);
    }
  }

  public isSelectionne(id: number): boolean {
    const predicate: any = (entite: Delegue)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    return this.entiteSelectionnes.some(predicate);
  }

  public delete(): void {
    if(confirm("Voulez-vous supprimer les delegues selectionnés ?")) {
      this.entiteSelectionnes.forEach( delegue => {
        this.delegueService.delete(delegue.id).subscribe(
          response => {
            this.rechercherDelegues();
          }
        );
      });
    }
  }
  
  public edit(idDelegue: number): void {
    let delegue: Delegue = this.dataArray.filter(
      delegueTemp => delegueTemp.id === idDelegue
    )[0];
    if ( delegue !== null ) {
      this.openModal(delegue);
    }
  }

  public deleteOne(idDelegue: number): void {
    if(confirm("Voulez-vous supprimer ce delegue ?")) {
      this.delegueService.delete(idDelegue).subscribe(
        response => {
          this.rechercherDelegues();
        }
      );
    }
  }
}
