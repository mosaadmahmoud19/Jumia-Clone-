import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OffcnavComponent } from './Components/offcnav/offcnav.component';
import { ArrowupComponent } from './Components/arrowup/arrowup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,HttpClientModule,OffcnavComponent,ArrowupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myproject';
}
