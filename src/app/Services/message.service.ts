import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _http:HttpClient) { }
 sendMessage(myobj:any):Observable<any>{
  return this._http.post('https://localhost:7065/api/Account/contactUs',myobj)
 }

}
