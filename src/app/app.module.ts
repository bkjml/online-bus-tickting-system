import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {HttpClientModule} from "@angular/common/http"; 
import { AppComponent } from './app.component';
import { MdbModule } from 'mdb-angular-ui-kit';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer/footer.component';
import { RestService } from './Services/rest.service';
import { HeadComponent } from './head/head.component';

import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { LoginComponent } from './login/login.component';
import { AddBusComponent } from './admin/add-bus/add-bus.component';
import { DeleteBusComponent } from './admin/delete-bus/delete-bus.component';
import { RemoveUserComponent } from './admin/remove-user/remove-user.component';
import { GetAllTicketsComponent } from './admin/get-all-tickets/get-all-tickets.component';
import { ShowAllBusesComponent } from './admin/show-all-buses/show-all-buses.component';
import { SetAvailabilityComponent } from './admin/set-availability/set-availability.component';
import { BookTicketComponent } from './customer/book-ticket/book-ticket.component';
import { ViewTicketComponent } from './customer/view-ticket/view-ticket.component';
import { CancelTicketComponent } from './customer/cancel-ticket/cancel-ticket.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeadComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    ServerErrorComponent,
    LoginComponent,
    AddBusComponent,
    DeleteBusComponent,
    RemoveUserComponent,
    GetAllTicketsComponent,
    ShowAllBusesComponent,
    SetAvailabilityComponent,
    BookTicketComponent,
    ViewTicketComponent,
    CancelTicketComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    MdbModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
