import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }
  getorder():Observable<any>{
    return this._http.get(`https://localhost:7065/api/Order/${localStorage.getItem("userid")}`)
  }
  setOrder(cart:any):Observable<any>{
   return this._http.post(`https://localhost:7065/api/Order/create`,{userID:localStorage.getItem("userid"),orderItems:cart});
  }
getallorders():Observable<any>{
  return this._http.get("https://localhost:7065/api/Admin/getAllOrders");
}
}
