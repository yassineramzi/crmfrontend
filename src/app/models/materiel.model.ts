import { FormGroup } from '@angular/forms';

export default class Materiel {
    public id: number;

    public nom: string;

    public description: string;

    public categorie: String;

    public potentiel: String;

    constructor(formGroup?: FormGroup){
        if(formGroup) {
            this.id = formGroup.get(['id'])!.value;
            this.nom = formGroup.get(['nom'])!.value;
            this.description = formGroup.get(['description'])!.value;
            this.categorie = formGroup.get(['categorie'])!.value;
            this.potentiel = formGroup.get(['potentiel'])!.value;
        }
    }
}