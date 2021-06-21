import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.scss']
})
export class AddBusComponent implements OnInit {

  constructor(private restService : RestService, private router : Router) { }

  ngOnInit(): void {
  }
  buses: any = [];
  travels = ["Addis Ababa", "Mekele", "Jimma", "DebreBirhan", "Hawassa", "Adama", "BahirDar", "Gondar"];

  addBus(createBus: NgForm) {
    this.restService.addBus(createBus.value).subscribe((bus : any) => {
      this.buses = bus[0]["Bus"];
      if (this.buses != null) {
        console.log(bus);
        alert('Bus Added Successfully');
        createBus.reset();
      } else {
        console.log(bus);
        alert('Failed To AddBus, Bus id already in use');
        createBus.reset();
      }
    }, ((error) =>{
      this.router.navigateByUrl('/servererror');
    })
    );
  }

}
