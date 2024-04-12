import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputnumber]',
  standalone: true
})
export class InputnumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let value = this.el.nativeElement.value;
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');

    // Format the value into sets of four digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Update the input field value
    this.el.nativeElement.value = value;
  }

}
