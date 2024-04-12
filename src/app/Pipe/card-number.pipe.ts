import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber',
  standalone: true
})
export class CardNumberPipe implements PipeTransform {

  transform(value: string): string {
    // Remove all non-numeric characters from the input
    const numericValue = value.replace(/\D/g, '');
    
    // Insert hyphens every four characters
    const parts = numericValue.match(/.{1,4}/g);
    if (parts) {
      return parts.join('-');
    } else {
      return '';
    }
  }
}
