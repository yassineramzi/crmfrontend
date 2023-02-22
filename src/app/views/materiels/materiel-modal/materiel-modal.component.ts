import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Materiel from '../../../models/materiel.model';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
import MaterielService from '../../../services/materiel.service';

@Component({
  selector: 'app-materiel-modal',
  templateUrl: './materiel-modal.component.html',
  styleUrls: ['./materiel-modal.component.scss']
})
export class MaterielModalComponent implements OnInit {

  public materielsForm : FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nom : new FormControl(null, Validators.required),
    description : new FormControl(null, Validators.required),
    categorie : new FormControl(null, Validators.required),
    potentiel : new FormControl(null, Validators.required)
  });

  public materiel : Materiel;

  constructor(
    protected activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
    protected materielService: MaterielService,
    protected tokenStorageService: TokenStorageService,
    protected toastr: ToastrService
    ) { }

  ngOnInit(): void {
    if (this.materiel) {
      this.materielsForm.patchValue({
        id: this.materiel.id,
        nom: this.materiel.nom,
        description: this.materiel.description,
        categorie: this.materiel.categorie,
        potentiel: this.materiel.potentiel
      });
    }
  }

  public onClose(): void {
    this.activeModal.close();
  }

  public save(): void {
    const materiel: Materiel = new Materiel(this.materielsForm);
    if(materiel.id == null) {
      this.materielService.create(materiel).subscribe(
        (response : HttpResponse<Materiel>) => {
          this.toastr.success('Materiel créé avec succès', 'Création d\'un materiel');
          this.onClose();
        },
        (error : any) => {
          this.toastr.error('Un matériel existe dèjà avec le nom : '+materiel.nom, 'Erreur création d\'un matériel');
        }
      );
    }else {
      this.materielService.update(materiel).subscribe(
        (response : HttpResponse<Materiel>) => {
          this.toastr.success('Materiel modifié avec succès', 'Modification d\'un materiel');
          this.onClose();
        },
        (error : any) => {
          this.toastr.error('Un matériel existe dèjà avec le nom : '+materiel.nom, 'Erreur modification d\'un matériel');
        }
      );
    }
  }

}
