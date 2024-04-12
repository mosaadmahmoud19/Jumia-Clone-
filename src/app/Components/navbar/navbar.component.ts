import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { OffcnavComponent } from '../offcnav/offcnav.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from '../../Services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive,OffcnavComponent,WishlistComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  islogin:boolean=false;
  cartItems:any;
  cartobj:any;
  userData:any;
  wishlistArr:any;
  constructor(private _router:Router,private _auth:AuthService ,private cartService:CartService ,private _wish:WishlistService){}
  ngOnInit(): void {
    this._auth.userInfo.subscribe(()=>{
      if (this._auth.userInfo.getValue()!=null) {
        this.userData=this._auth.userInfo.getValue();
        this.islogin=true;
        
        
      }else{
        this.islogin=false;
      }
    })
 
  }
  
  signout():void{
    localStorage.removeItem('etoken');
    localStorage.removeItem('userid');
    this._router.navigate(['/login'])
    this.userData=null;
    this._auth.userInfo.next(null);
  }

  openNav(){
    this.cartService.getCartItems().subscribe({
      next:(res)=>{
         this.cartobj=res;
        this.cartItems=res.cartItems
        console.log(res);
        
                
        
      }
    })
  }
  openWishlist(){
    this._wish.getWishlistData().subscribe({
      next:(response)=>{
        console.log(response);
        
       this.wishlistArr=response.wishListItem
      }
    })
  }

  
}
