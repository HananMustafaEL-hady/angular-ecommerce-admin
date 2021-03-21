import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs//operators';
// const axios = require('axios').default;

@Injectable()
export class AuthService {
  token=localStorage.getItem("token");

  httpOptionsEdit = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    responseType: 'text' as 'json'
  };
  private URL_login="https://restaurant98.herokuapp.com/admin/login";
  private URL_register="https://restaurant98.herokuapp.com/admin";
   httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8'
    }),
    responseType: 'json' as 'json'
  };
   httpOptions2 = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8'
    }),
    responseType: 'text' as 'json'
  };

  httpOptions3 = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      "Access-Control-Allow-Origin":"*",
      'Authorization':`${this.token}`
    }),
    responseType: 'text' as 'json'
   };
   httpOptions4 = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    responseType: 'json' as 'json'
   };
register(user){

 return  this.http.post<any>(this.URL_register,user,this.httpOptions2)
}


  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  loggedin(){
    return !!localStorage.getItem('token');
  }


  constructor( private router: Router,private http:HttpClient) {}


  login(user){
    // if (user.userName !== '' && user.password !== '' ) { // {3}
    //   this.loggedIn.next(true);
    //   this.router.navigate(['/']);
    // }

  return  this.http.post<any>(this.URL_login,user,this.httpOptions2);


  }

  GetMethod(URL){
    return this.http.get<any>(URL,this.httpOptions);
    }
PostMethod(url,data){
  return this.http.post(url,data,this.httpOptions2);
}
GetMethodauth(url){
  return this.http.get<any>(url,this.httpOptions4);
  }


edit(url,id,name,data){
  return this.http.patch(`${url}/${name}/${id}`,data,this.httpOptions3);
}


editauth(url,data){
  return this.http.patch(url,data,this.httpOptionsEdit);
}

  getToken(){

    return localStorage.getItem('token');
  }
  logout() {

    localStorage.removeItem("token");

    // this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  user=[{

    "address": "",
    "email": "",
    "firstName": "",
    "gender": "",
    "lastName": "",
    "role":"",
      }]

      Getuserrole(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'json/html',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':`${this.token}`
      }),
      // responseType: 'json' as 'json'
    };


    this.http.get(this.URL_register,httpOptions).pipe(
      map(resDB=>{
        console.log(resDB)
      const arrposts=[];



        arrposts.push({...resDB});

      return arrposts;
    }

    ))
    .subscribe(posts=>{
    console.log(posts);
    this.user= posts;
    console.log( this.user[0].role);
    return this.user[0].role;

  });

  }






}






// const verifyUser = (code) => {
//   return axios.get("http://localhost:3000/admin/login/confirm/" + code).then((response) => {
//     return response.data;
//   });
// }
