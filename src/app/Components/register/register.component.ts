import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
constructor(private _auth:AuthService ,private _router:Router){}
  isLoading:boolean=false;
  errorMessage:string="";



registerForm:FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
  username:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
  email:new FormControl('',[Validators.required ,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  rePassword:new FormControl(''),
  age:new FormControl('',[Validators.required ,Validators.min(18)]),
  phone:new FormControl('',[Validators.required ,Validators.pattern(/^01[0152][1-9]{8}$/)]),
  nationality:new FormControl('',[Validators.required , Validators.minLength(5), Validators.maxLength(30) ]),
  role:new FormControl('',Validators.required)
},{
  validators:[this.confirmPassword]
}as FormControlOptions)


updateRole(role: string) {
 this.registerForm.get("role")?.setValue(role);
}



confirmPassword(group:FormGroup){
let password=group.get("password")
let repassword=group.get("rePassword")
if (repassword?.value == '') {
  repassword?.setErrors({required:true})
}else if(password?.value != repassword?.value){
  repassword?.setErrors({mismatch:true})
}
}


handelForm(){
const userData=this.registerForm.value;
this.isLoading=true;

if (this.registerForm.valid == true) {
  this._auth.register(userData).subscribe({

    next:(res)=>{
      console.log(res);
      
      if (res.status =='Success') {
        this.isLoading=false;
        this._router.navigate(['/login'])
      }
    },
    error:(err)=>{
     console.log(err);
     
     
      this.isLoading=false;
      if (err.error.errorMessage) {
        this.errorMessage=err.error.errorMessage;

      }else{
        this.errorMessage="Something Wrong"

      }
    }
  })
}else{
  this.errorMessage="Something Wrong "
}

}

}
