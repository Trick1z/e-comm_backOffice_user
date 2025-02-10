import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { FormControlsComponent } from '../../forms/form-controls/form-controls.component'
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormModule,
} from '@coreui/angular';
import { DxFormModule, DxPopupModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import dxTextBox from 'devextreme/ui/text_box';
import { nav } from '../../../services/navigate'
import { ApiService } from 'src/app/services/api';
import { sleep } from 'src/app/services/sleep';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ButtonDirective,
    DxFormModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    HttpClientModule,
    DxPopupModule, DxTextBoxModule, DxTemplateModule,
    CommonModule, FormsModule,
  ],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

  height = { height: 300 };

  constructor(
    private route: Router,
    private api: ApiService
  ) {

  }

  ngOnInit(): void {
  }


  loginForm: any = {}

  nav_to(path: string) {
    nav(this.route, 'register').then(() => {
      console.log('Navigation successful!');
    })
  }


   loginOnSubmit() {

     this.api.post('login.user', this.loginForm)
      .subscribe( async (res: any) => {
        console.log(res);
        if (res.status === 200) {

          sessionStorage.setItem('ticket','pass')
          sessionStorage.setItem('username',res.user)
          sessionStorage.setItem('body',JSON.stringify(res.body[0]))

          // console.log('resbody',res.body);
          

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          await sleep(1600)
          nav(this.route, 'e-com/home').then(() => {
            console.log('Navigation successful!');
          })
        }

      }, err => {
        console.log(err);

      })
  }


}
