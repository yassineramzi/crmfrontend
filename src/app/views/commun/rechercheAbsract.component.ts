import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PotentielService from '../../services/potentiel.service';

@Component({
  template: ''
})
export default abstract class RechercheAbsractComponent<T> {
    /** Pagination. */
    public pageSize: number = 10;
    public dataArrayPage: Array<T> = [];
    public dataArray: Array<T> = new Array<T>();
    public dataPage: number = 1;
    public collectionSize: number = 0;

    public paginationForm: FormGroup = this.formBuilder.group({
      pageSize: new FormControl(10)
    });

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

    public refreshData(): void {
      this.pageSize = this.pageSizeFormControl.value;
      this.dataArrayPage = this.dataArray
        .slice((this.dataPage - 1) * this.pageSize, (this.dataPage - 1) * this.pageSize + this.pageSize);
      this.collectionSize = this.dataArray.length;
      console.log(this.dataArrayPage);
    }

    public get pageSizeFormControl(): FormControl {
      return this.paginationForm.get('pageSize') as FormControl;
    }

    public abstract selectionner(id: number): void;

    public abstract isSelectionne(id: number): boolean;

}
