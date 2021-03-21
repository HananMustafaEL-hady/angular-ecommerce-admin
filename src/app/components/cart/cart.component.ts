import { Component, OnInit ,Input} from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router'

import { map } from 'rxjs//operators';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router ) { }

  ngOnInit(): void {
 this.Getcarts();

  }
  carts;

  urlbase="http://localhost:3000/cart"

token=localStorage.getItem("token");

/****************************************************************************************************/

Getcarts(){

  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    responseType: 'json' as 'json'
  };


  this.http.get(this.urlbase,httpOptions).pipe(
    map(resDB=>{
      console.log(resDB)
    const arrposts:{name:string, price:number, description:string}[]=[];

    for(const key in resDB){

      arrposts.push({...resDB[key]});
    }
    return arrposts;
  }

  ))
  .subscribe(posts=>{
  console.log(posts);
  this.carts=posts;

},err=>{
  if(err instanceof HttpErrorResponse){
    if(err){
      this.router.navigate(['/login']);
    }
  }
}
);

}
/****************************************************************************************************/
  deleteCart(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':`${this.token}`
      }),
      responseType: 'json' as 'json'
    };
    // console.log(id);
    this.http.delete(`${this.urlbase}/${id}`,httpOptions).subscribe(posts=>{
      console.log(posts);
    });
    }



/****************************************************************************************************/
countedit
EditCount(id,count){
  console.log(count);

  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    responseType: 'text' as 'json'
  };
  // console.log(id);
  this.http.patch(`${this.urlbase}/${id}`, {count:count},httpOptions).subscribe(posts=>{
    console.log(posts);
  });
  }


















}

