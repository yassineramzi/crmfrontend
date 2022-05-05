import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export default abstract class RechercheAbsractComponent<T> {
    /** Pagination. */
    public pageSize: number = 5;
    public dataArrayPage: Array<T> = [];
    public paginationForm: FormGroup = this.formBuilder.group(
        {
        pageSize: new FormControl(5)
        }
    );
    public dataArray: Array<T> = new Array<T>();
    public dataCollectionSize: number = 0;
    public dataPage: number = 1;

    /** Selection des données. */
    public entiteSelectionnes: Array<T> = new Array<T>();
    
    /** Mode affichage {Liste, Card}. */
    public affichageModeListe: boolean = false;
    
    /** Affichage des critères de recherche. */
    public affichageCritereRecherche: boolean = true;

    constructor(protected formBuilder: FormBuilder) { }

    public refresh(): void {
        this.pageSize = this.pageSizeFormControl.value;
        this.dataArrayPage = this.dataArray
          .slice((this.dataPage - 1) * this.pageSize, (this.dataPage - 1) * this.pageSize + this.pageSize);
        this.dataCollectionSize = this.dataArray.length;
        this.entiteSelectionnes = new Array<T>();
    }

    public afficherCritereRecherche(): void {
      this.affichageCritereRecherche = !this.affichageCritereRecherche;
    }

    public changerAffichage(): void {
      this.affichageModeListe = !this.affichageModeListe;
    }

    public abstract selectionner(id: number): void;

    public abstract isSelectionne(id: number): boolean;

    public get pageSizeFormControl(): FormControl {
        return this.paginationForm.get('pageSize') as FormControl;
    }

}
