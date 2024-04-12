import { Component, Input } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offcnav',
  standalone: true,
  imports: [CurrencyPipe ,LoadingComponent],
  templateUrl: './offcnav.component.html',
  styleUrl: './offcnav.component.css'
})
export class OffcnavComponent  {
@Input()  cartobj:any;
@Input() cartItems:any;
constructor(private cartService:CartService,private _router:Router){}

  removeFromCart(id:string){
  
    this.cartService.removeCartItem(id).subscribe({
      next:(res)=>{
        Swal.fire({
          icon: "success",
          title: "Product Removed",
          background: "black",
          color: "#fff",
          toast: true,
          position: "top-start",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
         })
        this.cartService.getCartItems().subscribe({
          next:(res)=>{
            this.cartItems=res.cartItems
          }
        }) 
      }
    })
   

  }

  ViewCart(){
    this._router.navigate(["/cartPage"])
  }

  
}
