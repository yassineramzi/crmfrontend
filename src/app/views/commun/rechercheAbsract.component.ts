import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export default abstract class RechercheAbsractComponent<T> {
    /** Pagination. */
    public pageSize: number = 5;
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

    constructor(protected formBuilder: FormBuilder) { }

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

    public getClassPotentiel(potentiel: string){
      switch(potentiel) {
        case 'A+':
          return 'potentiel-A-plus';
        case 'A':
          return 'potentiel-A';
        case 'B+':
          return 'potentiel-B-plus';
        case 'B':
          return 'potentiel-B';
        case 'C+':
          return 'potentiel-C-plus';
        case 'C':
          return 'potentiel-C';
      }
    }

    public abstract selectionner(id: number): void;

    public abstract isSelectionne(id: number): boolean;

}
