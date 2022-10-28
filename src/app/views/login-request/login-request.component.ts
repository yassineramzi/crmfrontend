import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-request',
  templateUrl: './login-request.component.html',
  styleUrls: ['./login-request.component.scss']
})
export class LoginRequestComponent implements OnInit {


  arrayPage: any=[
    {
      
      username: 'marwa',
      password :'42@.AZ',

    },

    {
      username: 'manal',
      password :'@:aze21A',

    },


    {
      username: 'chaimae',
      password :'09@RE/az',

    },


  ]







  constructor() { }

  ngOnInit(): void {
  }

}
