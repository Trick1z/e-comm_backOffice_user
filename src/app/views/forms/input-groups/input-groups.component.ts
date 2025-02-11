import { Component, NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';

import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  FormLabelDirective,
  FormCheckInputDirective,
  ButtonDirective,
  ThemeDirective,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  DropdownDividerDirective,
  FormSelectDirective,
  TableModule,
  FormFloatingDirective,
  FormDirective,
  GutterDirective,
  FormCheckComponent,
  FormCheckLabelDirective,
  ColDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  FormFeedbackComponent,
  FormModule,
  CardModule,
  GridModule,
  TemplateIdDirective,
  WidgetStatFComponent,

} from '@coreui/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxFormComponent, DxFormModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxiColumnModule, DxiItemModule, DxoFormComponent } from 'devextreme-angular/ui/nested';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';  // Import Result from @zxing/library
import { subscribeOn } from 'rxjs';
import { IconDirective } from '@coreui/icons-angular';
import { cilArrowRight, cilChartPie, cilClipboard, cilDevices, cilLibrary } from '@coreui/icons';

@Component({
  selector: 'app-input-groups',
  templateUrl: './input-groups.component.html',
  styleUrls: ['./input-groups.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    FormLabelDirective,
    FormCheckInputDirective,
    ButtonDirective,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    DropdownDividerDirective,
    FormSelectDirective,
    ReactiveFormsModule,
    TableModule,
    DxDataGridModule,
    DxiItemModule,
    DxiColumnModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    FormSelectDirective,
    FormCheckInputDirective,
    ButtonDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    DxDataGridModule,
    HttpClientModule,
    DxFormModule,
    DxSelectBoxModule,
    DxPopupModule,
    NgIf, NgFor, FormsModule, CardModule

    , ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    TextColorDirective, GridModule, ZXingScannerModule,TemplateIdDirective,WidgetStatFComponent,IconDirective

  ],
})
export class InputGroupsComponent implements OnInit {
  url: string = 'http://127.0.0.1:8000';
  // url:string='https://fastapi-example-xafm.onrender.com';
  // url:string='https://vue-api.onrender.com';
  icons = { cilChartPie, cilArrowRight,cilDevices ,cilClipboard,cilLibrary};

  constructor(private http: HttpClient, private route: Router) { }
  availableDevices: MediaDeviceInfo[] = [];

