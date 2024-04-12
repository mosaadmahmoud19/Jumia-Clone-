import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DetailsComponent } from './Components/details/details.component';
import { ProductsComponent } from './Components/products/products.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { authGuard } from './Guard/auth.guard';
import { CartPageComponent } from './Components/cart-page/cart-page.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ProductCrudComponent } from './Components/product-crud/product-crud.component';
import { UsersandcategoriesComponent } from './Components/usersandcategories/usersandcategories.component';
import { UserComponent } from './Components/user/user.component';
import { LogintwofactorComponent } from './Components/logintwofactor/logintwofactor.component';
import { FaqsComponent } from './Components/faqs/faqs.component';
import { ReturnsComponent } from './Components/returns/returns.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { adminGuard } from './Guard/admin.guard';
import { admissionProcessGuard } from './Guard/admission-process.guard';
import { selleroradminGuard } from './Guard/selleroradmin.guard';

export const routes: Routes = [
    {path:"" , component:HomeComponent,title:"Home" ,pathMatch:"full" },
    {path:"home" , component:HomeComponent,title:"Home"  },
    {path:"Home" , component:HomeComponent,title:"Home"  },
    {path:"about" , component:AboutComponent,title:"About"},
    {path:"login" , component:LoginComponent,title:"Login" ,canActivate:[admissionProcessGuard]},
    {path:"register" , component:RegisterComponent,title:"Register" ,canActivate:[admissionProcessGuard]},
    {path:"details/:id" , component:DetailsComponent,title:"Details"},
    {path:"products/:catg" , component:ProductsComponent,title:"Products"},
    {path:"products" , component:ProductsComponent,title:"Products"},
    {path:"cartPage" , component:CartPageComponent,title:"Your Shopping Cart"},
    {path:"payment" , component:PaymentComponent,title:"Payment",canActivate:[authGuard]},
    {path:"faqs" , component:FaqsComponent,title:"FAQS"},
    {path:"logintwofactor" , component:LogintwofactorComponent,title:"login",canActivate:[admissionProcessGuard]},
    {path:"contactus" , component:ContactusComponent,title:"contactus"},
    {path:"returns" , component:ReturnsComponent,title:"Returns"},
    {path:"forgetpassword" , component:ForgetpasswordComponent,title:"ForgetPassword",canActivate:[admissionProcessGuard]},
    {path:"dashboard" , component:DashboardComponent,title:"contactus",canActivate:[authGuard],children:[
        {path:"",component:ProfileComponent,title:"Profile" ,pathMatch:'full',canActivate:[authGuard]},
        {path:"profile",component:ProfileComponent,title:"Profile",canActivate:[authGuard]},
        {path:"addproduct",component:ProductCrudComponent,title:"ProductCrud" ,canActivate:[selleroradminGuard]},
        {path:"categories",component:UsersandcategoriesComponent,title:"Categories" ,canActivate:[adminGuard]},
        {path:"users",component:UserComponent,title:"Users",canActivate:[adminGuard]},
    ]},
    {path:'**',component:NotfoundComponent,title:"NotFound"},

];
