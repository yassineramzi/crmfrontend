import { FormGroup } from '@angular/forms';

export default class Position {
  id: number;
  description: string;
  ville: string;
  secteur: string;
  specialite: string;
  potentiel: string;

  constructor(formGroup?: FormGroup) {
    if(formGroup) {
        this.id = formGroup.get('id').value;
        this.description = formGroup.get('description').value;
        this.ville = formGroup.get('ville').value;
        this.secteur = formGroup.get('secteur').value;
        this.specialite = formGroup.get('specialite').value;
        this.potentiel = formGroup.get('potentiel').value;
    }
  }
}