import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import CritereRechercheMedecin from '../../models/critereRechercheMedecin.model';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';
import Medecin from '../../models/medecin.model';
import MedecinService from '../../services/medecin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanificationModalComponent } from './planification-modal/planification-modal.component';
import PotentielService from '../../services/potentiel.service';
import PositionService from '../../services/position.service';
import Position from '../../models/position.model';
import { TokenStorageService } from '../../services/auth/token-storage.service';

type EntityArrayResponseMedecinType = HttpResponse<Medecin[]>;

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html'
})
export class MedecinsComponent extends RechercheAbsractComponent<Medecin>{

  public rechercheMedecinForm: FormGroup = this.formBuilder.group(
    {
      secteur : new FormControl(null),
      ville : new FormControl(null),
      specialite : new FormControl(null),
      potentiel : new FormControl(null),
    }
  );
  
  private position: Position; 

  constructor(
    protected formBuilder: FormBuilder,
    protected modalService: NgbModal,
    protected potentielService: PotentielService,
    private medecinService: MedecinService,
    private positionService: PositionService,
    private tokenStorageService: TokenStorageService
  ) {
    super(formBuilder, modalService, potentielService);
    this.initData();
  }

  private _initRechercheFromPosition(): void {
    if(this.position) {
      this.rechercheMedecinForm.patchValue({
        secteur : this.position.secteur,
        ville : this.position.ville,
        specialite : this.position.specialite,
        potentiel : this.position.potentiel
      });
    }
  }

  protected initData(): void {
    super.initData();
    const idPosition: number = this.tokenStorageService.getUser().idPosition;
    if(idPosition) {
      this.positionService.findById(idPosition).subscribe(
        (response: HttpResponse<Position>) => {
          this.position = response.body;
          this._initRechercheFromPosition();
          this.rechercherMedecins();
        }
      );
    }
  }

  public rechercherMedecins(): void {
    const critereRechercheMedecin: CritereRechercheMedecin = new CritereRechercheMedecin(this.rechercheMedecinForm);
    this.medecinService.search(critereRechercheMedecin).subscribe(
      (medecins: EntityArrayResponseMedecinType) => {
        this.dataArray = medecins.body;
        this.refreshData();
      }
    );
  }

  public initialiserCritereRecherche(): void {
    this.rechercheMedecinForm.patchValue(
      {
        secteur : null,
        ville : null,
        specialite : null,
        potentiel : null
      }
    );
  }

  public selectionner(id: number): void {
    const predicate: any = (entite: Medecin)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    let entiteSelectionne: Medecin = this.entiteSelectionnes.find(predicate);
    if (entiteSelectionne) {
      const idMedecinSelectionne = this.entiteSelectionnes.indexOf(entiteSelectionne);
      this.entiteSelectionnes.splice(idMedecinSelectionne, 1);
    } else {
      entiteSelectionne = this.dataArray.find(predicate);
      this.entiteSelectionnes.push(entiteSelectionne);
    }
  }

  public isSelectionne(id: number): boolean {
    const predicate: any = (entite: Medecin)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    return this.entiteSelectionnes.some(predicate);
  }

  public openPlanificationModal(): void {
    const modalRef = this.modalService.open(PlanificationModalComponent, {size: 'md'});
    modalRef.componentInstance.medecinsSelectiones = this.entiteSelectionnes;
  }
}
