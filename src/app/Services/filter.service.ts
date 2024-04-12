import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private _http:HttpClient) { }
  searchByMaxPrice():Observable<any>{
    return this._http.get('https://localhost:7065/api/Filter/FBMaxPrice')
  }
  searchByMinPrice():Observable<any>{
    return this._http.get('https://localhost:7065/api/Filter/FBMinPrice')
  }
  searchBySale(onsale:boolean):Observable<any>{
    return this._http.get(`https://localhost:7065/api/FBOS/${onsale}`)
  }
}
