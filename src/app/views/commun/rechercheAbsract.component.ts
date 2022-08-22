import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PotentielService from '../../services/potentiel.service';

@Component({
  template: ''
})
export default abstract class RechercheAbsractComponent<T> {
    /** Pagination. */
    public pageSize: number = 6;
    public dataArrayPage: Array<T> = [];
    public dataArray: Array<T> = new Array<T>();
    public dataPage: number = 1;
    public throttle: number = 300;
    public scrollDistance: number = 1;
    public scrollUpDistance: number = 2;

    /** Selection des données. */
    public entiteSelectionnes: Array<T> = new Array<T>();
    
    /** Mode affichage {Liste, Card}. */
    public affichageModeListe: boolean = false;
    
    /** Affichage des critères de recherche. */
    public affichageCritereRecherche: boolean = true;

    constructor(
      protected formBuilder: FormBuilder,
      protected modalService: NgbModal,
      protected potentielService: PotentielService
      ) { }

    protected initData(): void {
      this.dataArray = [];
      this.dataArrayPage = [];
      this.entiteSelectionnes = [];
    }
    
    public addItems(): void {
      let startIndex: number = this.dataArrayPage.length;
      let endIndex: number   = this.dataArrayPage.length + this.pageSize;
        this.dataArrayPage = this.dataArrayPage.concat(
          this.dataArray
          .slice(startIndex, endIndex)
        );
    }

    public afficherCritereRecherche(): void {
      this.affichageCritereRecherche = !this.affichageCritereRecherche;
    }

    public changerAffichage(): void {
      this.affichageModeListe = !this.affichageModeListe;
    }

    public getClassPotentiel(potentiel: string): string {
      return this.potentielService.getClassPotentiel(potentiel);
    }

    public abstract openPlanificationModal(): void;

    public abstract selectionner(id: number): void;

    public abstract isSelectionne(id: number): boolean;

}
