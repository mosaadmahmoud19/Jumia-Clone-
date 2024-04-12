import { WishlistService } from './../../Services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
@Input() wishlistArr:any;

constructor(private _cart:CartService , private _wish:WishlistService){}










addtoCart(id:any){
 
this._cart.addTocart(id).subscribe({
  next:(res)=>{
    Swal.fire({
      icon: "success",
      title: "Added To Cart",
      background: "black",
      color: "#fff",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
     })
    

  

  },
  error:(response)=>{
    Swal.fire({
      icon: "error",
      title: "OUT OF STOCK",
      background: "black",
      color: "#fff",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
     })
  }
})
}



deleteProduct(id:any){

this._wish.deleteWishlist(id).subscribe({
  next:(res)=>{
    this._wish.getWishlistData().subscribe({
      next:(res)=>{
        this.wishlistArr=res.wishListItem
        

   
        
      }
    })
  }
})
}
}
