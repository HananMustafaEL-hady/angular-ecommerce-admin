// import { Component, OnInit ,Input} from '@angular/core';
// import {ActivatedRoute}from '@angular/router';
// import {HttpClient,HttpHeaders} from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { CommonModule } from "@angular/common";
// import {AuthService} from '../auth/auth.service'
// import {Router} from '@angular/router'

// import { map } from 'rxjs//operators';
// @Injectable({
//   providedIn: 'root'
// })



// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {

//   constructor(private Activated_Route :ActivatedRoute,private http:HttpClient ,   private menu:AuthService ,  private router:Router) {
//   }
//   token=localStorage.getItem("token");

//   ngOnInit(): void {
//     this.getoffers();
//   }
//   leaf:string ="assets/images/leaf2-e1609846212243.png"
//   man : string ="assets/images/man.png"
//   leaf2:string ="assets/images/leaf2-e1609846212243.png"
//   foodone : string ="assets/images/orange.png"
//   people : string = "assets/images/people.png"

//   urlbase="http://localhost:3000/menuOffers";
// menuOffers=[];

//   getoffers(){
// this.menu.GetMethod(this.urlbase).pipe(
//   map(resDB=>{
//   const arrposts:{name:string, price:number, description:string}[]=[];

//   for(const key in resDB){

//     arrposts.push({...resDB[key]});
//   }
//   return arrposts;
// }

// ))
// .subscribe(posts=>{
// console.log(posts);
// this.menuOffers=posts;

// });

// }
// datamenu

// addcart(Menuid,menuName,count){


//   console.log(menuName);
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Accept': 'text/html',
//         'Content-Type': 'application/json; charset=utf-8',
//         'Authorization':`${this.token}`
//       }),
//       responseType: 'text' as 'json'
//     };
//   this.datamenu={
//     Menuid:Menuid,
//     menuName:menuName,
//     count:count
//   }
//   console.log(this.datamenu)
//   this.http.post("http://localhost:3000/cart",this.datamenu,httpOptions).subscribe(

//   posts=>{
//     console.log(posts);
//     this.router.navigate(['/cart']);
//   },
//   err=>{
//     // console.clear();
//     this.router.navigate(['/login']);

//   }
//   );


//   }


// }
