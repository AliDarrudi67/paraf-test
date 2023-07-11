import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewComponent} from "./pages/person/view/view.component";
import {ListComponent} from "./pages/person/list/list.component";

const routes: Routes = [
  {
    path:'',
    component:ListComponent,
  },
  {
    path:'person/list',
    component:ListComponent
  },
  {
    path:'person/view/:id',
    component:ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
