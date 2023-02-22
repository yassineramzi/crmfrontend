import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import CritereRechercheProduit from '../../../models/critereRechercheProduit.model';
import Echantillon from '../../../models/echantillon.model';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
import EchantillonService from '../../../services/echantillon.service';
import ProduitService from '../../../services/produit.service';
import Produit from '../../../models/produit.model';

type EntityArrayResponseProduitType = HttpResponse<Produit[]>;

@Component({
  selector: 'app-echantillon-modal',
  templateUrl: './echantillon-modal.component.html',
  styleUrls: ['./echantillon-modal.component.scss']
})
export class EchantillonModalComponent implements OnInit {

  public echantillonsForm : FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nom : new FormControl(null, Validators.required),
    description : new FormControl(null),
    categorie : new FormControl(null, Validators.required),
    potentiel : new FormControl(null, Validators.required),
    dosage : new FormControl(null, Validators.required),
    photo : new FormControl(null),
    forme : new FormControl(null, Validators.required),
    numLot : new FormControl(null, Validators.required),
    idProduitLie : new FormControl(null, Validators.required),
    quantite : new FormControl(null, Validators.required),
  });

  public echantillon : Echantillon;

  public produits : Array<Produit>;

  constructor(
    protected activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
    protected echantillonService: EchantillonService,
    protected tokenStorageService: TokenStorageService,
    protected toastr: ToastrService,
    protected produitService: ProduitService
    ) { }

  ngOnInit(): void {
    this.produitService.search(new CritereRechercheProduit()).subscribe(
      (produits: EntityArrayResponseProduitType) => {
        this.produits = produits.body;
      }
    );
    if (this.echantillon) {
      this.echantillonsForm.patchValue({
        id: this.echantillon.id,
        nom: this.echantillon.nom,
        description: this.echantillon.description,
        categorie: this.echantillon.categorie,
        potentiel: this.echantillon.potentiel,
        dosage : this.echantillon.dosage,
        photo : this.echantillon.photo,
        forme : this.echantillon.forme,
        numLot : this.echantillon.numLot,
        idProduitLie : this.echantillon.idProduitLie,
        quantite : this.echantillon.quantite,
      });
    }
  }

  public onClose(): void {
    this.activeModal.close();
  }

  public save(): void {
    const echantillon: Echantillon = new Echantillon(this.echantillonsForm);
    if(echantillon.id == null) {
      this.echantillonService.create(echantillon).subscribe(
        (response : HttpResponse<Echantillon>) => {
          this.toastr.success('Echantillon créé avec succès', 'Création d\'un echantillon');
          this.onClose();
        },
        (error : any) => {
          this.toastr.error('Un échantillon existe dèjà avec le nom : '+echantillon.nom, 'Erreur création d\'un échantillon');
        }
      );
    } else {
      this.echantillonService.update(echantillon).subscribe(
        (response : HttpResponse<Echantillon>) => {
          this.toastr.success('Echantillon modifié avec succès', 'Modification d\'un echantillon');
          this.onClose();
        },
        (error : any) => {
          this.toastr.error('Un échantillon existe dèjà avec le nom : '+echantillon.nom, 'Erreur modification d\'un échantillon');
        }
      );
    }
  }

}
