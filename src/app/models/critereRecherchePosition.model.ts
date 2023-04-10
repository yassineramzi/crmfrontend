import { FormGroup } from '@angular/forms';
export default class CritereRechercheMateriel {
    public specialite: string;
    public ville: string;
    public secteur: string;
    public potentiel: string;

    public constructor(formGroup: FormGroup) {
        if(formGroup !== null && formGroup !== undefined) {
            this.specialite = formGroup.get(['specialite'])!.value;
            this.ville = formGroup.get(['ville'])!.value;
            this.secteur = formGroup.get(['secteur'])!.value;
            this.potentiel = formGroup.get(['potentiel'])!.value;
        }
    }
}