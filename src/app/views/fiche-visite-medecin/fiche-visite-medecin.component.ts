import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import Medecin from '../../models/medecin.model';
import { Planification } from '../../models/planification.model';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import MedecinService from '../../services/medecin.service';
import PlanificationService from '../../services/planification.service';
import PotentielService from '../../services/potentiel.service';
import StatisticsService from '../../services/statistics.service';

@Component({
  selector: 'app-fiche-visite-medecin',
  templateUrl: './fiche-visite-medecin.component.html',
  styleUrls: ['./fiche-visite-medecin.component.scss']
})
export class FicheVisiteMedecinComponent {

  public ficheVisiteMedecinForm: FormGroup = this.formBuilder.group({
    date : new FormControl(null),
    time : new FormControl(null),
    duree : new FormControl(null),
    typeVisite : new FormControl(null),
    note : new FormControl(null),
  });

  public medecin: Medecin = new Medecin();

  public medecinInitials: string;

  public isInfoOpened: boolean = false;

  public echelleAdoption: number = 0;

  public hour: number = 9;

  public minutes: number = 0;
  
  public minDate: Date = new Date();

  constructor(
    protected potentielService: PotentielService,
    protected formBuilder: FormBuilder,
    protected activatedRoute : ActivatedRoute,
    protected router: Router,
    protected medecinService: MedecinService,
    protected planificationService: PlanificationService,
    protected tokenStorageService: TokenStorageService,
    protected statisticsService: StatisticsService,
    protected toastrService: ToastrService
  ) { 
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
           this.medecinService.update(this.medecin).subscribe(
              response => {
                this.toastrService.success('La mise à jour de la carte visite est réussie', 'Carte visite');
              }
            );
       };
       reader.readAsDataURL(event.target.files[i]);
    }
  }

  public savePlanification(): void {
    const planification: Planification = new Planification();
    planification.proprietaire = this.tokenStorageService.getUser().id;
    planification.medecin = this.medecin.id;
    planification.dateDebut = new Date(this.ficheVisiteMedecinForm.get('date').value);
    planification.dateDebut.setHours(
      Planification.getHours(this.ficheVisiteMedecinForm.get('time').value).valueOf(),
      Planification.getMinutes(this.ficheVisiteMedecinForm.get('time').value).valueOf()
    );
    planification.dateFin = new Date(this.ficheVisiteMedecinForm.get('date').value);
    planification.dateFin.setHours(
      Planification.getHours(this.ficheVisiteMedecinForm.get('time').value).valueOf(),
      (Planification.getMinutes(this.ficheVisiteMedecinForm.get('time').value).valueOf()+this.ficheVisiteMedecinForm.get('duree').value)
    );
    this.planificationService.create(planification).subscribe(
      (response : HttpResponse<Planification>) => {
        this.toastrService.success('La planification est enregistée, vous pouvez le consulter dans votre calendrier', 'Création d\'une planification');
      }
    );
  }

}
