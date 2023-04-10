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
    idPosition: number;
    
    constructor(formGroup?: FormGroup, societe?: Societe){
        if(formGroup) {
            this.id = formGroup.get(['id'])!.value;
            this.nom = formGroup.get(['nom'])!.value;
            this.prenom = formGroup.get(['prenom'])!.value;
            this.login = formGroup.get(['login'])!.value;
            this.email = formGroup.get(['email'])!.value;
            this.fixe = formGroup.get(['fixe'])!.value;
            this.mobile = formGroup.get(['mobile'])!.value;
            this.idPosition = formGroup.get(['idPosition'])!.value;
            this.societe = societe;
        }
    }
}