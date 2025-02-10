import { Routes } from '@angular/router';
import {FormControlsComponent } from '../forms/form-controls/form-controls.component'
export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  // {
  //   path: 'e-home',
  //   loadComponent: () => import('./e-home/e-home.component').then(m => m.EHomeComponent),
  //   data: {
  //     title: 'e-com homepage'
  //   }
  // },
  // {
  //   path: 'form-controls',
  //   component:FormControlsComponent,
  //   data: {
  //     title: 'form controls'
  //   }
  // }
];
