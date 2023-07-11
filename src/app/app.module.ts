import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalcAgePipe} from "./pipes/age.pipe";
import {MatSelectModule} from "@angular/material/select";
import {BtnEditRenderer} from "./button-edit-render";
import {BtnViewRenderer} from "./button-view-render";
import {MatButtonModule} from "@angular/material/button";
import { ViewComponent } from './pages/person/view/view.component';
import { ListComponent } from './pages/person/list/list.component';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    CalcAgePipe,
    BtnEditRenderer,
    BtnViewRenderer,
    ViewComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule, MatNativeDateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [CalcAgePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}

