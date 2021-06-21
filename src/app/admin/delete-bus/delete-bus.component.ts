import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Services/rest.service';


@Component({
  selector: 'app-delete-bus',
  templateUrl: './delete-bus.component.html',
  styleUrls: ['./delete-bus.component.scss']
})
export class DeleteBusComponent implements OnInit {

  constructor(private restService : RestService) { }
  buss: any = [];
  ngOnInit(): void {
  }
  deleteBusMethod(deleteBus: NgForm) {
    this.restService.deleteBus(deleteBus.value.busId).subscribe(bus  => {
      this.buss = bus;
      if (this.buss.message === 'Success') {
        console.log(bus);
        alert('Bus Deleted Successfully');
        deleteBus.reset();
      } else {
        console.log(bus);
        alert('Failed To deleteBus');
        deleteBus.reset();
      }
    });}
  }
