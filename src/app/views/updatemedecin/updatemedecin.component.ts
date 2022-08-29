import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import MedecinService from '../../services/medecin.service';

@Component({
  selector: 'app-updatemedecin',
  templateUrl: './updatemedecin.component.html',
  styleUrls: ['./updatemedecin.component.scss']
})
export class UpdatemedecinComponent implements OnInit {

 







  getId:any;
  updateForm:FormGroup;
    constructor( public formBuilder:FormBuilder,
      private router:Router,
      private ngZone:NgZone,
      private activateRoute:ActivatedRoute,
      private medecinSerice:MedecinService) {
  
        this.getId=this.activateRoute.snapshot.paramMap.get('id');
        this.medecinSerice.getMedecin(this.getId).subscribe(res =>{
          console.log(res);
          this.updateForm.setValue({
            name : ['name'],
            price: ['price'],
            description: [' description']
          
        });
       });
  
       this.updateForm= this.formBuilder.group({
        name : [''],
        price: [''],
        description: ['']
      });
    }
    ngOnInit(): void {
    }
  
  
  
    onUpdate():any{
      this.medecinSerice.updateMedecin(this.getId,this.updateForm.value)
      .subscribe(() =>{
        console.log('Data update successfuly');
        this.ngZone.run(()=> this.router.navigateByUrl('/'))
      }
      ,(err)=>{
          console.log(err);
          
      })
    }















}
