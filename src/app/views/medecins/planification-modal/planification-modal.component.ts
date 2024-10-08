import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Medecin from '../../../models/medecin.model';
import { Planification } from '../../../models/planification.model';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
import PlanificationService from '../../../services/planification.service';

@Component({
  selector: 'app-planification-modal',
  templateUrl: './planification-modal.component.html',
  styleUrls: ['./planification-modal.component.scss']
})
export class PlanificationModalComponent implements OnInit {

  public medecinsSelectiones: Array<Medecin> = new Array();

  public planificationsForm : FormArray = this.formBuilder.array([]);

  public planificationFormDate : FormGroup = this.formBuilder.group({
    date : new FormControl(null, Validators.required)
  });

  public hour: number = 9;

  public minutes: number = 0;
  
  public minDate: Date = new Date();

  constructor(
    protected activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
    protected planificationService: PlanificationService,
    protected tokenStorageService: TokenStorageService,
    protected toastr: ToastrService
    ) { }

  ngOnInit(): void {
    const proprietaire: number = this.tokenStorageService.getUser().id;
    for(let i=0; i<this.medecinsSelectiones.length; i++) {
      const medecin: Medecin = this.medecinsSelectiones[i];
      const formGroupPlanification: FormGroup = this.formBuilder.group({
        id : medecin.id,
        time : new FormControl(null),
        proprietaire : proprietaire
      });
      formGroupPlanification.patchValue({
        time : this.getTime()
      });
      this.planificationsForm.push(
        formGroupPlanification
      );
    }
  }

  public deleteMedecinFromSelection(medecinSelectionne: Medecin): void {
    this.medecinsSelectiones.splice(this.medecinsSelectiones.indexOf(medecinSelectionne),1);
    const formMedecinSelectionne: AbstractControl = this.planificationsForm.controls.find(value=> {return value.value.id === medecinSelectionne.id;});
    this.planificationsForm.controls.splice(this.planificationsForm.controls.indexOf(formMedecinSelectionne),1);
  }

  public onClose(): void {
    this.activeModal.close();
  }

  public save(): void {
    const planifications : Planification[] = new Array();
    this.planificationsForm.controls.forEach(
      (planificationControl: FormControl) => {
        planifications.push(
          new Planification(planificationControl, new Date(this.planificationFormDate.get("date").value))
        );
      }
    );
    this.planificationService.planifierEnMasse(planifications).subscribe(
      (response : HttpResponse<Planification[]>) => {
        this.toastr.success('Vous pouvez les consulter depuis votre calendrier', 'Planifications en masse');
        this.onClose();
      }
    );
  }

  private getTime(): string {
    const hourByIndexStr: string = this.hour <= 9 ? '0'+this.hour : this.hour.toString();
    const minutesByIndexStr: string = this.minutes == 0 ? '00' : '30';
    this.hour = (this.minutes == 0 ? this.hour : (this.hour+1));
    this.minutes = this.minutes == 0 ? 30 : 0;
    return hourByIndexStr+':'+minutesByIndexStr;
  }

}
