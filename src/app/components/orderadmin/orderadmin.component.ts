import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'
import { map } from 'rxjs//operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">The User</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p> {{name}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-orderadmin',
  templateUrl: './orderadmin.component.html',
  styleUrls: ['./orderadmin.component.css']
})
export class OrderadminComponent implements OnInit {



  constructor(private formBuilder: FormBuilder,

    private router:Router,private http:HttpClient,private modalService: NgbModal,

    private auth:AuthService) { }

  ngOnInit(): void {

    this.getorders();
  }
  token=localStorage.getItem("token");

  orderuser=[];
    orderadmin=[];
  getuser(id){
    this.auth.GetMethodauth(`https://restaurant98.herokuapp.com/users/${id}`)
    .pipe(
      map(resDB=>{
        console.log(resDB)
       const arrposts=[];
        arrposts.push({...resDB});
       return  arrposts;

     }
     ))
     .subscribe(posts=>{
      console.log(posts);
      this.orderuser= posts;
      console.log(this.orderuser);



    }
    )
  }
  getorders(){
    this.auth.GetMethodauth("https://restaurant98.herokuapp.com/order/admin").pipe(
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


  statusedit(order_status,id){
    console.log(order_status);
    console.log(id);
    this.http.patch(`https://restaurant98.herokuapp.com/order/${id}`,{order_status}).subscribe(posts=>{
      console.log(posts);
    });
  }



async open(id) {

    // this.getuser(id)

    this.auth.GetMethodauth(`https://restaurant98.herokuapp.com/users/${id}`)
    .pipe(
      map(resDB=>{
        console.log(resDB)
       const arrposts=[];
        arrposts.push({...resDB});
       return  arrposts;

     }
     ))
     .subscribe(posts=>{
      console.log(posts);
      this.orderuser= posts;
      console.log(this.orderuser);


      const modalRef =  this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.name =  ` the name: ${this.orderuser[0].firstName +"   "+this.orderuser[0].lastName +"  "}

    address :${this.orderuser[0].address +"   "}
      `;

    }
    )
// if(this.orderuser[0].firstName!=undefined){

// }

  }

  }

;
