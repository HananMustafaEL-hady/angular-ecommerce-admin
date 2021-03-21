import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FirstComponent } from '../components/first/first.component';
import { SecondComponent } from '../components/second/second.component';
import {FormsModule}from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component'
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './components/table/table.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import{OrderComponent}from'./components/order/order.component';
import {Routes,RouterModule} from "@angular/router";
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MenuComponent } from './components/menu/menu.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { MenuadminComponent } from './components/menuadmin/menuadmin.component';
import { OrderadminComponent } from './components/orderadmin/orderadmin.component';
import { from } from 'rxjs';
import { AuthService } from './components/auth/auth.service';
import { AuthGuard  } from './components/auth/auth.guard';
import {TokenService} from './components/token.service';
import { LogoutComponent } from './components/logout/logout.component';
const appRoutes:Routes=[
  {path:'',component:LoginComponent},
  {path:'about',component:AboutComponent},
  {path:'profile/:id',component:ProfileComponent,
  canActivate:[AuthGuard]},
  // {path:'menu',component:MenuComponent},
  // {path:'cart',component:CartComponent,
// canActivate:[AuthGuard]
// },
  {path:'login',component:LoginComponent},
  {path:'menuA',component:MenuadminComponent},
  {path:'orderA',component:OrderadminComponent},
  {path:'order',component:OrderComponent},
  {path:'register',component:RegisterComponent},
  {path:'logout',component:LogoutComponent},
  {path:'**',component:ErrorComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    HeaderComponent,
    UsersComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    CartComponent,
    MenuadminComponent,
    OrderadminComponent,
    LogoutComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,

    RouterModule.forRoot(appRoutes),



  ],
  providers: [Storage,AuthService,AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenService,
    multi:true
  }


],
  bootstrap: [AppComponent]
})
export class AppModule { }
