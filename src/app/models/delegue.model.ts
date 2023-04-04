import { FormGroup } from "@angular/forms";
import Societe from "./societe.model";

export default class Delegue {
    id: number;
    nom: string;
    prenom: string;
    login: string;
    email: string;
    fixe: string;
    mobile: string;
    societe: Societe;
    
    constructor(formGroup?: FormGroup, societe?: Societe){
        if(formGroup) {
            this.id = formGroup.get(['id'])!.value;
            this.nom = formGroup.get(['nom'])!.value;
            this.prenom = formGroup.get(['categorie'])!.value;
            this.login = formGroup.get(['potentiel'])!.value;
            this.email = formGroup.get(['description'])!.value;
            this.fixe = formGroup.get(['dosage'])!.value;
            this.mobile = formGroup.get(['photo'])!.value;
            this.societe = societe;
        }
    }
}