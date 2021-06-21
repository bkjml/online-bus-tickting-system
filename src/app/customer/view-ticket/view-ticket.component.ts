import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {
  show: any = false;
  tickets: any= [];
  constructor(private restService : RestService, private router: Router) { }

  ngOnInit(): void {
  }
  viewTicketFormMethod(viewTicketForm: NgForm) {
    this.restService.viewTicket(viewTicketForm).subscribe((tickets1 : any) => {
      this.tickets = tickets1[0]["Ticket"];
      if (this.tickets  != null) {
        
        alert('Ticket Fetched Successfully');
        this.show = true;
      } else {
      
        alert('Failed To Fetch Ticket not exist');
        this.show = false;
      }
    }, ((error) =>{
      this.router.navigateByUrl('/servererror');
    }));
  }

}
