import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

import { ApiService } from '../../../services/api'
import { CommonModule } from '@angular/common';
import { Form, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {sleep} from '../../../services/sleep'
import {nav} from '../../../services/navigate'


import { HttpClient, HttpClientModule, } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, HttpClientModule],
  providers: [ApiService]

})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {

  }
  constructor(
    private route :Router,
    private api: ApiService,
    private http: HttpClient,
  ) { }

  loginForm: any = {
    username: null,
  }

  log() {
    this.http.post(`http://127.0.0.1:8000/register.user`, this.loginForm).subscribe((res: object) => {
      // console.log(res);

    })
  }
  logs() {

    if (this.loginForm.username && this.loginForm.password
      && this.loginForm.c_password && this.loginForm.email
    ) {
      
      this.api.post('register.user', this.loginForm).subscribe( async (res:any) =>{
        // console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "registered!",
          showConfirmButton: false,
          timer: 1500
        });
        await sleep(1600)
        return nav(this.route, 'login').then(() => {
              // console.log('Navigation successful!');
            })
        
        
      },err =>{
        // console.log(err);
        
      })
        
        
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill all Field!",
        showConfirmButton: false,
        timer: 1500
      });

    }

  }


  // registerOnSubmit() {
  //   console.log(this.api.post('register.user', this.loginForm));
  //   ;
  // }
}
