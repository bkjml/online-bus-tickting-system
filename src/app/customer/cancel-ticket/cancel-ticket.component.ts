import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-cancel-ticket',
  templateUrl: './cancel-ticket.component.html',
  styleUrls: ['./cancel-ticket.component.scss']
})
export class CancelTicketComponent implements OnInit {

  constructor(private restService : RestService, private router : Router) { }

  ngOnInit(): void {
  }
  tickets = []
  cancelTicketFormMethod(cancelTicketForm: NgForm) {
    this.restService.cancelTicket(cancelTicketForm).subscribe((tickets1 : any) => {
      this.tickets = tickets1[0]["Ticket"]
      if (this.tickets == null) {
        
        alert('Ticket Deleted Successfully');
        cancelTicketForm.reset();
      } else {
        
        alert('Failed To Delete Ticket not exist');
        cancelTicketForm.reset();
      }
    }, ((error) =>{
      this.router.navigateByUrl('/servererror');
    }));
  }

}
