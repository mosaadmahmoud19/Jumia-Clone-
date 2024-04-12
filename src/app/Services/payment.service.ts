import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userEmail:any;
  constructor(private _http:HttpClient) {
    let encode=localStorage.getItem('etoken')
    if (encode !=null) {
      let decode:any=jwtDecode(encode)
      this.userEmail=decode.Email
    }
   }

  setPayment(order:any,email:any):Observable<any>{
    return this._http.post(`https://localhost:7065/api/Payment?Email=${email}`,order);
  }
  
}
