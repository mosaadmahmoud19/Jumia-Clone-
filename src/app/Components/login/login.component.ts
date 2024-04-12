import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _auth:AuthService ,private _router:Router){}
  isLoading:boolean=false;
  errorMessage:string="";
  islog2fac:boolean=false;
  
   loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required ,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  })


handelForm(){
const userData=this.loginForm.value;
this.isLoading=true;


if (this.loginForm.valid == true) {
  this._auth.login(userData).subscribe({
    next:(res)=>{
        console.log(userData);
        
        if (res.message=='User logged in') {
          localStorage.setItem('etoken' ,res.token)
          this._auth.saveUserData();
          this.isLoading=false;
          this._router.navigate(['/home'])
         
        }else{
          localStorage.setItem("code",JSON.stringify(res))
          this.islog2fac=true;
          this._router.navigate(['/logintwofactor'])
        }
      
      
      
    },
    error:(err)=>{
      this.isLoading=false;    
      console.log(err);
      
      
      this.errorMessage=err.error.errorMessage

       if(err.status==500){
         this.errorMessage="email is not Exist"

       }
    }
  })
}


}


logintwofactor:FormGroup=new FormGroup({
  code:new FormControl('',[Validators.required ]),
  username:new FormControl('',[Validators.required]),
})
login2fac(){
 
  
  this._auth.logintwofactor(this.logintwofactor.value).subscribe({
    next:(response)=>{
      console.log(response);
     
    },
    error:(err)=>{
    console.log(err);
      
    }
  })
  

}











}
