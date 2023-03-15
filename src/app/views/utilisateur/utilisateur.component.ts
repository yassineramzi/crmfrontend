import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  formupdate :FormGroup
  formadd :FormGroup

  arrayPage: any=[
    {
      id: 1,
      token: '2334]',
     type: 'synchrone',

     username: 'youssra',

     email: 'youss.dou@gmail.com',

     societe:  {
      id: 1,
      nom: 'thinline',
      
     },
     roles: ['admin', 'editor']
     
    },

    {
      id: 2,
      token: '2774]',
     type: 'synchrone',

     username: 'nora',

     email: 'nora.dou@gmail.com',

     societe:  {
      id: 2,
      nom: 'thinline',
      
     },
     roles: ['admin']
     
    },

    {
      id: 3,
      token: 'ç999990',
     type: 'synchrone',

     username: 'laura',

     email: 'laura.dou@gmail.com',

     societe:  {
      id: 2,
      nom: 'thinline',
      
     },
     roles: ['admin']
     
    },



  ]



  

  //table add
  add(){ 
  

  
    this.arrayPage.push( {
      
      token: this.formadd.value.token,
     type: this.formadd.value.type,
     id: 7,
  
     username: this.formadd.value.username,
  
     email: this.formadd.value.email,
  
     societe: {
      
      nom: this.formadd.value.societe,
     },

     
     roles: this.formadd.value.roles,
    }
  );
  
  console.log(this.arrayPage);
  
  this.formadd.reset()
   }
  
  
  

  



  constructor(  protected modalService: NgbModal,    
                protected formBuilder: FormBuilder,)
                 {  (modalService);}

  ngOnInit(): void {

    this.formadd = this.formBuilder.group({
      token: [''],
      type: [''],
      id: [''],
      username: [''],
      email: [''],
      societe: this.formBuilder.group({
        nom: [''],
        
      }),
      roles: this.formBuilder.array([])
    });




  this.formupdate= this.formBuilder.group({
    token: (''),
    type: (''),
    username: (''),
    email: (''),
    societe: (''),
    roles: (''),
})

  }



  openadd(ajouter) {
    this.modalService.open(ajouter);
  }
  
  


   openup(jwtResponse,modifier) {
   

    this.modalService.open(modifier , 
      );
      
      this.formupdate.patchValue
     
      (
        {  
          
          token: jwtResponse.token,
          type: jwtResponse.type,
        
          username: jwtResponse.username,
          email: jwtResponse.email,
         societe: {
            id: 1,
            nom: jwtResponse.societe,
           },
           roles: jwtResponse.roles,

                 } );   
                   
  }





  
updateItem(jwtResponse){

let index = this.arrayPage.findIndex(jwtResponse =>jwtResponse.id);
console.log("looog")

this.arrayPage[index] = 
{

  token: this.formupdate.value.token,
 type: this.formupdate.value.type,

 username: this.formupdate.value.username,

 email: this.formupdate.value.email,

 societe: {
  id: 1,
  nom: this.formupdate.value.societe,
 },
 roles: this.formupdate.value.roles,
}


console.log(this.arrayPage);
this.formupdate.reset()
}



opensup(supprimer) {
  this.modalService.open(supprimer);
}



deleteuser(index) {
  this.arrayPage.splice(index, 1);
  console.log(index)
}

  

}
