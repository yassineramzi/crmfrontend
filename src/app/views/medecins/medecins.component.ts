

import { AddmedecinComponent } from './../addmedecin/addmedecin.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import CritereRechercheMedecin from '../../models/critereRechercheMedecin.model';
import RechercheAbsractComponent from '../commun/rechercheAbsract.component';
import Medecin from '../../models/medecin.model';
import MedecinService from '../../services/medecin.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanificationModalComponent } from './planification-modal/planification-modal.component';

import { Router, ActivatedRoute } from '@angular/router';

type EntityArrayResponseMedecinType = HttpResponse<Medecin[]>;

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html'
})
export class MedecinsComponent extends RechercheAbsractComponent<Medecin> implements OnInit{ 
 
  getId:any;

  formupdate  :FormGroup

  formMedecin :FormGroup
  private newAttribute: any = {};
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


 
   
  

  //table delete
deleteFieldValue(index) {
  this.dataArrayPage.splice(index, 1);
}





  //update
updateItem(mede){


    //trouver l'index d'objet mede dans la table
  let index = this.dataArrayPage.findIndex(mede =>mede.id === 1);

    //modifier la table dans l'index 
  this.dataArrayPage[index] = 
  {
    id: 3,
    nom: this.formupdate.value.nom,
   prenom: this.formupdate.value.prenom,

   mobile: this.formupdate.value.mobile,

   adresse: this.formupdate.value.adresse,

   potentiel: this.formupdate.value.potentiel,
  
   secteur:  {
    id: 1,
    nom: this.formupdate.value.secteur,
    ville: {
      id: 1,
      nom: this.formupdate.value.secteur,
    }
   },

   specialite: {
    id: 1,
    nom: this.formupdate.value.specialite,
   },
  }

 
  console.log(this.dataArrayPage);
  this.formupdate.reset()
}








  //table add
 add(){ 
  

  
  this.dataArrayPage.push( {
    id: 3,
    nom: this.formMedecin.value.nom,
   prenom: this.formMedecin.value.prenom,

   mobile: this.formMedecin.value.mobile,

   adresse: this.formMedecin.value.adresse,

   potentiel: this.formMedecin.value.potentiel,
  
   secteur:  {
    id: 1,
    nom: this.formMedecin.value.secteur,
    ville: {
      id: 1,
      nom: this.formMedecin.value.secteur,
    }
   },

   specialite: {
    id: 1,
    nom: this.formMedecin.value.specialite,
   },
  }
);
 this.formMedecin.reset()

 }








  closeResult = '';

  constructor(
    private activateRoute:ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected modalService: NgbModal,
    private medecinService: MedecinService,
   

  ) {
    super(formBuilder, modalService);
    
    this.getId=this.activateRoute.snapshot.paramMap.get('id');





  



     
  }




  ngOnInit(): void {
    this.medecinService.getMedecins().subscribe((result)=>{
      
      this.dataArrayPage=result;
      
    })



    this.formMedecin = this.formBuilder.group({
      nom: (''),
      specialite: (''),
      mobile: (''),
      secteur: (''),
      adresse : (''),
      potentiel: (''),

  })


  this.formupdate = this.formBuilder.group({
    nom: (''),
    specialite: (''),
    mobile: (''),
    secteur: (''),
    adresse : (''),
    potentiel: (''),

})




      
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



  









  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  
  openup(update) {
    this.modalService.open(update);
  }

  opensup(supprimer) {
    this.modalService.open(supprimer);
  }

}









///api ffunction delete 

 // delete(id:any,i:any){
    
   // this.medecinService.deleteMedecin(id).subscribe(res => {
  //    this.dataArrayPage.splice(i,1)
  //  })
 // }



 
 
///api ffunction  add 
 
 //onSubmit():any{
 // console.log('HI')
  //this.medecinService.addMedecin(this.formMedecin.value)
  //.subscribe(()=>{
 //console.log('Data added ');

 //  this.ngZone.run(()=>this.router.navigateByUrl('/'))
   
 // }
  //,(err)=>{
  // console.log(err);
   
// });
//}



///UPDATE API

//onUpdate():any{
 // this.medecinSerice.updateMedecin(this.getId,this.updateForm.value)
  //.subscribe(() =>{
   // console.log('Data update successfuly');
   // this.ngZone.run(()=> this.router.navigateByUrl('/'))
 // }
 // ,(err)=>{
     // console.log(err);
      
  //})
//}