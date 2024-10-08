import { FormGroup } from "@angular/forms";

export default class CritereRechercheMedecin {
    public secteur: string;
    public ville: string;
    public specialite: string;
    public potentiel: string;

    public constructor(formGroup: FormGroup) {
        if(formGroup !== null && formGroup !== undefined) {
            this.secteur = formGroup.get(['secteur'])!.value;
            this.ville = formGroup.get(['ville'])!.value;
            this.specialite = formGroup.get(['specialite'])!.value;
            this.potentiel = formGroup.get(['potentiel'])!.value;
        }
    }
}