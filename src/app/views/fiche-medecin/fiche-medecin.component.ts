import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import PotentielService from '../../services/potentiel.service';
import { MedecinsComponent } from '../medecins/medecins.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-fiche-medecin',
  templateUrl: './fiche-medecin.component.html',
  styleUrls: ['./fiche-medecin.component.scss']
})
export class FicheMedecinComponent implements OnInit {

  public page: number = 1;

  public collectionSize: number = 0;

  public visitesArray: any = new Array<any>();

  public ficheMedecinForm: FormGroup = this.formBuilder.group({
    pageSize: new FormControl(6)
  });

  constructor(
    protected potentielService: PotentielService,
    protected formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public getClassPotentiel(potentiel: string): string {
    return this.potentielService.getClassPotentiel(potentiel);
  }

}
