import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl:string='https://localhost:7065/api/'

  constructor(private _http:HttpClient) { }


  addToWhishlist(prodID:string):Observable<any>{
    return this._http.post(`https://localhost:7065/api/WishList`,{productid:prodID,userID:localStorage.getItem("userid")})
  }

  getWishlistData():Observable<any>{
    return this._http.get(`https://localhost:7065/api/WishList/${localStorage.getItem("userid")}`)
  }

  deleteWishlist(prodID:string):Observable<any>{
    return this._http.delete(`https://localhost:7065/api/WishList?Userid=${localStorage.getItem("userid")}&productid=${prodID}`,{})

  }
}
