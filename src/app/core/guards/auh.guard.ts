import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const auhGuard: CanActivateFn = (route, state) => {

  const _PLATFORM_ID = inject(PLATFORM_ID)

  if(isPlatformBrowser(_PLATFORM_ID)){

    if( sessionStorage.getItem('token') ){return true} 
    else{return false}

  }else{
    return true
  }
};
