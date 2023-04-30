import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PotentielService from '../../services/potentiel.service';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';
import Position from '../../models/position.model';
import { PositionModalComponent } from './position-modal/position-modal.component';
import CritereRecherchePosition from '../../models/critereRecherchePosition.model';
import { HttpResponse } from '@angular/common/http';
import PositionService from '../../services/position.service';

type EntityArrayResponsePositionType = HttpResponse<Position[]>;

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent extends RechercheAbsractComponent<Position> {
  
  public recherchePositionForm: FormGroup = this.formBuilder.group(
    {
      description : new FormControl(null),
      ville : new FormControl(null),
      secteur : new FormControl(null),
      potentiel : new FormControl(null),
      specialite : new FormControl(null)
    }
  );

  constructor(
    protected formBuilder: FormBuilder,
    protected modalService: NgbModal,
    protected potentielService: PotentielService,
    protected positionService: PositionService
  ) {
    super(formBuilder, modalService, potentielService);
    this.affichageModeListe = true;
    this.rechercherPositions();
  }

  public rechercherPositions(): void {
    this.initData();
    const critereRecherchePosition: CritereRecherchePosition = new CritereRecherchePosition(this.recherchePositionForm);
    this.positionService.search(critereRecherchePosition).subscribe(
      (medecins: EntityArrayResponsePositionType) => {
        this.dataArray = medecins.body;
        this.refreshData();
      }
    );
  }

  public initialiserCritereRecherche(): void {
    this.recherchePositionForm.patchValue(
      {
        description : null,
        ville : null,
        specialite : null,
        potentiel : null,
        secteur : null
      }
    );
  }

  public openModal(position?: Position): void {
    const modalRef = this.modalService.open(PositionModalComponent, {size: 'md'});
    modalRef.componentInstance.position = position;
    modalRef.result.then(() => {
      this.rechercherPositions();
    });
  }

  public selectionner(id: number): void {
    const predicate: any = (entite: Position)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    let entiteSelectionne: Position = this.entiteSelectionnes.find(predicate);
    if (entiteSelectionne) {
      const idPositionSelectionne = this.entiteSelectionnes.indexOf(entiteSelectionne);
      this.entiteSelectionnes.splice(idPositionSelectionne, 1);
    } else {
      entiteSelectionne = this.dataArray.find(predicate);
      this.entiteSelectionnes.push(entiteSelectionne);
    }
  }

  public isSelectionne(id: number): boolean {
    const predicate: any = (entite: Position)=>{
      if(entite.id === id) {
        return entite;
      }else {
        return null;
      }
    };
    return this.entiteSelectionnes.some(predicate);
  }

  public delete(): void {
    if(confirm("Voulez-vous supprimer les positions selectionnés ?")) {
      this.entiteSelectionnes.forEach( position => {
        this.positionService.delete(position.id).subscribe(
          response => {
            this.rechercherPositions();
          }
        );
      });
    }
  }

  public edit(idPosition: number): void {
    let position: Position = this.dataArray.filter(
      positionTemp => positionTemp.id === idPosition
    )[0];
    if ( position !== null ) {
      this.openModal(position);
    }
  }

  public deleteOne(idPosition: number): void {
    if(confirm("Voulez-vous supprimer cette position ?")) {
      this.positionService.delete(idPosition).subscribe(
        response => {
          this.rechercherPositions();
        }
      );
    }
  }
}
