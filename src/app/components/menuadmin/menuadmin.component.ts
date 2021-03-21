import { Component, OnInit ,Input} from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs//operators';
import {AuthService} from '../auth/auth.service'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {

  public isCollapsed = false;
  public isCollapsed2 = false;
  public isCollapsed3= false;
  public isCollapsed4= false;
  public isCollapsed5= false;
  public isCollapsed6= false;




  ngOnInit(): void { this.isCollapsed = true;
      this.GetMenu();
     this.GetMenuOffers();
      this.isCollapsed2 = true
      this.isCollapsed3 = true
      this.isCollapsed4= true
      this.isCollapsed5 = true
      this.isCollapsed6= true
  }
  constructor(private http:HttpClient,private menu:AuthService ,  private router:Router) { }
  urlMenu="http://localhost:3000/menu";
  urlMenuOffers="http://localhost:3000/menuOffers";
   menueuser=[];
   datamenu
  token=localStorage.getItem("token");

   httpOptionsEdit = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    responseType: 'text' as 'json'
  };


onCreatePost(name,description,price){
this.datamenu={
  name:name,
  price:price,
  description:description
}
this.menu.PostMethod(this.urlMenu,this.datamenu).subscribe(posts=>{
    console.log(posts);
 });
}

GetMenu(){
  this.menu.GetMethod(this.urlMenu).pipe(
    map(resDB=>{
    const arrposts:{name:string, price:number, description:string}[]=[];

    for(const key in resDB){

      arrposts.push({...resDB[key]});
    }
    return arrposts;
  }

  ))
  .subscribe(posts=>{
  console.log(posts);
  this.menueuser=posts;

  },err=>{
    if(err instanceof HttpErrorResponse){
      if(err.status===401){
        this.router.navigate(['/login']);
      }
    }
  }

  );
}



deleteMenu(id){
console.log(id);
this.http.delete(`${this.urlMenu}/${id}`).subscribe(posts=>{
  console.log(posts);
});
}



editMenunName(name,id){
  this.http.patch(`${this.urlMenu}/name/${id}`,{name:name},this.httpOptionsEdit).subscribe(posts=>{
    console.log(posts);
  });
}

editMenunPrice(Price,id){
  this.http.patch(`${this.urlMenu}/Price/${id}`,{price:Price},this.httpOptionsEdit).subscribe(posts=>{
    console.log(posts);
  });
}


editMenudescription(description,id){
  this.http.patch(`${this.urlMenu}/description/${id}`,{description:description},this.httpOptionsEdit).subscribe(posts=>{
    console.log(posts);
  });
}




//////////////////////////////////////////
onCreatePostOffers(name,description,price){
  this.datamenu={
    name:name,
    price:price,
    description:description
  }
  this.menu.PostMethod(this.urlMenuOffers,this.datamenu).subscribe(posts=>{
      console.log(posts);
   });
  }

  menueuserOffers
  GetMenuOffers(){
    this.menu.GetMethod(this.urlMenuOffers).pipe(
      map(resDB=>{
      const arrposts:{name:string, price:number, description:string}[]=[];

      for(const key in resDB){

        arrposts.push({...resDB[key]});
      }
      return arrposts;
    }

    ))
    .subscribe(posts=>{
    console.log(posts);
    this.menueuserOffers=posts;

    });
  }






  deleteOfffers(id){
    console.log(id);
    this.http.delete(`${this.urlMenuOffers}/${id}`).subscribe(posts=>{
      console.log(posts);
    });
    }

    editNameOffers(name,id){
      this.http.patch(`${this.urlMenuOffers}/name/${id}`,{name:name},this.httpOptionsEdit).subscribe(posts=>{
        console.log(posts);
      });
    }

    editPriceOffers(Price,id){
      this.http.patch(`${this.urlMenuOffers}/Price/${id}`,{price:Price},this.httpOptionsEdit).subscribe(posts=>{
        console.log(posts);
      });
    }


    editDescriptionOffers(description,id){
      this.http.patch(`${this.urlMenuOffers}/description/${id}`,{description:description},this.httpOptionsEdit).subscribe(posts=>{
        console.log(posts);
      });
    }










}





