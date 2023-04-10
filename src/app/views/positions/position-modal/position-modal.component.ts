import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Position from '../../../models/position.model';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
import PositionService from '../../../services/position.service';

@Component({
  selector: 'app-position-modal',
  templateUrl: './position-modal.component.html',
  styleUrls: ['./position-modal.component.scss']
})
export class PositionModalComponent implements OnInit {

  public positionsForm : FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    description : new FormControl(null, Validators.required),
    ville : new FormControl(null, Validators.required),
    secteur : new FormControl(null, Validators.required),
    specialite : new FormControl(null, Validators.required),
    potentiel : new FormControl(null, Validators.required)
  });

  public position : Position;

  constructor(
    protected activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
    protected positionService: PositionService,
    protected tokenStorageService: TokenStorageService,
    protected toastr: ToastrService
    ) { }

  ngOnInit(): void {
    if (this.position) {
      this.positionsForm.patchValue({
        id: this.position.id,
        description: this.position.description,
        ville: this.position.ville,
        secteur: this.position.secteur,
        specialite: this.position.specialite,
        potentiel: this.position.potentiel
      });
    }
  }

  public onClose(): void {
    this.activeModal.close();
  }

  public save(): void {
    const position: Position = new Position(this.positionsForm);
    if(position.id == null) {
      this.positionService.create(position).subscribe(
        (response : HttpResponse<Position>) => {
          this.toastr.success('Position créée avec succès', 'Création d\'une position');
          this.onClose();
        },
        (error : any) => {
          this.toastr.error('Une erreur est survenue lors de la création de la position', 'Erreur création d\'une position');
        }
      );
    }else {
      this.positionService.update(position).subscribe(
        (response : HttpResponse<Position>) => {
          this.toastr.success('Position modifiée avec succès', 'Modification d\'une position');
          this.onClose();
        },
        (error : any) => {
          this.toastr.error('Une erreur est survenue lors de la modification de la position', 'Erreur modification d\'une position');
        }
      );
    }
  }

}
