import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {FormControlsComponent} from '../../forms/form-controls/form-controls.component'
export const authGuard: CanActivateFn = (route, state) => {


  const router = inject(Router)
  const getData = sessionStorage.getItem("ticket")

  if (getData != null) {

    return true;
  } else {
    router.navigateByUrl('login');

    return false;
  }

  return true
};
