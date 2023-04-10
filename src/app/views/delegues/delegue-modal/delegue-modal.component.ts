import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Delegue from '../../../models/delegue.model';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
import DelegueService from '../../../services/delegue.service';
import { JwtResponse } from '../../../models/jwtResponse.model';
import CritereRecherchePosition from '../../../models/critereRecherchePosition.model';
import Position from '../../../models/position.model';
import PositionService from '../../../services/position.service';

@Component({
  selector: 'app-delegue-modal',
  templateUrl: './delegue-modal.component.html',
  styleUrls: ['./delegue-modal.component.scss']
})
export class DelegueModalComponent implements OnInit {

  public deleguesForm : FormGroup = this.formBuilder.group({
    id : [null],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fixe: ['', Validators.pattern('^[0-9]{10}$')],
    mobile: ['', Validators.pattern('^[0-9]{10}$')],
    login: ['', Validators.required],
    idPosition : [null]
  });

  public delegue: Delegue;

  public positions: Array<Position>;

  constructor(
    protected activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
    protected delegueService: DelegueService,
    protected tokenStorageService: TokenStorageService,
    protected toastr: ToastrService,
    protected positionService: PositionService
    ) { this._initPositions(); }

    ngOnInit(): void {
      if (this.delegue) {
        this.deleguesForm.patchValue({
          id: this.delegue.id,
        });
      }
    }
    
    private _initPositions(): void {
      this.positionService.search(new CritereRecherchePosition()).subscribe(
        (response : HttpResponse<Position[]>) => {
          this.positions = response.body;
        }
      );
    }

    public onClose(): void {
      this.activeModal.close();
    }

    public save(): void {
      const token: JwtResponse = this.tokenStorageService.getUser();
      const delegue: Delegue = new Delegue(this.deleguesForm, token.societe);
      if(delegue.id == null) {
        this.delegueService.create(delegue).subscribe(
          (response : HttpResponse<Delegue>) => {
            this.toastr.success('Delegue créé avec succès', 'Création d\'un delegue');
            this.onClose();
          },
          (error : any) => {
            this.toastr.error('Un delegue existe dèjà avec le nom : '+delegue.nom, 'Erreur création d\'un delegue');
          }
        );
      }else {
        this.delegueService.update(delegue).subscribe(
          (response : HttpResponse<Delegue>) => {
            this.toastr.success('Delegue modifié avec succès', 'Modification d\'un delegue');
            this.onClose();
          },
          (error : any) => {
            this.toastr.error('Un delegue existe dèjà avec le nom : '+delegue.nom, 'Erreur modification d\'un delegue');
          }
        );
      }
    
  }

}
