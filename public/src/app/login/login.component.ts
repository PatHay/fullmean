import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { RouterModule, Routes, Router }  from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  user = '';

  
    onSubmit(){
      this._apiService.login(this.user);
      this.router.navigateByUrl("/appointments");
    }

}
