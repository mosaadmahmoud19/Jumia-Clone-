import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  getAllUsers():Observable<any>{
    return this._http.get("https://localhost:7065/api/Admin/GetAllUsers");
  }
  deleteUser(userid:any):Observable<any>{
    return this._http.delete(`https://localhost:7065/api/Admin/DeleteUser/${userid}`);
  }
  ChangeRole(role:any,userid:any):Observable<any>{
    return this._http.post(`https://localhost:7065/api/Admin/UpdateUserRole?userId=${userid}&newRole=${role}`,{})
  }
}
