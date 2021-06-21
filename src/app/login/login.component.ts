import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../Services/rest.service';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  users : any = [];
  constructor(private restService : RestService, private loginService: LoginService, private router : Router) { }

  ngOnInit(): void {
  }
  

  login(loginForm: NgForm) {
    this.restService.login(loginForm.value).subscribe(
      (response : any) => {
      this.users = response[0]["User"];
      if(this.users.type == 'user'){

        window.confirm('login successfull');
        this.loginService.isCustomerLoggedIn = true;
        this.router.navigateByUrl('/');
      }else if(this.users.type == 'admin') {
        window.confirm('login successfull');
        this.loginService.isAdminLoggedIn = true;
        this.router.navigateByUrl('/');
      }else {
        window.confirm('ENTER CORRECT CREDENTAILS');
        loginForm.reset();
      }
    }, ((error) =>{
      this.router.navigateByUrl('/error1');
    })
    );
  }
}
