// import { Component, OnInit, EventEmitter, Output} from '@angular/core';
// import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
// import {} from '@angular/platform-browser-dynamic'
// import { Injectable } from '@angular/core';
// import { map } from 'rxjs//operators';
// import { onErrorResumeNext } from 'rxjs';
// import {AuthService} from '../auth/auth.service'

// @Injectable({
//   providedIn: 'platform'
// })

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor(private http:HttpClient,
//     private auth :AuthService
//     ) { }
// @Output('userReg') myevent=new EventEmitter
//   ngOnInit(): void {
//   }
// //   private isLoggedIn: boolean = false;

// //   login(token: string) {
// //     localStorage.setItem('auth_token', token);
// //     this.isLoggedIn = true;
// //   }


// //   logout(){
// //     localStorage.removeItem('auth_token');
// //     this.isLoggedIn = false;
// //   }
// // user=[]
// // err
// // datalogin
// // onCreateLogin(email,password){

// // const httpOptions = {
// //   headers: new HttpHeaders({
// //     'Accept': 'text/html',
// //     'Content-Type': 'application/json; charset=utf-8'
// //   }),
// //   responseType: 'text' as 'json'
// // };
// // this.datalogin={
// // email:email,
// // password:password,
// // }
// // this.http.post("http://localhost:3000/users/login",this.datalogin,httpOptions).subscribe(result => {this.user.push(result)
// // if(this.user){
// //   // this.myevent.emit(this.user);
// //   console.log(JSON.parse(this.user[0]))
// //   localStorage.setItem("token", JSON.parse(this.user[0]).token);
// //   // localStorage.setItem("role", JSON.parse(this.user[0]).role);



// // }

// // },
// // error => {
// //     this.err = error
// // }
// // );
// // }


// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'


// import { faTwitter ,faFacebook , faInstagram  , faLinkedin} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//   faTwitter = faTwitter;
//  faFacebook = faFacebook;
//  faInstagram = faInstagram;
//  faLinkedin = faLinkedin;


  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router:Router,

    private auth:AuthService

    ) { }
    user=[];

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

        email: ['', [Validators.required, Validators.email]],
        password: [ '',[Validators.required, Validators.minLength(6)]],

    }
    );
}

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
 if (this.registerForm.invalid) {  return; }

      const  user={
        "email":this.registerForm.controls.email.value,
        "password":this.registerForm.controls.password.value,
        };


this.auth.login(user).subscribe(

res=>{console.log(res)
  this.user.push(res)
  localStorage.setItem("token", JSON.parse(this.user[0]).token);
  this.router.navigate(['/profile/1']);

    // localStorage.setItem("token",res.token);
},
err=>{console.clear();
  if (err){
    alert("wrong Email or passowrd");
  }
}

  //console.log(err   )}

)

  }

  img:string ="assets/images/reg.jpeg"


}


