import { ApiService } from './../api.service';
import { RouterModule, Routes, Router }  from '@angular/router';
import { Http } from '@angular/http';
import { Appointment } from './../appointment';


//test code
import {Component, NgModule, VERSION, OnInit, OnDestroy} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  filteredAppts = [];
  appointments = [];
  user;

  term: FormControl = new FormControl(); // form control of text input
  termSubscription; // subscription of term eventEmitter sequence

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private _http: Http,
  ) { }

  ngOnInit() {
    this.appointments = this._apiService.appts(); //fill in appointments array on initialize of index component
    this.user = this._apiService.loggedIn(); //who's currently logged in brought into component
    console.log(this.user, "Current user")
    // this._apiService.clearAnswers();  // clear out answers array in service upon each visit to index
    
    // // console.log(this.user);
    // console.log(`Questions array in index ${this.questions}`);

    this.appointments = this.appointments.sort((a,b) => {
      var dateA = new Date(a.date).getTime();
      var dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1; 
    });

    this.filteredAppts = this.appointments;

    this.termSubscription = this.term.valueChanges // event emitter that fires when formControl value changes
    .debounceTime(400) // only continue sequence if event has not emitted in the past 400 milliseconds
    .distinctUntilChanged() // only continue sequence if value has changed from last event emit
    .subscribe(
      term => {
          // determine filterBy value
          let filterBy = term ? term.toLowerCase() : null;
          // do case insensitive search
          let filteredA = filterBy 
            ? this.appointments.filter(item => item.complaint.toLowerCase().indexOf(filterBy) !== -1)
            : this.appointments;
          // generate display array
          this.filteredAppts = filteredA;
        }
    )
  }

  delete(id){
    // console.log(id)
    this._apiService.deleteAppt(id);
    this._apiService.refreshAppts();  //clear out service array of appts
    this._apiService.getAppointments();  //refresh service array of appts
    this.appointments = []; // reset components array
    this.appointments = this._apiService.appts() // set component array to service appts array
    this.filteredAppts = [];
    this.filteredAppts = this.appointments;
  }

  logout(){
    this._apiService.logout();
  }

  // ngOnDestroy(){
  //   // unsubscribe from subscription to avoid memory leak
  //   this.termSubscription.unsubscribe();
  // }

}
