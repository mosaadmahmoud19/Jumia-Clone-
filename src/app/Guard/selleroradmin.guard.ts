import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


export const selleroradminGuard: CanActivateFn = (route, state) => {
  let role = ""
  let _router=inject(Router);
  let user=localStorage.getItem('etoken')
  if (user !=null) {
    let decode:any=jwtDecode(user)
    role=decode.role
    
  }

  if (role == "Admin" || role=="Seller") {
    return true;
  }else{
    _router.navigate(['/home'])
    return false;
  }
};
