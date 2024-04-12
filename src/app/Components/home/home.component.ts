import { AfterViewInit, Component , OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../Services/products.service';
import { SingleProductComponent } from '../single-product/single-product.component';
import { LoadingComponent } from '../loading/loading.component';
import { FooterComponent } from '../footer/footer.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink ,CarouselModule,SingleProductComponent,LoadingComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements OnInit  {
isloading:boolean=false;

  constructor(private _productService:ProductsService){}
 
  bags:any=[]
  watches:any=[]
  tshirt:any=[]
  ngOnInit(): void {
    this.bagCollection();
    this.WatchesCollection();
    this.TshirtCollection();
  }


  bagCollection(){
    this._productService.searchByCategory("bags").subscribe({
      next:(response=>{
        this.bags=response.slice(0,8);
          console.log(response);
          
      }), 
      error:(err)=>{
        console.log(err);
       
      }
    });
  }
  WatchesCollection(){
    this._productService.searchByCategory("Watches").subscribe({
      next:(response=>{
        this.watches=response.slice(0,8);
     
      }), 
      error:(err)=>{
        console.log(err);
       
      }
    });
  }
  TshirtCollection(){
    this._productService.searchByCategory("Tshirt").subscribe({
      next:(response=>{
        this.tshirt=response.slice(0,8);
     
      }), 
      error:(err)=>{
        console.log(err);
       
      }
    });
  }
  myoption:OwlOptions={
   
    dots:false,
    responsiveRefreshRate:50,
    autoHeight:false,
    lazyLoad:true,
    margin:10,
   
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      
    },
  }





 
}
