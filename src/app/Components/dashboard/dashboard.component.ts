import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userData:any;
  ngOnInit(): void {
   
    let encode=localStorage.getItem('etoken')
    if (encode !=null) {
     this.userData=jwtDecode(encode)
    }
    
  }
}
