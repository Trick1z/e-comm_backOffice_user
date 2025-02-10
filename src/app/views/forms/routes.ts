import { Routes } from '@angular/router';
import { authGuard } from '../pages/guard/auth.guard'
import { LoginComponent } from '../pages/login/login.component';

export const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Forms'
    },
    // canActivate : [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'form-control',
        pathMatch: 'full',
    
      },
      {
        path: 'form-control',
        loadComponent: () => import('./form-controls/form-controls.component').then(m => m.FormControlsComponent),
        data: {
          title: 'Form Control'
        },

      },

      {
        path: 'select',
        loadComponent: () => import('./select/select.component').then(m => m.SelectComponent),
        data: {
          title: 'Select'
        }
      },

      // },
      {
        path: 'range',
        loadComponent: () => import('./ranges/ranges.component').then(m => m.RangesComponent),
        data: {
          title: 'Range'
        }
      },
      {
        path: 'borrow-product',
        loadComponent: () => import('./borrow-product/borrow-product.component').then(m => m.BorrowProductComponent),
        data: {
          title: 'borrow-product'
        }
      },
      // {
      //   path: 'input-group',
      //   loadComponent: () => import('./input-groups/input-groups.component').then(m => m.InputGroupsComponent),
      //   data: {
      //     title: 'Input Group'
      //   }
      // },
      {
        path: 'floating-labels',
        loadComponent: () => import('./floating-labels/floating-labels.component').then(m => m.default),
        data: {
          title: 'Floating Labels'
        }
      },
      {
        path: 'input-group',
        loadComponent: () => import('./input-groups/input-groups.component').then(m => m.InputGroupsComponent),
        data: {
          title: 'Input Group'
        }
      },
      {
        path: 'layout',
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        data: {
          title: 'Layout'
        }
      },
      {
        path: 'validation',
        loadComponent: () => import('./validation/validation.component').then(m => m.ValidationComponent),
        data: {
          title: 'Validation'
        }
      },
      {
        path: 'checks-radios',
        loadComponent: () => import('./checks-radios/checks-radios.component').then(m => m.ChecksRadiosComponent),
        data: {
          title: 'Checks & Radios'
        }
      }
    ]
  }
];
