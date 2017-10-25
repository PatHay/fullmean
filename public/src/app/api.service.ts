import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Appointment } from './appointment';
import "rxjs/Rx";


@Injectable()
export class ApiService {

  private user = '';
  private appointments = [];

  constructor(
    private _http: Http,
  ) {
    this.getAppointments();  //get current appointments in database upon initial construction
    console.log("Appts", this.appointments)
  }

  login(user){
    this.user = user;
  }

  logout(){
    this.user = "";
  }

  getAppointments(){
    var allAppts = this._http.get('/appointments')
    .map(data=>data.json())
    .toPromise()

    allAppts.then(data=>{
      // console.log(data);
      for (var i=0; i< data['appointments'].length; i++){

        var newTime = data['appointments'][i].time;
        var suffix = "";

        if(newTime >= 12){
          suffix = "PM";
        } else { suffix = "AM"; };

        var time="";

        if(newTime < 12){
          time = newTime + " " + suffix;
        } else if ( newTime > 12){
          time = (newTime - 12) + " " + suffix;
        } else {
          time = newTime + " " + suffix;
        }

        // var time = (((newTime + 11) % 12) + 1) + " " + suffix; //Not working correctly, have to use hacky way

        var newAppt = new Appointment(
          data['appointments'][i].user,
          data['appointments'][i].date,
          time,
          data['appointments'][i].complaint,
          data['appointments'][i]._id
        )
        this.appointments.push(newAppt); //iterate through json response and push each appt into array
      }
    });
  }

  appts(){
    return this.appointments;
  }

  loggedIn(){
    return this.user;
  }

  refreshAppts(){
    this.appointments = [];
  }

  createAppointment(formData){
    formData.user = this.user;
    this._http.post('/appointments', formData).toPromise()
    .then(data => {
      console.log(`Data response from appt creation ${data}`)
    })
    .catch(err =>{
      console.log(`Error response during appt creation`)
    });
  }

  deleteAppt(id){
    this._http.delete(`/appointments/${id}`).toPromise()
    .then(data=>{
      console.log(data)
    })
    .catch(err=>{
      console.log(err)
    });
  }

}
