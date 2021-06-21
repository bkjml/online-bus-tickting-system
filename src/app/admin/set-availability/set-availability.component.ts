import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-availability',
  templateUrl: './set-availability.component.html',
  styleUrls: ['./set-availability.component.scss']
})
export class SetAvailabilityComponent implements OnInit {

  constructor(private restService: RestService, private router: Router) { }

  ngOnInit(): void {
  }
  result = []
  setAvail(setAvailForm: NgForm) {
    this.restService.setAvaliability(setAvailForm.value).subscribe((data : any) => {
      this.result = data[0]["Bus"]
      if (this.result != null) {
        console.log(data);
        alert('Availability Set Successfully');
        setAvailForm.reset();
      } else {
        console.log(data);
        // console.log("NO Output");
        alert('No bus with this Id');
        setAvailForm.reset();
      }

    }, ((error) =>{
      this.router.navigateByUrl('/error1');
    }));
  }

}
