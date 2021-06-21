import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss']
})
export class BookTicketComponent implements OnInit {

  constructor(private restService: RestService, private router : Router) { }

  ngOnInit(): void {
  }
  tick = []

  bookTicket(bookTicketForm: NgForm) {
    this.restService.bookTicket(bookTicketForm.value).subscribe((tickets : any) => {
      this.tick = tickets[0]["Ticket"]
      if (this.tick != null) {
        //console.log(tickets);
        alert('Ticket Booked Successfully please note id to alter ticket');
        bookTicketForm.reset();
      }else if(this.tick == null) {
        alert('incorrect credentials');
        bookTicketForm.reset();
      }else {
        //console.log(tickets);
        alert('Failed To Book Ticket');
        this.router.navigateByUrl('/error1');
        
      }
    }, ((error) =>{
      this.router.navigateByUrl('/servererror');
    })
    );
  }

}
