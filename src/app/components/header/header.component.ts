import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.isadmin=false;
    this.admin() ;
  }
  logo:string = "assets/images/foodsto-logo-1.png"
  isadmin:boolean;
role;
admin() {
this.role=  this.auth.Getuserrole();
console.log(this.role);
if(this.role=="user"){

  this.isadmin=true;
  return  this.isadmin;
}
else{
  this.isadmin=true;

  return  this.isadmin
   ;}
  }




}
