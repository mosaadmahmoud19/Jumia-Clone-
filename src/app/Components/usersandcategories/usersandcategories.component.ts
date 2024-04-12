import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { OrderService } from '../../Services/order.service';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usersandcategories',
  standalone: true,
  imports: [ReactiveFormsModule ,FormsModule,CurrencyPipe],
  templateUrl: './usersandcategories.component.html',
  styleUrl: './usersandcategories.component.css'
})
export class UsersandcategoriesComponent {


constructor(private category:CategoryService,private _order:OrderService){}
ngOnInit(): void {
  this.getCategories()
  this.getallorders()
  
}

allcategories:any;
getCategories(){
  this.category.getAllCategory().subscribe({
    next:(response)=>{
      this.allcategories=response
    }
  })
}




  // -------------------------------------------------------category

addCategoryForm:FormGroup=new FormGroup({
  categoryName:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ])})

  addCategory(){
    if (this.addCategoryForm.valid) {
      this.category.setCategory(this.addCategoryForm.value).subscribe({
        next:(responese)=>{
          this.getCategories();
          Swal.fire({
            icon: "success",
            title: "Category Added",
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
  }




  deleteCategory(id:any){
    this.category.deleteCategory(id).subscribe({
      next:(responese)=>{
        this.getCategories();
        Swal.fire({
          icon: "success",
          title: "Category Deleted",
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




  allorders:any;
  getallorders(){
    this._order.getallorders().subscribe({
      next:(response)=>{
        this.allorders=response;
      }
    })
  }
}
