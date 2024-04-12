import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [ReactiveFormsModule ,FormsModule],
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent {
products:any;
myrole:any;
allcategories:any;
constructor(private _products:ProductsService ,private category:CategoryService){}
ngOnInit(): void {
  let userInfo:any=localStorage.getItem("etoken");
  let decode:any=jwtDecode(userInfo)
  this.myrole=decode.role;
  this.getProduct()

  this.getCategories()
}
getCategories(){
  this.category.getAllCategory().subscribe({
    next:(response)=>{
      this.allcategories=response
    }
  })
}
getProduct(){
  this._products.getProduct().subscribe({
    next:(response)=>{
     
      //happy path 
      this.products=response
    },
    error:(response)=>{
          //unhappy path 
      console.log(response);
    }
  })
}

// delete product 
deleteProduct(id:any){
this._products.deleteProduct(id).subscribe({
  next:(res)=>{
   
    this.getProduct()
    Swal.fire({
      icon: "success",
      title: "Product Deleted",
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
    console.log(res);
    
  }
})
}



// --------------------------------------------add product
addProduct:FormGroup=new FormGroup({
  Name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(100)]),
  Description:new FormControl('',[Validators.required , Validators.minLength(10), Validators.maxLength(300) ]),
  Price:new FormControl('',[Validators.required ,Validators.pattern(/^([1-8]\d{0,3}|9000)$/)]),
  Stock:new FormControl('',[Validators.required,Validators.pattern(/^([1-9]\d{0,5}|1000000)$/)]),
  OnSale:new FormControl('',[Validators.required ]),
  CategoryID:new FormControl(0,[Validators.required ]),
  images:new FormControl("",[Validators.required ]),
})
imges:string[]=[];

onFileSelected(event: any): void {
  let fils = event.target.files;
 for (let i = 0; i < fils.length; i++) {
   this.imges.push(fils[i])
 }
}

handelFormAdd(){
 
  this.addProduct.get("images")?.setValue(this.imges)
  let onsale=this.addProduct.get("OnSale")?.value;
 if (onsale=="true") {
  this.addProduct.get("OnSale")?.setValue(true);
 }else{
  this.addProduct.get("OnSale")?.setValue(false);
 }
  
  

console.log(this.addProduct.value);

  


  if (this.addProduct.valid) {
    const formData = new FormData();
    formData.append('Name', this.addProduct.get('Name')?.value);
    formData.append('Description', this.addProduct.get('Description')?.value);
    formData.append('Price', this.addProduct.get('Price')?.value);
    formData.append('Stock', this.addProduct.get('Stock')?.value);
    formData.append('OnSale', this.addProduct.get('OnSale')?.value);
    formData.append('CategoryID', this.addProduct.get('CategoryID')?.value);

    // Append images to FormData
    for (const file of this.imges) {
      formData.append('images', file);
    }

    this._products.addProduct(formData).subscribe({
      next: (response) => {
   
        
        this.getProduct()
        Swal.fire({
          icon: "success",
          title: "Product Added",
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
         this.imges=[]
      },
      error: (res) => {
        console.log(res);
      }
    });
  }
}


















// --------------------------------------------update product
updateProductForm:FormGroup=new FormGroup({
  Id:new FormControl(0),
  Name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(100) ]),
  Description:new FormControl('',[Validators.required , Validators.minLength(10), Validators.maxLength(300)]),
  Price:new FormControl('',[Validators.required ,Validators.pattern(/^([1-8]\d{0,3}|9000)$/)]),
  Stock:new FormControl('',[Validators.required,Validators.pattern(/^([1-9]\d{0,5}|1000000)$/)]),
  OnSale:new FormControl('',[Validators.required ]),
  CategoryID:new FormControl(0,[Validators.required ]),
  images:new FormControl("",[Validators.required ]),
})
updatedid:any;
updateProduct(product:any){
  this.updatedid=product.id;
 
  console.log(product);
  
  this.updateProductForm.get('Id')?.setValue(this.updatedid);
  this.updateProductForm.get('Name')?.setValue(product.name)
  this.updateProductForm.get('Description')?.setValue(product.description)
  this.updateProductForm.get('Price')?.setValue(product.price)
  this.updateProductForm.get('Stock')?.setValue(product.stock)

  }

imgestwo:string[]=[];
// add to imagestwo arr
onFileSelected2(event: any): void {
  let fils = event.target.files;
 for (let i = 0; i < fils.length; i++) {
   this.imgestwo.push(fils[i])
 }
}
// when submit
handelFormupdate(){


  
  this.updateProductForm.get("images")?.setValue(this.imgestwo)
  let onsale=this.addProduct.get("OnSale")?.value;
  if (onsale=="true") {
   this.addProduct.get("OnSale")?.setValue(true);
 
  }else{
   this.addProduct.get("OnSale")?.setValue(false);
 
  }
   



  


   if (this.updateProductForm.valid) {
    // Construct FormData object with updated product details
    const formData = new FormData();
    formData.append('Id', this.updateProductForm.get('Id')?.value);
    formData.append('Name', this.updateProductForm.get('Name')?.value);
    formData.append('Description', this.updateProductForm.get('Description')?.value);
    formData.append('Price', this.updateProductForm.get('Price')?.value);
    formData.append('Stock', this.updateProductForm.get('Stock')?.value);
    formData.append('OnSale', this.updateProductForm.get('OnSale')?.value);
    formData.append('CategoryID', this.updateProductForm.get('CategoryID')?.value);

    // Append images to FormData
    for (const file of this.imgestwo) {
      formData.append('images', file);
    }

    // Call the updateProduct method from the service
    this._products.updateProduct(this.updatedid, formData).subscribe({
      next: (response) => {
        
        this.getProduct();
        Swal.fire({
          icon: "success",
          title: "Product Updated",
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
      error: (res) => {
        //sad
        console.log(res);
      }
    });
  }
}




















}
