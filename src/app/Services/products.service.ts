
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private HttpClient:HttpClient) { }
  

  getProduct():Observable<any>{
    return this.HttpClient.get("https://localhost:7065/api/Products");
  }

  getProductByid(id:string|null):Observable<any>{
    return this.HttpClient.get(`https://localhost:7065/api/Products/`+id)
  }

  addProduct(formData:FormData):Observable<any>{
    return this.HttpClient.post("https://localhost:7065/api/Products",formData)
  }

  deleteProduct(id:any):Observable<any>{
    return this.HttpClient.delete("https://localhost:7065/api/Products?id="+id)
  }

  updateProduct(prodid:any,formdata:FormData):Observable<any>{
     return this.HttpClient.put(`https://localhost:7065/api/Products/${prodid}`,formdata)
  }

  searchByName(char:any):Observable<any>{
    return this.HttpClient.get(`https://localhost:7065/api/FBN/${char}`)
  }
  searchByCategory(category:any):Observable<any>{
    return this.HttpClient.get(`https://localhost:7065/api/FBC/${category}`)
  }
}
