import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'
import { map } from 'rxjs//operators';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-orderadmin',
  templateUrl: './orderadmin.component.html',
  styleUrls: ['./orderadmin.component.css']
})
export class OrderadminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router:Router,private http:HttpClient,

    private auth:AuthService) { }

  ngOnInit(): void {

    this.getorders();
  }
  token=localStorage.getItem("token");

  orderuser=[];
    orderadmin=[];
  getuser(id){
    this.auth.GetMethodauth(`http://localhost:3000/admin/user/${id}`)
    // .pipe(
    //   map(resDB=>{
    //     console.log(resDB)
    //    const arrposts=[];
    //     arrposts.push(...resDB);
    //    return  arrposts;

    //  }
    //  ))
     .subscribe(posts=>{
      console.log(posts);
      this.orderuser= posts;
      console.log(this.orderuser);


    }
    )
  }
  getorders(){
    this.auth.GetMethodauth("http://localhost:3000/order/admin").pipe(
      map(resDB=>{
       console.log(resDB)
      const arrposts=[];
       arrposts.push(...resDB);
      return  arrposts;

    }
    ))
    .subscribe(posts=>{
    console.log(posts);
    this.orderadmin= posts;
    console.log(this.orderadmin);


  }
  );

  }
  httpOptionsEdit = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    responseType: 'text' as 'json'
  };
  editstatus(value,id){
    this.http.patch(`http://localhost:3000/order/s/${id}`,{value},this.httpOptionsEdit).subscribe(posts=>{
      console.log(posts);
    });
  }

  }

