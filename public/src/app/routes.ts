import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent , pathMatch: 'full' },
    { path: 'appointments', component: IndexComponent },
    { path: 'new_appointment', component: NewComponent },
    // { path: 'question/:id', component: ShowComponent },
    // { path: 'question/:id/new_answer', component: AnswerComponent }
];
export const routing = RouterModule.forRoot(APP_ROUTES);