  ngOnInit(): void {
    this.getCategory();
// active camera
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      this.availableDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      // Select the first available device as the current device
      if (this.availableDevices.length > 0) {
        this.currentDevice = this.availableDevices[0];
      }
    });

  }


  colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];




  nevBack() {
    this.route.navigate(['/forms/form-control']);
  }

  StudentForms: any;
  showProduct = false

  onSubmit() {
    this.StudentForms = this.findStudentData
    this.ShowFindPopup = false;
    this.isVisible = false
    this.showProduct = true;
    this.activeScanner = false;
    return this.findStudentData = {}
  }



  // ShowFindPopup = false;
  ShowFindPopup = false;
  findStudentData: any = {}
  isVisible = false
  // wrong = false
  // wanning = ""

  find() {
    this.isVisible = false;
    this.findStudentData = {};
    this.sCode = '';
    this.ShowFindPopup = true;
    this.activeScanner = true;
  }

  activeScanner: boolean = false;

  sCode = ''
  onFindSubmit(code: string) {
    this.http
      .get(`${this.url}/get.student/${code}`)
      .subscribe((res: any) => {

        if (res.status === 404) {
          this.isVisible = false

          // this.wrong = true
          // this.wanning = "ไม่พบข้อมูลในระบบ"
          this.ShowFindPopup = false

          Swal.fire({
            position: "center",
            icon: "error",
            title: "ไม่มีข้อมูลในระบบ",
            showConfirmButton: false,
            timer: 1300
          }).then(() => {
            // setTimeout(() => {
            // }, 2000);
            this.ShowFindPopup = true;  // Hide the popup after the alert is closed
          });

        } else if (res.message === 200) {

          this.findStudentData = res.data[0]
          this.isVisible = true
          // this.wrong = false



        } else {

          this.isVisible = false
          // this.wrong = true

          this.ShowFindPopup = false
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ข้อมูลไม่ถูกต้อง",
            showConfirmButton: false,
            timer: 1300
          }).then(() => {
            this.ShowFindPopup = true;  // Hide the popup after the alert is closed
          });


          // this.wanning = "ข้อมูลไม่ถูกต้อง"

        }

      });


  }


  ShowProductPopup = false;
  //ข้อมูล
  ProductData: any = []

  addproductBTN() {
    this.ShowProductPopup = true;
    this.findProductData();
  }


  ProductDataID: any = []

  findProductData() {

    this.http.get(`${this.url}/get.product.status/6`).subscribe((res: any) => {

      this.ProductDataID = res.data;

    });

  }

  CardButton(id: number) {

    this.http.get(`${this.url}/get.product.category.status/${id}`).subscribe((res: any) => {

      this.ProductDataID = res.data;

    });
  }

  categoryCard: any = []

  getCategory() {
    this.http
      .get(`${this.url}/get.category`)
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const obj: { [key: string]: string } = {
            name: res[i].CATEGORY_NAME,
            desc: res[i].CATEGORY_DESCRIPTION,
            value: res[i].CATEGORY_ID,
          };
          this.categoryCard.push(obj);

        }


      });
  }

  addProductToArr(data: any, index: any, status: string) {

    const onGet = () => {
      this.http.get(`${this.url}/get.product/${data[1]}`).subscribe((res: any) => {

        return this.ProductData.push(res.data[0])
      })
    }

    const onChange = () => {
      this.http.put(`${this.url}/put.onHold.Product.${status}/${data[1]}`, data[1])
        .subscribe((res: any) => {

          this.findProductData();
          return this.ShowProductPopup = false;
        });
    }
    if (status == 'Y') {
      onGet()
      onChange();
      this.ShowProductPopup = false;
    } else if (status == 'N') {
      this.ProductData.splice(index, 1);
      onChange();
    }
  }

  onSave() {
    var arr= []

    for (let id = 0; id < this.ProductData.length; id++) {
      var temp = {
        PRODUCT_ID: this.ProductData[id].PRODUCT_ID
      }
      arr.push(temp)  
    }

    const data = {
      STUDENT_ID: this.StudentForms.STUDENT_ID,
      PRODUCT_INFO: arr,
    }
    
    



    this.http.post(`${this.url}/post.borrow`, data)
      .subscribe((res: any) => {

        return this.nevBack()
      });
  }



  getProductData() {
    this.http
      .get(`${this.url}/get.product.status/6`)
      .subscribe((res: any) => {
        this.ProductDataID = res.data;
      });
  }

  // scannedResult:string =''

  // onScanSuccess(result: string) {
  //   this.scannedResult = result; // Display the scanned result
  // }

  // // Method to handle errors during the scan
  // onScanError(error: any) {
  // }



  currentDevice: MediaDeviceInfo | undefined = undefined;  // The current selected camera device
  devices: MediaDeviceInfo[] = [];  // Available camera devices
  scannedResult: any;  // Store the scanned QR code result


  // Called when devices (cameras) are found
  onDevicesFound(devices: MediaDeviceInfo[]): void {
    this.devices = devices;
    if (devices.length > 0) {
      this.currentDevice = devices[0];  // Default to the first available camera
    }
  }

  // Handle successful QR code scan
  onScanSuccess(result: any): void {
    this.scannedResult = result;
    this.sCode = this.scannedResult;

    this.onFindSubmit(this.sCode);
    // console.log('Scanned QR Code:', this.scannedResult);

  }






  // Handle QR scan errors
  onScanError(error: any): void {
    console.error('QR Scan Error:', error);
  }

  onClosePopup() {
    this.ShowFindPopup = false;
    this.activeScanner = false;
  }


  clearOnHold(state: string) {
    var word = state

    this.http.put(`${this.url}/put.on_hold/${state}`, word).subscribe((res: any) => {
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "ล้างสถานะ เรียบร้อย",
        showConfirmButton: false,
        timer: 500
      });
    })
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
