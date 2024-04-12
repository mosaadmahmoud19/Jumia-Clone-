import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable ,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo=new BehaviorSubject(null);
  constructor(private auth:HttpClient) {
  
    let  user=localStorage.getItem("etoken")
    if (user!=null) {
        this.saveUserData();
    }
  }
  
  
    register(userData:object):Observable<any>{
      return this.auth.post(`https://localhost:7065/api/Account/register`,userData)
    }
    login(userData:object):Observable<any>{
      return this.auth.post(`https://localhost:7065/api/Account/Login`,userData)
  
    }

    EnableTwoFactor(userid:any):Observable<any>{
      return this.auth.post(`https://localhost:7065/api/Account/EnableTwoFactor/${userid}`,{})
    }

    DisableTwoFactor(userid:any):Observable<any>{
      return this.auth.post(`https://localhost:7065/api/Account/DisableTwoFactor/${userid}`,{})
    }
 

    logintwofactor(mydata:any):Observable<any> {   
      return this.auth.post(`https://localhost:7065/api/Account/Logintwo?username=${mydata}`,{});
    }

    
    changePassword(myemail:any,myobj:any):Observable<any>{
      return this.auth.post(`https://localhost:7065/api/Account/ChangePassword?email=${myemail}`,myobj)
    }


    ForgetPassword(email:any):Observable<any>{
      return this.auth.post(`https://localhost:7065/api/Account/ForgotPassword?email=${email}`,{})
    }

    restePassword(myobj:any):Observable<any>{
      return this.auth.post(`https://localhost:7065/api/Account/resetPassword`,myobj);
    }

  saveUserData():void{
  let encode=localStorage.getItem('etoken')
  if (encode !=null) {
    let decode:any=jwtDecode(encode)
    this.userInfo.next(decode);
    localStorage.setItem("userid",decode.UserId)
  }
  }
  
}
