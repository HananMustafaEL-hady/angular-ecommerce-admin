import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { from } from 'rxjs';
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  registerForm!: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,

      private auth :AuthService,
      private router:Router
      ) { }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  user=[]


    ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: [ '',[Validators.required, Validators.minLength(8),
          Validators.pattern("^[0-9]{0,100}[a-zA-Z]{1,100}[a-zA-Z0-9]*$")
          ]],
          address :['', Validators.required],
          phonenumber: ['', [ Validators.required,
            Validators.pattern("^(0[0-2]{2}[0-9]{8})$"),
          //  Validators.minLength(12), Validators.maxLength(12)
          ]],
          gender: ['', Validators.required]
      }
      );
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // console.log(this.registerForm.controls.email.value);
    const  user={
      "firstName":this.registerForm.controls.firstName.value,
      "lastName":this.registerForm.controls.lastName.value,
      "email":this.registerForm.controls.email.value,
      "password":this.registerForm.controls.password.value,
      "address":this.registerForm.controls.address.value,
      "phonenumber":this.registerForm.controls.phonenumber.value,
      "gender":this.registerForm.controls.gender.value,
      };
      console.log(user);

      this.auth.register(user).subscribe(

        res=> {
          console.log(res);
          this.user.push(res)
          localStorage.setItem("token", JSON.parse(this.user[0]).token);
        },
        err=> {
          console.log(err);
        }
      )
  }

  img:string ="assets/images/reg.jpeg"


}
