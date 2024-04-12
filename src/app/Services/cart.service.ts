import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  baseUrl:string='https://localhost:7065/api/'
  
  constructor(private _http:HttpClient) { }
  mytoken:any={
    token:localStorage.getItem('userid')
  }

  addTocart(prodID:string):Observable<any>{
    return this._http.post(this.baseUrl+'Cart',{productId:prodID,userID:localStorage.getItem("userid")})
  }
  
getCartItems():Observable<any>{
return this._http.get(this.baseUrl+'Cart/'+localStorage.getItem("userid"))
}

removeCartItem(id:string):Observable<any>{
  return this._http.delete(`https://localhost:7065/api/Cart/DeleteOneCartItem?Userid=${localStorage.getItem("userid")}&productid=${id}`)
  }


  deleteAll(userid:any):Observable<any>{
    return this._http.delete(`https://localhost:7065/api/Cart/DeleteAllCartItems?Userid=${userid}`)
  }


  updateQuantity(prodid:any,prodquantity:any):Observable<any>{
    return this._http.put(`https://localhost:7065/api/Cart/${localStorage.getItem("userid")}`,{productId:prodid,quantity:prodquantity})
  }
}
