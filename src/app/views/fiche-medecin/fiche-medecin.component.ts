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
import StatisticsService from '../../services/statistics.service';

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

  public medecinInitials: string;

  public isInfoOpened: boolean = false;

  public echelleAdoption: number = 0;

  constructor(
    protected potentielService: PotentielService,
    protected formBuilder: FormBuilder,
    protected activatedRoute : ActivatedRoute,
    protected router: Router,
    protected medecinService: MedecinService,
    protected planificationService: PlanificationService,
    protected tokenStorageService: TokenStorageService,
    protected statisticsService: StatisticsService
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
              this.planificationService.getPlanificationsByUserAndMedecin(this.tokenStorageService.getUser().id, params ['id']),
              this.statisticsService.getEchelleAdoptionByMedecinAndSociete(params ['id'], this.tokenStorageService.getUser().societe.id)
            ]
          ).subscribe(
            results => {
              if(results[0] == null) {
                this.router.navigate(['/404']);
              }
              this.medecin = results[0].body;
              this.medecin.carteVisite = this.medecin.carteVisite ? this.medecin.carteVisite : '../../../assets/img/visit-card.webp';
              this.medecinInitials = this.medecin.nom.charAt(0).toUpperCase() + this.medecin.prenom.charAt(0).toUpperCase();
              this.visitesArray = results[1].body;
              this.refreshVisites();
              this.echelleAdoption = results[2].body.ratioAdoption;
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

  public openCloseInfo(): void {
    this.isInfoOpened = !this.isInfoOpened;
  }

  public medecinCarteVisiteUpload(event:any): void {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
           this.medecin.carteVisite = event.target.result;
       };
       reader.readAsDataURL(event.target.files[i]);
    }
    this.medecinService.update(this.medecin).subscribe(
      response => {

      }
    );
  }

  public get pageSizeFormControl(): FormControl {
    return this.ficheMedecinForm.get('pageSize') as FormControl;
  }
}
