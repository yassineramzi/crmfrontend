import Specialite from './specialite.model';
import { FormGroup } from '@angular/forms';

export default class Produit {
    public id: number;

    public nom: string;

    public categorie: String;

    public potentiel: String;

    constructor(formGroup?: FormGroup){
        if(formGroup) {
            this.nom = formGroup.get(['nom'])!.value;
            this.categorie = formGroup.get(['categorie'])!.value;
            this.potentiel = formGroup.get(['potentiel'])!.value;
        }
    }
}