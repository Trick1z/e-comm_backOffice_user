import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import {
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import dxSelectBox from 'devextreme/ui/select_box';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { retry } from 'rxjs';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    DxDataGridModule,
    DxFormModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    DxSelectBoxModule,
    CommonModule,
    NgFor,
    DxDataGridModule,
    DxFormModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    HttpClientModule,
    DxSelectBoxModule,
    DxPopupModule
  ],
})
export class FormControlsComponent implements OnInit {
  url: string = 'http://127.0.0.1:8000';
  // url:string='https://vue-api.onrender.com';

  // url:string ='https://fastapi-example-xafm.onrender.com';
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getStudentData()
    this.getProductData()
    this.getBorrow()
  }

  borrowForm: any = {}
  studentData: any = {}

  nevAdd() {
    this.route.navigate(['/forms/input-group']);
  }

  getBorrow() {
    this.http.get(`${this.url}/get.borrow/N`).subscribe((res: any) => {
      this.borrowForm = res.data;

    })
  }



  getStudentData() {
    this.http.get(`${this.url}/get.student`).subscribe((res: any) => {
      this.studentData = res;


    })
  }

  productData: any = {}
  getProductData() {
    this.http.get(`${this.url}/get.product`).subscribe((res: any) => {
      this.productData = res;
      

    })
  }
// 11111
  displayStudentData(id: number, text: string) {
    for (let i = 0; i < this.studentData.length; i++) {
      if (id === this.studentData[i].STUDENT_ID) {

        switch (text) {
          case 'name':
            return this.studentData[i].STUDENT_NAME;
          case 'code':
            return this.studentData[i].STUDENT_CODE;

          default:
            return "ไม่มีในระบบ ผิดผลาด"
        }
      }
    }
  }



  displayproduct(id: number, text: string) {
    for (let j = 0; j < this.productData.length; j++) {
      if (id === this.productData[j].PRODUCT_ID) {

        switch (text) {
          case 'name':
            return this.productData[j].PRODUCT_NAME;
          case 'serial':
            return this.productData[j].PRODUCT_SERIALNUMBER;
          case 'qe':
            return this.productData[j].PRODUCT_EQUIPMENTNUMBER;

          default:
            return "ไม่มีในระบบ ผิดผลาด"
        }
      }
    }
    return "ผิดผลาด"
    
  }


  //// ส่งคืน


  toChange(datas:any) {

    // var show_id = this.borrowForm[index].LIST_ID


    var data = {
      PRODUCT_ID: datas[4],
      LIST_ID:  datas[1]
     
    }

    Swal.fire({
      title: `ต้องการคืน ID "${datas[1]}" ใช่หรือไม่ ?`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`${this.url}/put.borrow.back`, data)
          .subscribe((res) => {
            this.getBorrow();

            return Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'คืนสำเร็จ',
              showConfirmButton: false,
              timer: 500,
            });
          });
      }
    });
  }

  ShowInfoPopup = false;
  showInfoData: any = {}
  getId = 0
  imgData: any;

  triggerPopup(data:any) {
    
    const getInfo = () => {
      this.http.get(`${this.url}/get.product/${data[4]}`).subscribe((res:any) => {
       this.showInfoData = res.data[0];
       
      })
      

    }

    const getImage = () => {
      this.http.get(`${this.url}/get.img/${data[4]}`)
        .subscribe(
          (response: any) => {            
            this.imgData = response.data[0].IMG_NAME;
          },
          error => {
            console.error('Error fetching image:', error);
          }
        );
    }


    getInfo();
    getImage();

    return this.ShowInfoPopup = true;


  }

  convertTime(timestamp: string) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('th-TH', { month: 'long' });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate
  }





}

