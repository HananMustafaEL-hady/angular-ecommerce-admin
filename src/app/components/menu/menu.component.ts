import { Component, OnInit ,Input} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs//operators';
import {Router} from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service'
import { WishlistService } from 'src/app/services/wishlist.service';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  //@Input() productItem: Product
  @Input() addedToWishlist: boolean;

  public isCollapsed = false;
  public isCollapsed2 = false;
  public isCollapsed3= false;
  public isCollapsed4= false;
  public isCollapsed5= false;



  ngOnInit(): void { this.isCollapsed = true;
      this.GetMenu();
      this.isCollapsed2 = true
      this.isCollapsed3 = true
      this.isCollapsed4= true
      this.isCollapsed5 = true



  }
arr=[];
  constructor(private http:HttpClient ,  private router:Router,
    private msg: MessengerService,
    private wishlistService: WishlistService
    ) { }
  datamenu

  token=localStorage.getItem("token");


  onCreatePost(name,description,price){
    var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8'
    }),
    responseType: 'text' as 'json'
  };



this.datamenu={
  name:name,
  price:price,
  description:description
}
this.http.post("https://restaurant98.herokuapp.com/menu",this.datamenu,httpOptions).subscribe(posts=>{
  console.log(posts);
});

}


handleAddToWishlist(id) {
  this.wishlistService.addToWishlist(id).subscribe(() => {
    this.addedToWishlist = true;
  })
}


handleRemoveFromWishlist(id) {
  this.wishlistService.removeFromWishlist(id).subscribe(() => {
    this.addedToWishlist = false;
  })
}




GetMenu(){
  this.http.get<{name:string, price:number, description:string}>("https://restaurant98.herokuapp.com/menu").pipe(
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
  this.arr=posts;

});
}





urlbase="http://localhost:3000/menu/"



deleteMenu(id){
console.log(id);
this.http.delete(`${this.urlbase}/${id}`).subscribe(posts=>{
  console.log(posts);
});
}




editMenunName(name,id){
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    responseType: 'text' as 'json'
  };


  this.http.patch(`${this.urlbase}/name/${id}`,{name:name},httpOptions).subscribe(posts=>{
    console.log(posts);
  });
}


editMenunPrice(Price,id){
  console.log(Price);
  // var headers = new Headers();
  // headers.append('Content-Type', 'application/json');

  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8'
    }),
    responseType: 'text' as 'json'
  };
  this.datamenu={

    price:Price
  }
  this.http.patch(`${this.urlbase}/Price/${id}`,{price:Price},httpOptions).subscribe(posts=>{
    console.log(posts);
  });
}

editMenudescription(description,id){
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8'
    }),
    responseType: 'text' as 'json'
  };

  this.http.patch(`${this.urlbase}/description/${id}`,{description:description},httpOptions).subscribe(posts=>{
    console.log(posts);
  });
}


addcart(Menuid,menuName,count){


console.log(menuName);
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':`${this.token}`
    }),
    responseType: 'text' as 'json'
  };
this.datamenu={
  Menuid:Menuid,
  menuName:menuName,
  count:count
}
console.log(this.datamenu)
this.http.post("http://localhost:3000/cart",this.datamenu,httpOptions).subscribe(

posts=>{
  console.log(posts);
  this.router.navigate(['/cart']);
},
err=>{
  // console.clear();
  this.router.navigate(['/login']);

}
);


}



}





