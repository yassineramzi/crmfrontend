import { FormGroup } from "@angular/forms";

export default class CritereRechercheDelegue {
    public nom: string;
    public prenom: string;
    public email: string;

    public constructor(formGroup: FormGroup) {
        if(formGroup) {
            const { nom, prenom, email } = formGroup.value;
            this.nom = nom;
            this.prenom = prenom;
            this.email = email;
        }
    }
}