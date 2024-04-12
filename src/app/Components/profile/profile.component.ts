import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule ,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userData:any;
  constructor(private _auth:AuthService){}
ngOnInit(): void {
  let encode=localStorage.getItem('etoken')
  if (encode !=null) {
   this.userData=jwtDecode(encode)
   
  }
}



enable(){
  this._auth.EnableTwoFactor(this.userData.UserId).subscribe({
    next:(response)=>{
      Swal.fire({
        icon: "success",
        title: "TwoFactor Enable",
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
    
    
    }
  })
    
}
disable(){
  this._auth.DisableTwoFactor(this.userData.UserId).subscribe({
    next:(response)=>{
      Swal.fire({
        icon: "success",
        title: "TwoFactor Disable",
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
    

    }
  })
}






// -----------------------------change password

changePassword:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required ,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  newPassword:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
})

message:string=""
textcolor:string=""
handelForm(){
let {email,password,newPassword}=this.changePassword.value

let myobj={
 
  password:password,
  newPassword:newPassword
}
this._auth.changePassword(email,myobj).subscribe({
  next:(response)=>{
    this.textcolor="text-success"
    this.message=response.message
    
  },
  error:(response)=>{
    this.textcolor="text-danger"
    this.message="email or password incorrect"
    
  }
})

}









}
