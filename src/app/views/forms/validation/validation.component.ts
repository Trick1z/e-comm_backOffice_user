import { IconDirective, IconModule } from '@coreui/icons-angular';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { WidgetModule, WidgetStatBComponent } from '@coreui/angular';

import { cilArrowRight, cilChartPie,cilClipboard,cilDevices, cilLibrary, } from '@coreui/icons';
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
  FormFeedbackComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormSelectDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  CardModule,
  GridModule,
  DropdownModule,
  ProgressModule,
  SharedModule,

} from '@coreui/angular';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { ChartjsModule } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  standalone: true,
  imports: [IconDirective,
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
    FormFeedbackComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ListGroupDirective,
    ListGroupItemDirective,
    HttpClientModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
    CardModule,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    TextColorDirective, NgFor, GridModule, NgIf,
    DropdownModule,
    ProgressModule,
    SharedModule,
    WidgetModule,
    IconModule,
    ChartjsModule
  ],
})
export class ValidationComponent implements OnInit {
  icons = { cilChartPie, cilArrowRight,cilDevices ,cilClipboard,cilLibrary};
  G_ID = 0;
  ShowmorePopup = false;

  // colors = [
  //   { color: 'primary', textColor: 'primary' },
  //   { color: 'secondary', textColor: 'secondary' },
  //   { color: 'success', textColor: 'success' },
  //   { color: 'danger', textColor: 'danger' },
  //   { color: 'warning', textColor: 'warning' },
  //   { color: 'info', textColor: 'info' },
  //   { color: 'light' },
  //   { color: 'dark' }
  // ];
  url: string = 'http://127.0.0.1:8000'
  // url:string='https://vue-api.onrender.com';

  // url:string = 'https://fastapi-example-xafm.onrender.com'



  constructor(private route: Router, private http: HttpClient,) {
  }
  ngOnInit(): void {
    this.getProductData();
    this.getStatus();
    this.getCategory();
    this.getProductCount();

  }

  nevAdd() {
    this.route.navigate(['/forms/floating-labels']);
  }



  ProductData: any = {};
  StatusData: any = [];
  CategoryData: any = [];
  // StatusData: any = {};

  //  getdata
  categoryCard: any = [];


  getProductData() {
    this.http
      .get(`${this.url}/get.product`)
      .subscribe((res: any) => {
        this.ProductData = res;
      });
  }

  getStatus() {
    this.http
      .get(`${this.url}/get.status`)
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const obj: { [key: string]: string } = {
            name: res[i].STATUS_NAME,
            value: res[i].STATUS_ID,
          };

          this.StatusData.push(obj);
        }
      });
  }
  productCount:any =[];
  getProductCount(){
    this.http.get(`${this.url}/count.product`).subscribe((res:any ) =>{
      return this.productCount = res["data"][0];
    })
  }

  getCategory() {
    this.http
      .get(`${this.url}/get.category`)
      .subscribe((res: any) => {
        console.log(res);
        
        for (let i = 0; i < res.length; i++) {
          const obj: { [key: string]: string } = {
            name: res[i].CATEGORY_NAME,
            desc: res[i].CATEGORY_DESCRIPTION,
            value: res[i].CATEGORY_ID,
          };
          this.categoryCard.push(obj);
          this.CategoryData.push(obj);
        }
      });
  }

  displayFormatDate_status(id: number) {
    for (let i = 0; i < this.StatusData.length; i++) {
      if (id === this.StatusData[i].value) {
        return this.StatusData[i].name;
      }
    }
  }

  displayFormatDate_category(id: number) {
    for (let i = 0; i < this.CategoryData.length; i++) {
      if (id === this.CategoryData[i].value) {
        return this.CategoryData[i].name;
      }
    }

    return "ไม่มีในระบบ ผิดผลาด"
  }
  tempForm: any;

  ProductEditPopup = false;
  ProductEditForm: any = {};


  // 11
  GlobalID: number = 0;
  onProductEditPopup(data: any) {

    this.http.get(`${this.url}/get.product/${data[1]}`).subscribe((res: any) => {
      this.ProductEditForm = res.data[0]

    })
    this.ProductEditPopup = true;
  }

  openProductDelete(data: any) {
    Swal.fire({
      title: `ต้องการลบ "${data[2]}" ID ที่ ${data[1]}`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`${this.url}/delete.product/${data[1]}`, data[1])
          .subscribe((res: any) => {
            this.getProductData();

            return Swal.fire({
              icon: 'success',
              title: 'ลบข้อมูลแล้ว',
              showConfirmButton: false,
              timer: 1000,
            });
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ยกเลิกการลบแล้ว',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }


  onCancelEditPopup() {
    this.ProductEditForm = {};
    this.ProductEditPopup = false;
    this.getProductData();
  }

  onSubmitEdtiPopup() {

    const data = this.ProductEditForm;

    
    this.http
      .put(`${this.url}/put.product/${data.PRODUCT_ID}`, data)
      .subscribe((res) => {
        this.getProductData();
        this.ProductEditPopup = false;

        return Swal.fire({
          icon: 'success',
          title: 'อัพเดทข้อมูลแล้ว',
          showConfirmButton: false,
          timer: 1000,
        });
      });

  }

  showmoreData: any;


  // getShowmoreData(id: number) {
  //   this.http
  //     .get(`${this.url}/get.product/${id}`)
  //     .subscribe((res: any) => {
  //       this.showmoreData = res.data;

  //     });
  // }

  temp: any;

  onShowMorePopup(data: any) {
    var id = data[1];

    this.http.get(`${this.url}/get.product/${id}`).subscribe((res: any) => {
      
      this.showmoreData = res.data[0]
    })

    this.ShowmorePopup = true;
    this.temp = this.getImage(id)

  }
  // : Observable<Blob>
  imgData: any;
  getImage(id: number): void {
    this.http.get(`${this.url}/get.img/${id}`)
      .subscribe(
        (response: any) => {

          this.imgData = response.data[0].IMG_NAME;
        },
        error => {
          console.error('Error fetching image:', error);
        }
      );
  }



  CardButton(id: number) {

    this.http
      .get(`${this.url}/get.product.category/${id}`)
      .subscribe((res: any) => {
        // console.log(res);
        
        this.ProductData = res.data;
      });
  }
}
