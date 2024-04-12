import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule ,FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  constructor(private _auth:AuthService){}
  isLoading:boolean=false;
  resetPassword=false;
  forgetpassword:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required ,Validators.email]),
  })


 
myerror:any;

  handelForm(){
   let {email}=this.forgetpassword.value
    
    this._auth.ForgetPassword(email).subscribe({
      next:(response)=>{
        this.resetPassword=true;
        
      },
      error:(response)=>{
        if (response.status==500) {
          this.myerror="Email is not Exist"
        }
        
      }
    })
  }

  ResetPasswordForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required ,Validators.email]),
    password:new FormControl('',[Validators.required ,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    confirmPassword:new FormControl('',[Validators.required ,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    token:new FormControl('',[Validators.required ]),
  })
  
  message:any;
  errors:any=""
  handelForm2(){
    this._auth.restePassword(this.ResetPasswordForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.message=response.message
      },
      error:(response)=>{
        console.log(response);
        
     
          
      


      }
    })
    
  }





















}
