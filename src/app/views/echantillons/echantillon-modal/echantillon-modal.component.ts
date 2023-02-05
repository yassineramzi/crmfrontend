import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Echantillon from '../../../models/echantillon.model';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
import EchantillonService from '../../../services/echantillon.service';

@Component({
  selector: 'app-echantillon-modal',
  templateUrl: './echantillon-modal.component.html',
  styleUrls: ['./echantillon-modal.component.scss']
})
export class EchantillonModalComponent implements OnInit {

  public echantillonsForm : FormGroup = this.formBuilder.group({
    nom : new FormControl(null, Validators.required),
    categorie : new FormControl(null, Validators.required),
    potentiel : new FormControl(null, Validators.required)
  });

  constructor(
    protected activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
    protected echantillonService: EchantillonService,
    protected tokenStorageService: TokenStorageService,
    protected toastr: ToastrService
    ) { }

  ngOnInit(): void {

  }

  public onClose(): void {
    this.activeModal.close();
  }

  public save(): void {
    const echantillon: Echantillon = new Echantillon(this.echantillonsForm);
    this.echantillonService.create(echantillon).subscribe(
      (response : HttpResponse<Echantillon>) => {
        this.toastr.success('Echantillon créé avec succès', 'Création d\'un echantillon');
        this.onClose();
      }
    );
  }

}
