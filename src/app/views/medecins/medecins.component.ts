import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import CritereRechercheMedecin from '../../models/critereRechercheMedecin.model';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';
import Medecin from '../../models/medecin.model';
import MedecinService from '../../services/medecin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanificationModalComponent } from './planification-modal/planification-modal.component';

type EntityArrayResponseMedecinType = HttpResponse<Medecin[]>;

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html'
})
export class MedecinsComponent extends RechercheAbsractComponent<Medecin> implements OnInit{ 



  dataArrayPage: any=[
    {
      id: 1,
      nom: 'Benomar Alami',
     prenom: 'Noureddine',

     mobile: '324324',

     adresse: 'agdal',

     potentiel: 'A',
    
     secteur:  {
      id: 1,
      nom: 'public',
      ville: {
        id: 1,
        nom: 'rabat'
      }
     },

     specialite: {
      id: 1,
      nom: 'General Medicine'
     },
    },

    
    {
      id: 2,
      nom: 'El Alami',
     prenom: 'Amal ',

     mobile: '324324',

     adresse: 'Souissi',

     potentiel: 'B',
    
     secteur:  {
      id: 2,
      nom: 'public',
      ville: {
        id: 2,
        nom: 'rabat'
      }
     },

     specialite: {
      id: 2,
      nom: 'Gynaecology'
     },
    },


    {
      id: 3,
      nom: 'Benchekroun',
     prenom: 'Siham ',

     mobile: '324324',

     adresse: 'NOUR',

     potentiel: 'C',
    
     secteur:  {
      id: 3,
      nom: 'privé',
      ville: {
        id: 3,
        nom: 'rabat'
      }
     },

     specialite: {
      id: 3,
      nom: 'Cardiology'
     },
    }


  ]






  public rechercheMedecinForm: FormGroup = this.formBuilder.group(
    {
      secteur : new FormControl(null),
      ville : new FormControl(null),
      specialite : new FormControl(null),
      potentiel : new FormControl(null),
    }
  );



  constructor(
    protected formBuilder: FormBuilder,
    protected modalService: NgbModal,
    private medecinService: MedecinService

  ) {
    super(formBuilder, modalService);




     
  }




  ngOnInit(): void {
    this.medecinService.getMedecins().subscribe((result)=>{
      
      this.dataArrayPage=result;
      
    })
      
      }






  public rechercherMedecins(): void {
    this.initData();
    const critereRechercheMedecin: CritereRechercheMedecin = new CritereRechercheMedecin(this.rechercheMedecinForm);
    this.medecinService.search(critereRechercheMedecin).subscribe(
      (medecins: EntityArrayResponseMedecinType) => {
        this.dataArray = medecins.body;
        this.addItems();
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



  






  delete(id:any,i:any){
    
    this.medecinService.deleteMedecin(id).subscribe(res => {
      this.dataArrayPage.splice(i,1)
    })
  }






  
}
