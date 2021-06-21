import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {RestService} from '../Services/rest.service';
import {User} from '../model/user';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private restService : RestService) { }
  name = 'enjoyer';
  


  
  

  ngOnInit(): void {
  }

  alerrt(registerUser){
    alert(registerUser["userName"]);
  }
  check_id(id){
    this.restService.getUser(id).subscribe(data =>{
      if(data != null){
        alert("user id already in use")
        return false
      }
      else{
        return true
      }

    });
  }



  userss = [ "contact","email", "name", "userId"];
  users: any = [];
  
  save(registerUser : NgForm){
		this.restService.addUser(registerUser.value).subscribe(
      (response: any) =>{
        this.users = response[0]["User"];
        if (this.users != null) {
          console.log(this.users);
          // window.confirm('Registration Successfull');
          alert('Registration Successfull');
          registerUser.reset();
          this.router.navigateByUrl('login');
        } else {
          console.log(this.users);
          // console.log("NO Output");
          alert('user id already in use');
          registerUser.reset();
        }
      });
    
    
  }


  



  user(registerUser: NgForm) {

    this.restService.addUser(registerUser.value).subscribe(
      (response : any) => {
        this.users = response[0]["Users"];
        if (this.users != null) {
          console.log(this.users);
          // window.confirm('Registration Successfull');
          alert('Registration Successfull');
          registerUser.reset();
          this.router.navigateByUrl('login');
        } else {
          console.log(response);
          // console.log("NO Output");
          alert('ENTER CORRECT CREDENTAILS');
          registerUser.reset();
        }
      },
      (error) =>
      {
        console.log("No Data Found" + error);
      });
    }


}
