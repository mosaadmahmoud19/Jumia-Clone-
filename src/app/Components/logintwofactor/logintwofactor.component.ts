import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logintwofactor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './logintwofactor.component.html',
  styleUrl: './logintwofactor.component.css'
})
export class LogintwofactorComponent {
constructor(private _auth:AuthService,private _router:Router){}
isLoading:boolean=false;
errorMessage:string="";

logintwofactor:FormGroup=new FormGroup({
  code:new FormControl("",[Validators.required ]),
  username:new FormControl("",[Validators.required]),
})
login2fac() {
  console.log(this.logintwofactor.value);
  let {code,username}=this.logintwofactor.value
  console.log(typeof(code),typeof(username));
  let cood:any=localStorage.getItem("code")
  let mycode:any=JSON.parse(cood).code
  
    if (mycode==code) {
      this._auth.logintwofactor(username).subscribe({
        next:(response) => {
          console.log(response);
          
          localStorage.setItem('etoken' ,response.token)
          this._auth.saveUserData();
          localStorage.removeItem("code")
          this._router.navigate(["/home"])
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "inincorrect code or username",
            background: "black",
            color: "#fff",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
           })
          this._router.navigate(["/login"])
       
        }
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "inincorrect code or username",
        background: "black",
        color: "#fff",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
       })
      this._router.navigate(["/login"])
    }
 
 
}
}
