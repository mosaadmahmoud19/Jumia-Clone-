import { Component,OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../../Services/order.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink,LoadingComponent,CurrencyPipe,FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
constructor(private cartservice:CartService,private _order:OrderService){}
userCart:any[]=[];
cartData:any;
isloading:boolean=true;
userData:any;
ngOnInit(): void {
 this.getalldata()
    
      setTimeout(()=>{
       this.isloading=false;
      },1000)


      let encode=localStorage.getItem('etoken')
      if (encode !=null) {
       this.userData=jwtDecode(encode)
       console.log(this.userData);
       
      }
   
}

getalldata(){
  this.cartservice.getCartItems().subscribe({
    next:(response)=>{
      this.userCart=response.cartItems;
     this.cartData=response
     
    }
  })
}

removeItem(id:string){
 
  this.cartservice.removeCartItem(id).subscribe({
    next:(res)=>{
     this.getalldata()
   
    }
  })
}

updateCart(){
  this.isloading=true;
  this.getalldata();
  setTimeout(()=>{
    this.isloading=false;
  },1000)
}

deleteAll(userid:any){
  this.cartservice.deleteAll(userid).subscribe({
    next:(response)=>{
      this.getalldata()
    }
  })
}


makeOrder(cart:any){
  console.log(cart);
  
this._order.setOrder(cart).subscribe({
  next:(res)=>{
    console.log(res);
    
  }
})
}


plus(myinputid:any,prodid:any){
  let myinput:any=document.getElementById(myinputid) as HTMLInputElement 
  myinput.value++
  
  this.isdisabled=false;
  this.cartservice.updateQuantity(prodid,myinput.value).subscribe({
    next:(resonse)=>{

    }
  })
}
isdisabled:boolean=false;
minus(myinputid:any,prodid:any){
 
  
  let myinput:any=document.getElementById(myinputid) as HTMLInputElement 
  myinput.value--
  if (myinput.value == 0) {
    this.isdisabled=true;
  }else{
   this.cartservice.updateQuantity(prodid,myinput.value).subscribe({
    next:(resonse)=>{
      
    }
  })
  }
  console.log(myinput.value);
}









}
