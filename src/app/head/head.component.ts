import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../Services/login.service'



// For MDB Angular Free


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  get isAdminLogin() {
    return this.loginService.isAdminLogin();
  }

  get isCustomerLogin() {
    return this.loginService.isCustomerLogin();
  }

  logout() {
    this.loginService.isAdminLoggedIn = false;
    this.loginService.isCustomerLoggedIn = false;
    this.router.navigateByUrl('/login');
  }


  
  

}
