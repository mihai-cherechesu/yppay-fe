import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
