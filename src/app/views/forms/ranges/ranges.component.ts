import { Component, OnInit } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormLabelDirective, FormControlDirective, CardModule, ButtonModule, FormModule, RowDirective, CardImgDirective, CardTextDirective, CardTitleDirective, GutterDirective, BorderDirective, ButtonDirective, GridModule, WidgetStatBComponent, TemplateIdDirective } from '@coreui/angular';

import { Router } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { forEach } from 'lodash-es';
import { count } from 'rxjs';
import { int } from '@zxing/library/esm/customTypings';
import { cilArrowRight, cilChartPie } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.scss'],
  standalone: true,
  imports: [HttpClientModule, DxDataGridModule, FormModule, ButtonModule, CardModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormLabelDirective, FormControlDirective,
    BorderDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    CardTextDirective,
    CardTitleDirective,
    ColComponent,
    RowComponent,
    TextColorDirective,
    NgFor,
    GutterDirective,
    GridModule,
    CardImgDirective,
    WidgetStatBComponent,
    RowComponent, ColComponent,ButtonModule,IconDirective,
    TemplateIdDirective
  ]
})
export class RangesComponent implements OnInit {
  url: string = 'http://127.0.0.1:8000';
  icons = { cilChartPie, cilArrowRight };
  // url:string='https://vue-api.onrender.com';

  // url:string='https://fastapi-example-xafm.onrender.com';


  constructor(private route: Router, private http: HttpClient) { }


  ngOnInit(): void {
    this.getStudentData()
    this.getProductData()
    this.getBorrow()
    this.get_count();
  }




  borrowForm: any = {}
  studentData: any = {}

  nevAdd() {
    this.route.navigate(['/forms/input-group']);
  }

  getBorrow() {
    this.http.get(`${this.url}/get.borrow/Y`).subscribe((res: any) => {
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


  counts: { key: string, value: any }[] = [];

  get_count() {
    this.http.get(`${this.url}/count.borrow`).subscribe((res: any) => {
      // this.counts = res.data[0]

      this.counts = Object.entries(res.data[0]).map(([key, value]) => ({ key, value }));


    })
  }
  // get_count() {
  //   const msg = ['all', 'returned', 'not_returned']

  //   for (let index = 0; index < msg.length; index++) {
  //     this.http.get(`${this.url}/count.${msg[index]}`).subscribe((res: any) => {

  //       const obj: { [key: string]: string } = {
  //         name: msg[index],
  //         value: res.list.count
  //       };
  //       this.counts.push(obj)
  //     })
  //   }
  // }

  // displayCardsName(text:string) {
  //   const msg = ['all', 'returned', 'not_return']
  //   const dp = ['รายการทั้งหมด','คืนแล้ว','ยังไม่คืน'] 

  //   for (let index = 0; index < msg.length; index++) {

  //     if (text === msg[index]) {
  //       return dp[index]
  //     }
  //   }
  //   return 'ผิดพลาด'
  // }

  convertTime(timestamp: string) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('th-TH', { month: 'long' });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate
  }




}
