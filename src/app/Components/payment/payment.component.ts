import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../Services/order.service';
import { PaymentService } from '../../Services/payment.service';
import { CardNumberPipe } from '../../Pipe/card-number.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CurrencyPipe ,ReactiveFormsModule ,FormsModule,CardNumberPipe ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  cardNumber:any;
  cartitems:any;
  loginForm: any;
  constructor(private _order:OrderService,private _payment:PaymentService){}

  orderid:any;
  ngOnInit(): void {
  this._order.getorder().subscribe({
    next:(order)=>{
      this.orderid=order.orderId;
      console.log(order.orderId);
      
      this.paymentForm.get("orderId")?.setValue(order.orderId)

    }
  })
  }
  paymentForm:FormGroup=new FormGroup({
    expireDate:new FormControl("5454"),
    phoneNumber:new FormControl('',[Validators.required ,Validators.pattern(/^01[0152][1-9]{8}$/)]),
    clientName:new FormControl('',[Validators.required ,Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required ,Validators.email]),
    paymentMethode:new FormControl('card',[Validators.required ,Validators.maxLength(20)]),
    cardnumber:new FormControl('',[Validators.required,Validators.pattern(/^[1-9][0-9]{15}$/)]),
    cvv:new FormControl('',[Validators.required,Validators.pattern(/^[1-9]{3}$/)]),
    zipCode:new FormControl('',[Validators.required,Validators.pattern(/^[1-9]{7}$/)]),
    address:new FormControl('',[Validators.required ,Validators.maxLength(20)]),
    orderId:new FormControl(""),
  })

  handelForm(){
    let email=this.paymentForm.get("email")?.value
    if(this.paymentForm.valid == true) {
      this._payment.setPayment(this.paymentForm.value,email).subscribe({
        next:(response)=>{
          Swal.fire({
            icon: "success",
            title: "Check your gmail",
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
        error:(error)=>{
          console.log(error);
          
          Swal.fire({
            icon: "error",
            title: "An error happend",
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

  


  
}
