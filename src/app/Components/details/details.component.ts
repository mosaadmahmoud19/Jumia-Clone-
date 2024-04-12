import { ProductsService } from './../../Services/products.service';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoadingComponent } from '../loading/loading.component';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { FooterComponent } from '../footer/footer.component';
import { WishlistService } from '../../Services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule ,LoadingComponent,CurrencyPipe,RouterLink,FooterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  isloading:boolean=true;
 
constructor(private _elementRef:ElementRef, private _wishlist:WishlistService,private _product:ProductsService, private _active:ActivatedRoute,private productSirvice: ProductsService,private _router:Router,private cartservice:CartService){}

productid!:string|null;
product:any={};
isdisabled:boolean=false;
ngOnInit(): void {
  window.scrollTo({top:0})
  this._active.paramMap.subscribe({
    next:(prams)=>{
      this.productid = prams.get('id');
      this.getProductDetails(this.productid)
      this.isdisabled=false;
    }
  })

         
setTimeout(()=>{
  this.isloading=false
},1500)


       
          
          


  }

  getProductDetails(id:any){
    this.productSirvice.getProductByid(id).subscribe({
      next:(data)=>{
          this.product=data;
          this.getrelatedProducts(data.categoryName)
      console.log(data);
      
          
      }
    })

  }
  relatedProduct:any;
getrelatedProducts(category:any){
this._product.searchByCategory(category).subscribe({
  next:(res)=>{
this.relatedProduct=res;


  }
})
}

customOptions:OwlOptions={
  loop:true,
   dots:false,
   responsiveRefreshRate:50,
   autoHeight:false,
   lazyLoad:true,
   margin:10,
   smartSpeed :600,
   autoplay:true,
   responsive: {
     0: {
       items: 1
     },
     400: {
       items: 3
     },
     740: {
       items: 5
     },
     
   },
 }



  ViewCart(){
    this._router.navigate(["/cartPage"])
  }

  addtocart(id:string){
  if (localStorage.getItem("etoken")) {
    this.cartservice.addTocart(id).subscribe({
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
        this.isdisabled=true
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



  addtowishlist(id:any){
    if (localStorage.getItem("etoken")) {
      this._wishlist.addToWhishlist(id).subscribe({
        next:(response)=>{
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
        error:()=>{
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





  ChangeImg(event:any){
    let img=this._elementRef.nativeElement.querySelector(".myimg")

    img.src=event.target.src
    
    
  }




  back(){
    window.history.back();
  
  }


}
