import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login-request',
  templateUrl: './login-request.component.html',
  styleUrls: ['./login-request.component.scss']
})
export class LoginRequestComponent implements OnInit {

  formupdate  :FormGroup
  formadd  :FormGroup

  arrayPage: any=[
    {
      id: 1,
      username: 'marwa',
      password :'42@.AZ',

    },

    { id: 2,
      username: 'manal',
      password :'@:aze21A',

    },


    { id: 3,
      username: 'chaimae',
      password :'09@RE/az',

    },


  ]







  constructor(protected modalService: NgbModal, 
    protected formBuilder: FormBuilder,  ) { 
      (modalService);}

  ngOnInit(): void {

    this.formupdate = this.formBuilder.group({
    username: (''),

    password: (''),
  
  })


  this.formadd = this.formBuilder.group({
    username: (''),

    password: (''),
  
    

})

  }




  openup(loginRequest,modifier) {
   

    this.modalService.open(modifier , 
      );
    
      this.formupdate.patchValue
     
      (
        {  
          
          username: loginRequest.username,
          password:  loginRequest.password,
        

           } );   
                   
  }





  

  
updateItem(loginRequest){



let index = this.arrayPage.findIndex(loginRequest=>loginRequest.id);
console.log("looog")

console.log(index)

  
this. arrayPage[index] = 
{

  username : this.formupdate.value.username,
 
  password : this.formupdate.value.password,
}


console.log(this.arrayPage);
this.formupdate.reset()
}


  










  opensup(supprimer) {
    this.modalService.open(supprimer);
  }


  deleteUser(index) {
    this.arrayPage.splice(index, 1);
    console.log(index)
  }





  
openadd(ajouter) {
  this.modalService.open(ajouter);
}


add(){ 
  

  
  this.arrayPage.push( {
    id: 3,
    username: this.formadd.value.username,
    password: this.formadd.value.password,
   
  }
);
 this.formadd.reset()

 }
}
