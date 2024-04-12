import { Component } from '@angular/core';

@Component({
  selector: 'app-arrowup',
  standalone: true,
  imports: [],
  templateUrl: './arrowup.component.html',
  styleUrl: './arrowup.component.css'
})
export class ArrowupComponent {
  backtoTop(){
    window.scrollTo({top:0,behavior: 'smooth'});
  }
}
