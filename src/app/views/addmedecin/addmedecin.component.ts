import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import MedecinService from '../../services/medecin.service';

@Component({
  selector: 'app-addmedecin',
  templateUrl: './addmedecin.component.html',
  styleUrls: ['./addmedecin.component.scss']
})
export class AddmedecinComponent implements OnInit {
  formMedecin:FormGroup
    


  constructor(private medecinService:MedecinService,
              private    router:Router,
              public formBuilder :FormBuilder,
              private ngZone: NgZone,
    ) 
    
    
    {
      this.formMedecin = formBuilder.group({
        Nom: new FormControl(''),
        specialite: new FormControl(''),
        Etablissement: new FormControl(''),
        secteur: new FormControl(''),
        Semaine : new FormControl(''),
        potentiel: new FormControl(''),

    })


     }


  ngOnInit(): void {
  }


 onSubmit():any{
    console.log('HI')
    this.medecinService.addMedecin(this.formMedecin.value)
    .subscribe(()=>{
   console.log('Data added ');

     this.ngZone.run(()=>this.router.navigateByUrl('/'))
     
    }
    ,(err)=>{
     console.log(err);
     
   });
 }









}
