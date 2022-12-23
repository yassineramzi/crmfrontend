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
    nom : new FormControl(null, Validators.required),
    categorie : new FormControl(null, Validators.required),
    potentiel : new FormControl(null, Validators.required)
  });

  constructor(
    protected activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
    protected produitService: ProduitService,
    protected tokenStorageService: TokenStorageService,
    protected toastr: ToastrService
    ) { }

  ngOnInit(): void {

  }

  public onClose(): void {
    this.activeModal.close();
  }

  public save(): void {
    const produit: Produit = new Produit(this.produitsForm);
    this.produitService.create(produit).subscribe(
      (response : HttpResponse<Produit>) => {
        this.toastr.success('Produit créé avec succès', 'Création d\'un produit');
        this.onClose();
      }
    );
  }

}
