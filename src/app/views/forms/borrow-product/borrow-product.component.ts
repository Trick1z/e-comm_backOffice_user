import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import dxPopup from 'devextreme/ui/popup';
import { DxDataGridModule, DxPopupModule } from 'devextreme-angular';
import { ButtonModule, ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent } from '@coreui/angular';
import { IconComponent, IconDirective, IconModule } from '@coreui/icons-angular';
import { cilArrowRight, cilChartPie,cilCalendarCheck } from '@coreui/icons';

@Component({
  selector: 'app-borrow-product',
  standalone: true,
  imports: [,TemplateIdDirective,WidgetStatFComponent,IconDirective,ColComponent,RowComponent,HttpClientModule, NgFor, CommonModule, DxPopupModule, DxDataGridModule, ButtonModule],
  templateUrl: './borrow-product.component.html',
  styleUrl: './borrow-product.component.scss'
})
export class BorrowProductComponent implements OnInit {
  icons = { cilChartPie, cilArrowRight,cilCalendarCheck };

  url: string = 'http://127.0.0.1:8000';
  constructor(
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.getProductData();
    this.getStudentData();
  }

  productData: any = []

  getProductData() {
    this.http.get(`${this.url}/get.product`).subscribe((res: object) => {
      // console.log(res);
      this.productData = res;

    })
  }

  popupDetail: boolean = false;
  borrow_product_info: any = []
  count: number = 0;

  getBorrowInfo(id: number) {
    this.http.get(`${this.url}/get.borrow/product_id/${id}`).subscribe((res: any) => {
      this.borrow_product_info = res

      if(res!){
        this.count = res.length;
      }else{
        this.count = 0;
      }
      // console.log(this.borrow_product_info);

    })
  }

  getProductCount(id: any) {
    this.popupDetail = true;
    this.getBorrowInfo(id[1]);
    // console.log("id :" , id);

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



  // convert times 
  convertTime(timestamp: string) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('th-TH', { month: 'long' });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate
  }


  studentData: any = []

  getStudentData() {
    this.http.get(`${this.url}/get.student`).subscribe((res: any) => {
      this.studentData = res;


    })
  }
  displayStudentData(id: number, text: string) {
    for (let i = 0; i < this.studentData.length; i++) {
      if (id === this.studentData[i].STUDENT_ID) {

        switch (text) {
          case 'name':
            return this.studentData[i].STUDENT_NAME;
          case 'code':
            return this.studentData[i].STUDENT_CODE;

          default:
            return "ไม่มีในระบบ "
        }
      }
    }
  }

}
