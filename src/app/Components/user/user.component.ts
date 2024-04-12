import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
allusers:any;
constructor(private _users:UserService){}
userid:any;
ngOnInit(): void {
  this.getallusers()
  this.userid=localStorage.getItem("userid")
}

getallusers(){
  this._users.getAllUsers().subscribe({
    next:(users)=>{
      console.log(users);
      
      this.allusers=users
    },
    error:(errors)=>{

    }
  })
}

deleteUser(userid:any){
  this._users.deleteUser(userid).subscribe({
    next:(users)=>{
      this.getallusers();
      Swal.fire({
        icon: "success",
        title: "User Deleted",
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
  })
}




changeRole(event:any,userid:any){
  console.log(event.target.value,userid);
  
   this._users.ChangeRole(event.target.value,userid).subscribe({
    next:(response)=>{
      this.getallusers();
      Swal.fire({
        icon: "success",
        title: "Role Changed",
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
