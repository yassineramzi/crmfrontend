import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import Medecin from '../../models/medecin.model';
import { Planification } from '../../models/planification.model';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import MedecinService from '../../services/medecin.service';
import PlanificationService from '../../services/planification.service';
import PotentielService from '../../services/potentiel.service';

@Component({
  selector: 'app-fiche-medecin',
  templateUrl: './fiche-medecin.component.html',
  styleUrls: ['./fiche-medecin.component.scss']
})
export class FicheMedecinComponent implements OnInit {

  public page: number = 1;

  public collectionSize: number = 0;

  public pageSize: number = 4;

  public visitesArray: Planification[] = new Array<Planification>();

  public visitesArrayPage: Planification[] = new Array<Planification>();

  public ficheMedecinForm: FormGroup = this.formBuilder.group({
    pageSize: new FormControl(6)
  });

  public medecin: Medecin = null;

  public activeTab: string = 'Visites'; 

  public nomDelegue: string = '';

  constructor(
    protected potentielService: PotentielService,
    protected formBuilder: FormBuilder,
    protected activatedRoute : ActivatedRoute,
    protected router: Router,
    protected medecinService: MedecinService,
    protected planificationService: PlanificationService,
    protected tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.nomDelegue = this.tokenStorageService.getUser().username;
    this.activatedRoute.params.subscribe(
      (params) => {
        if( params ['id'] )
        {
          forkJoin(
            [
              this.medecinService.findById(params ['id']),
              this.planificationService.getPlanificationsByUser(this.tokenStorageService.getUser().id)
            ]
          ).subscribe(
            results => {
              if(results[0] == null) {
                this.router.navigate(['/404']);
              }
              this.medecin = results[0].body;
              this.visitesArray = results[1].body;
              this.refreshVisites();
            }
          );
        } else {
          this.router.navigate(['/404']);
        }
      }
    );
  }

  public getClassPotentiel(potentiel: string): string {
    return this.potentielService.getClassPotentiel(potentiel);
  }

  public changeTab(activeTabTitle: string): void {
    this.activeTab = activeTabTitle;
  }

  public refreshVisites(): void {
    this.pageSize = this.pageSizeFormControl.value;
    this.visitesArrayPage = this.visitesArray
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.collectionSize = this.visitesArray.length;
  }

  public get pageSizeFormControl(): FormControl {
    return this.ficheMedecinForm.get('pageSize') as FormControl;
  }
}
