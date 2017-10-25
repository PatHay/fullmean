import { Component, OnInit } from '@angular/core';
import { Appointment } from './../appointment';
import { ApiService } from './../api.service';
import { RouterModule, Routes, Router }  from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {


  currentDate = new Date();
  user;
  tomorrow = this.currentDate.setDate(this.currentDate.getDate()+1); // set for future date

  newAppt: Appointment = new Appointment(
    "", //user = string
    "", //date = date
    "", //time = string
    "", //complaint = string
    ""
  );

  private appts = [];
  

  constructor(
    private _apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.appts = this._apiService.appts();
    this.user = this._apiService.loggedIn();
    console.log(this.appts, "appts array")
  }


  onSubmit(){
  // console.log(this.newAppt);
  
  // for( var i = 0; i < this.appts.length; i++){
  //   if(this.user == this.appts[i].user && this.newAppt.date == this.appts[i].date){

  //   } else {}
  // }

  this._apiService.createAppointment(this.newAppt);

    //Resetting new Appt to blank
  this.newAppt = new Appointment(
    "",
    "",
    "",
    "",
    ""
  );

  this._apiService.refreshAppts();  // clear out current service appts array
  this._apiService.getAppointments();  // get new appts array list
  this.router.navigateByUrl("/appointments");   // Navigate back to index

  }
}
