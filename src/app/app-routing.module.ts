import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {path:'',component:DetailsComponent},
  {path:'dashboard',component:DetailsComponent},
  {path:'userprofile',component:FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
