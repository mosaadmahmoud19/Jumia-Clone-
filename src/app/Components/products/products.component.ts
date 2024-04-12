import { ProductsService } from './../../Services/products.service';
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoadingComponent } from '../loading/loading.component';
import { SingleProductComponent } from '../single-product/single-product.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { SingleProductV2Component } from '../single-product-v2/single-product-v2.component';
import { FilterService } from '../../Services/filter.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,CarouselModule,LoadingComponent,SingleProductComponent,FormsModule,SingleProductV2Component,FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  allcategories:any;
  constructor(private _products:ProductsService ,private categories:CategoryService,private _filter:FilterService , private _active:ActivatedRoute){}
  allProducts:any;
  ngOnInit(): void {
  this.getallporduct(); 
  this.getallcategories()
  this._active.paramMap.subscribe({
    next:(prams)=>{
      let categoryName = prams.get('catg');
      this.FilterCategory2(categoryName);
     
    }
  })
   setTimeout(()=>{
    this.isloading=false;
   },1500)
  }

  getallcategories(){
    this.categories.getAllCategory().subscribe({
      next:(response)=>{
        this.allcategories=response
        console.log(response);
        console.log(this.allcategories);
        
        
      }
    })
  }
  getallporduct(){
    this._products.getProduct().subscribe({
      next:(response)=>{
        this.allProducts=response.slice(0,12)
        console.log(response);
      }
    })
  }
isloading:boolean=true;



  myoption:OwlOptions={
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
        items: 4
      },
      
    },
  }
  numberbutton:number=12

  moreProducts(){
    this._products.getProduct().subscribe({
      next:(response)=>{
        this.allProducts=response.slice(0,(this.numberbutton+=4) )
        
        
      }
    })
  }
  singleproduct:boolean=false;
  multproduct:boolean=true;
  MakeSingleProduct(){
  
  this.multproduct=false;
  this.singleproduct=true;
  
  }
  MakemultProducts(){

   this.multproduct=true;
  this.singleproduct=false;
  
  }
  
  FilterCategory2(category:any){
    this._products.searchByCategory(category).subscribe({
      next:(data)=>{
        this.allProducts=data
      },
      error:()=>{
        this.getallporduct()
      }
    })
  }
  
  FilterCategory(event:any){   
    console.log(event.target.value);
    
    if (event.target.value == "") {
        this.getallporduct();
    }else{
      this._products.searchByCategory(event.target.value).subscribe({
        next:(data)=>{
          this.allProducts=data
        },
        error:()=>{
          this.getallporduct()
        }
      })
    }
    
     
  }
  filterMaxPrice(){
  
    this._filter.searchByMaxPrice().subscribe({
      next:(data)=>{
        this.allProducts=data
      },
      error:()=>{
        this.getallporduct()
      }
    })
  }
  filterMinPrice(){

    this._filter.searchByMinPrice().subscribe({
      next:(data)=>{
        this.allProducts=data

        
      },
      error:()=>{
        this.getallporduct()
      }
    })
  }
  filteronSale(event:any){
    let mybool=event.target.value
      if (mybool=="true") {
          mybool=true;
      }else{
        mybool=false;
      }
   
   
    this._filter.searchBySale(mybool).subscribe({
      next:(data)=>{
        this.allProducts=data
       
      },
      error:()=>{
        this.getallporduct()
      }
    })
  }
  

  searchvalue:string=""
  search(){
    this._products.searchByName(this.searchvalue).subscribe({
      next:(response)=>{
        this.allProducts=response;
      }
    })
  }
}
