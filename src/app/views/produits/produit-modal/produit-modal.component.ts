import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Produit from '../../../models/produit.model';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
import ProduitService from '../../../services/produit.service';

@Component({
  selector: 'app-produit-modal',
  templateUrl: './produit-modal.component.html',
  styleUrls: ['./produit-modal.component.scss']
})
export class ProduitModalComponent implements OnInit {

  public produitsForm : FormGroup = this.formBuilder.group({
    id : new FormControl(null),
    nom : new FormControl(null, Validators.required),
    categorie : new FormControl(null, Validators.required),
    potentiel : new FormControl(null, Validators.required)
  });

  public produit: Produit;

  constructor(
    protected activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
    protected produitService: ProduitService,
    protected tokenStorageService: TokenStorageService,
    protected toastr: ToastrService
    ) { }

    ngOnInit(): void {
      if (this.produit) {
        this.produitsForm.patchValue({
          id: this.produit.id,
          nom: this.produit.nom,
          categorie: this.produit.categorie,
          potentiel: this.produit.potentiel
        });
      }
    }

  public onClose(): void {
    this.activeModal.close();
  }

  public save(): void {
    const produit: Produit = new Produit(this.produitsForm);

    if(produit.id == null) {
      this.produitService.create(produit).subscribe(
        (response : HttpResponse<Produit>) => {
          this.toastr.success('Produit créé avec succès', 'Création d\'un produit');
          this.onClose();
        },
        (error : any) => {
          this.toastr.error('Un produit existe dèjà avec le nom : '+produit.nom, 'Erreur création d\'un produit');
        }
      );
    }else {
      this.produitService.update(produit).subscribe(
        (response : HttpResponse<Produit>) => {
          this.toastr.success('Produit modifié avec succès', 'Modification d\'un produit');
          this.onClose();
        },
        (error : any) => {
          this.toastr.error('Un produit existe dèjà avec le nom : '+produit.nom, 'Erreur modification d\'un produit');
        }
      );
    }
    
  }

}
