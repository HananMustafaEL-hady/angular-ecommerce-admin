import { Component, OnInit ,Input} from '@angular/core';
import {ActivatedRoute}from '@angular/router';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router'
import { map } from 'rxjs//operators';
import { LocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../auth/auth.service'


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  images;
  multipleImages = [];

  constructor(private Activated_Route :ActivatedRoute ,private router:Router,private http:HttpClient,private location: LocationStrategy,private auth:AuthService ) {


   }

  ngOnInit(): void {
    this.Getuser();
    this.preventBackButton();
  }
  user=[{

"address": "",
"email": "",
"firstName": "",
"gender": "",
"lastName": ""
  }]
  urladmin="https://restaurant98.herokuapp.com/admin"

  token=localStorage.getItem("token");

  Getuser(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'json/html',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':`${this.token}`
      }),
      // responseType: 'json' as 'json'
    };


    this.http.get(this.urladmin,httpOptions).pipe(
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
    console.log(this.user)

  },err=>{
    if(err instanceof HttpErrorResponse){
      if(err.status===401){
        this.router.navigate(['/login']);
      }
    }
  }


  );

  }

  /////////////////////////////////////////////////////////////////////////////////////////

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

getmenu(){
  this.router.navigate(['/menuA']);

}

getorder(){
  this.router.navigate(['/orderA']);

}
getlogout(){
  this.router.navigate(['/logoutA']);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
selectImage(event) {
  debugger;
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
  }
}

selectMultipleImage(event){
  if (event.target.files.length > 0) {
    this.multipleImages = event.target.files;
  }
}

httpOptionsEdit = {
 headers: new HttpHeaders({
   'Authorization':`${this.token}`
 }),
};

onSubmit(){
  debugger;
  console.log(this.token);
  const formData = new FormData();
  formData.append('file', this.images);

  this.http.post<any>('http://localhost:3000/upload', formData,this.httpOptionsEdit).subscribe(
    res => {
      debugger;
      console.log(res)
    }


  );
}

// onMultipleSubmit(){
//   const formData = new FormData();
//   for(let img of this.multipleImages){
//     formData.append('files', img);
//   }

//   this.http.post<any>('http://localhost:3000/upload', formData,this.httpOptionsEdit).subscribe(
//     (res) => console.log(res),
//     (err) => console.log(err)
//   );

// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





editphone(phone){
  this.auth.editauth(`https://restaurant98.herokuapp.com/phone/`,phone).subscribe(posts=>{
    console.log(posts);
  });
}


editemail(email){
  this.auth.editauth('https://restaurant98.herokuapp.com/email/',email).subscribe(posts=>{
    console.log(posts);
  });
}

editaddress(address){
  this.auth.editauth(`${this.urladmin}/address/`,address).subscribe(posts=>{
    console.log(posts);
  });

}
}
