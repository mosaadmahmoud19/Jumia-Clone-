import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../Services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-product-v2',
  standalone: true,
  imports: [RouterLink ,CurrencyPipe,],
  templateUrl: './single-product-v2.component.html',
  styleUrl: './single-product-v2.component.css'
})
export class SingleProductV2Component {
  constructor(private cartService:CartService ,private _router:Router, private _wishlist:WishlistService){}
  isdisabled:boolean=false;
  @Input() myproduct:any;
  ngOnInit(): void {
  console.log(this.myproduct);

  
}
  addTocart(id:string):void{
    if (localStorage.getItem("etoken")) {
      this.cartService.addTocart(id).subscribe({
        next:(response)=>{
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
          this.isdisabled=true;
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
    }else{
      this._router.navigate(["/login"])
    }
  
  }


  addtowishlist(id:string):void{
    if (localStorage.getItem("etoken")) {
      this._wishlist.addToWhishlist(id).subscribe({
        next:(res)=>{
          Swal.fire({
            icon: "success",
            title: "Added To Wishlist",
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
        error:(res)=>{
          Swal.fire({
            icon: "error",
            title: "Product already exists",
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


    }else{
      this._router.navigate(["/login"])
    }
 
  }

}
