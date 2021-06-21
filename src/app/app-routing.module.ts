import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent} from './register/register.component';
import { LoginComponent} from  './login/login.component';
import { AddBusComponent } from './admin/add-bus/add-bus.component';
import { DeleteBusComponent } from './admin/delete-bus/delete-bus.component';
import { GetAllTicketsComponent } from './admin/get-all-tickets/get-all-tickets.component';
import { RemoveUserComponent } from './admin/remove-user/remove-user.component';
import { SetAvailabilityComponent } from './admin/set-availability/set-availability.component';
import { ShowAllBusesComponent } from './admin/show-all-buses/show-all-buses.component';
import { BookTicketComponent } from './customer/book-ticket/book-ticket.component';
import { CancelTicketComponent } from './customer/cancel-ticket/cancel-ticket.component';
import { ViewTicketComponent } from './customer/view-ticket/view-ticket.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'addBus', component: AddBusComponent},
  {path: 'deleteBus', component: DeleteBusComponent},
  {path: 'getAllTickets', component: GetAllTicketsComponent},
  {path: 'setAvailability', component: SetAvailabilityComponent},
  {path: 'showAllBuses', component: ShowAllBusesComponent},
  {path: 'removeBus', component: RemoveUserComponent},
  {path: 'bookTicket', component: BookTicketComponent},
  {path: 'cancelTicket', component: CancelTicketComponent},
  {path: 'viewTicket', component: ViewTicketComponent},
  {path: 'about', component: AboutComponent},
  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path : 'error1', component : NotFoundComponent},
  {path: 'servererror', component : ServerErrorComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
