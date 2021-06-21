import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../Services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headers = ["day", "event", "temperature", "windspeed"]

  weather  = [["abebe", "kebede", "abebe", "kebede"],["abebe", "kebede", "abebe", "kebede"],["abebe", "kebede", "abebe", "kebede"],["abebe", "kebede", "abebe", "kebede"]];
  
  constructor(private restService : RestService, private router : Router){}

  avails = []
  travels = ["Addis Ababa", "Mekele", "Jimma", "DebreBirhan", "Hawassa", "Adama", "BahirDar", "Gondar"];
  check: any = null
  

  ngOnInit(){
    //this.restService.getTravels().subscribe((response : any) => {
     // this.travels = response[0]["travel"]
    //})
  }


  checkAvail(checkAvailForm) {
    this.restService.chechAvail(checkAvailForm.value).subscribe((data: any) => {

      this.avails = data[0]["Check"]
      if (this.avails != null) {
        
        
        this.check = true;
        //this.restService.avail = true;
        checkAvailForm.reset();
      } else if( this.avails == null){
        
        this.check = false;
        alert('No Available bus on that day');
        checkAvailForm.reset();
        
      }else{
        alert("Page not found")
        this.router.navigateByUrl('/error1');
      }
    }, ((error) =>{
      this.router.navigateByUrl('/servererror');
    }));
  }



}
