import { FormGroup } from '@angular/forms';
export default class CritereRechercheEchantillon {
    public nom: string;
    public categorie: string;
    public potentiel: string;

    public constructor(formGroup: FormGroup) {
        if(formGroup !== null && formGroup !== undefined) {
            this.nom = formGroup.get(['nom'])!.value;
            this.categorie = formGroup.get(['categorie'])!.value;
            this.potentiel = formGroup.get(['potentiel'])!.value;
        }
    }
}