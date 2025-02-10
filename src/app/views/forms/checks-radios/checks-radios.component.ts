import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  FormDirective,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonGroupComponent,
  ButtonDirective,
} from '@coreui/angular';
import {
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import dxPopup from 'devextreme/ui/popup';

@Component({
  selector: 'app-checks-radios',
  templateUrl: './checks-radios.component.html',
  styleUrls: ['./checks-radios.component.scss'],
  standalone: true,
  imports: [
    DxFormModule,
    RowComponent,
    ReactiveFormsModule,
    FormDirective,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonGroupComponent,
    ButtonDirective,
    HttpClientModule,
    DxDataGridModule,
    DxPopupModule,

    DxFormModule,
  ],
})
export class ChecksRadiosComponent implements OnInit {
  //  url:string = 'https://fastapi-example-xafm.onrender.com'

  url: string = 'http://127.0.0.1:8000'
  // url:string='https://vue-api.onrender.com';

  
  categoryData: any = {};
  statusData: any = {};

  constructor(private http: HttpClient) { }

  // POPUPSTATUS

  addCategoryPopup = false;
  addStatusPopup = false;

  // Form
  addCateForm: any = {};
  addStatusForm: any = {};

  ngOnInit(): void {
    this.getCategoryData();
    this.getStatusData();
  }
  // ----------------------------------catefory here v----------------------------------

  OnAddCate() {
    this.addCategoryPopup = true;
  }

  getCategoryData() {
    this.http
      .get(`${this.url}/get.category`)
      .subscribe((res: any) => {
        this.categoryData = res;

      });
  }

  // CatePopupForm
  categoryOnSubmit() {
    var data = this.addCateForm;
    this.http
      .post(`${this.url}/post.category`, data)
      .subscribe((res) => {
        this.getCategoryData();
        this.categoryOnClose();

        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'เพิ่มหมวดหมู่เสร็จสิ้น',
          showConfirmButton: false,
          timer: 1000,
        });
      });
  }

  categoryOnClose() {
    this.addCategoryPopup = false;
    this.addCateForm = {};
  }


  openCategoryDelete(data: any) {
    Swal.fire({
      title: `ต้องการลบไอดีที่ ${data[0]} "${data[1]}" ใช่หรือไม่ ?`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`${this.url}/delete.category/${data[0]}`, data[0])
          .subscribe((res) => {
            this.getCategoryData();
            return Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'ลบสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }

  editCategoryPopup = false;
  editCateForm: any = {};
  editID = 0;

  onCategoryEditPopup(data: any) {
    this.editCateForm = {
      CATEGORY_ID: data[0],
      CATEGORY_NAME: data[1],
      CATEGORY_DESCRIPTION: data[2],
    }
    this.editCategoryPopup = true;
  }

  categoryOnEditSubmit() {
    var data = this.editCateForm;

    this.http
      .put(`${this.url}/put.category`, data)
      .subscribe((res) => {
        this.getCategoryData();
      });

    this.categoryOnEditClose();
  }

  categoryOnEditClose() {
    this.editCategoryPopup = false;
    this.editCateForm = {};
  }

  // ----------------------------------category here ^----------------------------------

  //----------------------------------status code here v----------------------------------
  OnAddStatus() {
    this.addStatusPopup = true;
  }

  getStatusData() {
    this.http
      .get(`${this.url}/get.status`)
      .subscribe((res: any) => {
        this.statusData = res;
      });
  }

  // CatePopupForm
  statusOnSubmit() {
    var data = this.addStatusForm;

    this.http
      .post(`${this.url}/post.status`, data)
      .subscribe((res) => {
        this.getStatusData();
        this.statusOnClose();

        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'เพิ่มหมวดหมู่เสร็จสิ้น',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  statusOnClose() {
    this.addStatusPopup = false;
    this.addStatusForm = {};
  }


  EditStatusPopup = false;
  editStatusForm: any = {};

  onStatusEditPopup(data: any) {
    this.EditStatusPopup = true;
    this.editStatusForm = {
      STATUS_ID: data[0],
      STATUS_NAME: data[1],
      STATUS_DESCRIPTION: data[2]
    }
    
  }


  openStatusDelete(data: any) {
    Swal.fire({
      title: `ต้องการลบไอดีที่ ${data[0]} "${data[1]}" ใช่หรือไม่ ?`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`${this.url}/delete.status/${data[0]}`, data[0])
          .subscribe((res) => {
            this.getStatusData();

            return Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'ลบสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }

  EditStatusOnSubmit() {
    var data = this.editStatusForm;
    this.http
      .put(`${this.url}/put.status`, data)
      .subscribe((res) => {
        this.getStatusData();
      });

    this.StatusOnEditClose();
  }

  StatusOnEditClose() {
    this.editStatusForm = {}
    this.EditStatusPopup = false;
  }
  //----------------------------------status code here ^----------------------------------

}
