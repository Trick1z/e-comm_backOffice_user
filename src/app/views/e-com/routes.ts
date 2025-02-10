import { Routes } from '@angular/router';
import { authGuard } from '../pages/guard/auth.guard'
import { LoginComponent } from '../pages/login/login.component';

export const routes: Routes = [

  {
    path: '',
    data: {
      title: 'home'
    },
    // canActivate : [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        data: {
          title: 'Home'
        },

      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        data: {
          title: 'profile'
        },

      },
      {
        path: 'category',
        loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent),
        data: {
          title: 'category'
        },

      },

      
    ]
  }
];
