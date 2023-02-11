import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.scss']
})
export class SocieteComponent implements OnInit {

  formupdate  :FormGroup
  formadd  :FormGroup


  arrayPage: any=[
    {
      id: 1,
      nom: 'BIOCODEX MAROC',
    },

    {
      id: 2,
      nom: 'BOTTU S.A',
    },
    {
      id: 3,
      nom: 'BAYER S.A',
    },


  ]





  constructor(  protected modalService: NgbModal,    
                protected formBuilder: FormBuilder,  ) 
  
  { 
       (modalService);
  }

  ngOnInit(): void {



    this.formupdate = this.formBuilder.group({
      nom: (''),
      
  
  })


  
  this.formadd = this.formBuilder.group({
    nom: (''),
    

})


  }







   opensup(supprimer) {
    this.modalService.open(supprimer);
  }


  deletesociete(index) {
    this.arrayPage.splice(index, 1);
    console.log(index)
  }





  openup(societe,modifier) {
   

    this.modalService.open(modifier , 
      );
    
      this.formupdate.patchValue
     
      (
        {  
          
          nom: societe.nom,
        
        

           } );   
                   
  }




update(societe){


let index = this.arrayPage.findIndex(societe =>societe.id);
console.log("looog")


this.arrayPage[index] = 
{

  nom: this.formupdate.value.nom,
 
}


console.log(this.arrayPage);
this.formupdate.reset()
}







openadd(ajouter) {
  this.modalService.open(ajouter);
}



add(){ 
  

  
  this.arrayPage.push( {
    id: 3,
    nom: this.formadd.value.nom,
   
  }
);
 this.formadd.reset()

 }

  


}
