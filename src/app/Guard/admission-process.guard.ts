import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const admissionProcessGuard: CanActivateFn = (route, state) => {
  let _router=inject(Router)
  if (localStorage.getItem('etoken') == null) {
    return true;
  }else{
    _router.navigate(['/home'])
    return false;
  }
};
