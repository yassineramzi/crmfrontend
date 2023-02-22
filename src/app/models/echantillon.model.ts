import { FormGroup } from '@angular/forms';

export default class Echantillon {
    public id: number;

    public nom: string;

    public description: string;

    public categorie: String;

    public potentiel: String;

    public dosage: String;

    public photo: String;

    public forme: String;

    public numLot: String ;

    public idProduitLie: number;

    public quantite: number;

    constructor(formGroup?: FormGroup){
        if(formGroup) {
            this.id = formGroup.get(['id'])!.value;
            this.nom = formGroup.get(['nom'])!.value;
            this.categorie = formGroup.get(['categorie'])!.value;
            this.potentiel = formGroup.get(['potentiel'])!.value;
            this.description = formGroup.get(['description'])!.value;
            this.dosage = formGroup.get(['dosage'])!.value;
            this.photo = formGroup.get(['photo'])!.value;
            this.forme = formGroup.get(['forme'])!.value;
            this.numLot = formGroup.get(['numLot'])!.value;
            this.idProduitLie = formGroup.get(['idProduitLie'])!.value;
            this.quantite = formGroup.get(['quantite'])!.value;
        }
    }
}