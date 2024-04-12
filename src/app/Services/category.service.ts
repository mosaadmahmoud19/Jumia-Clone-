import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }
  getAllCategory():Observable<any>{
    return this._http.get("https://localhost:7065/api/Category");
  }
  setCategory(category:any):Observable<any>{
    return this._http.post("https://localhost:7065/api/Category",category);
  }

  deleteCategory(id:any):Observable<any>{
   return this._http.delete(`https://localhost:7065/api/Category?id=${id}`);
  }
}
