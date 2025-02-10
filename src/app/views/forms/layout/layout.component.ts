import { Component, OnInit } from '@angular/core';
import {
  DevExtremeModule,
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFileUploaderModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormFloatingDirective,
  GutterDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  FormFeedbackComponent,
} from '@coreui/angular';
import dxTextArea from 'devextreme/ui/text_area';
import { method } from 'lodash-es';
import { CommonModule, NgFor, NgStyle } from '@angular/common';


import { IconDirective } from '@coreui/icons-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay, Observable } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    DxFormModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormFloatingDirective,
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    NgStyle,
    FormSelectDirective,
    GutterDirective,
    DxTextAreaModule,
    DxPopupModule,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    DxButtonModule,
    DxDataGridModule,
    DxFileUploaderModule,
    HttpClientModule,
    DxSelectBoxModule,
    ListGroupDirective,
    ListGroupItemDirective,
    FormFeedbackComponent,
    NgFor,
    CommonModule, DxDateBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxPopupModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormControlDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    DxButtonModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxFileUploaderModule,
    HttpClientModule,
  ],
})
export class LayoutComponent implements OnInit {
  
  url: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.getStudentData();
  }
  studentData: any = [];

  getStudentData() {
    this.http.get(`${this.url}/get.student`).subscribe((res: object) => {
      this.studentData = res;

    })
  }

  // editpopup
  StudentEditPopup: boolean = false;
  EditForms: object = {}


  onEditPopup(data: any) {
    this.http.get(`${this.url}/get.std/${data[0]}`).subscribe((res: any) => {
      this.EditForms = res['data'][0];
      this.StudentEditPopup = true;
      return
    })

  }
  onDataDelete(data:any){
    console.log(data);
    
    Swal.fire({
          title: `ต้องการลบ "${data[2]}" ID ที่ ${data[0]}`,
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
        }).then((result) => {
          if (result.isConfirmed) {
            this.http
              .put(`${this.url}/delete.student/${data[0]}`, data[0])
              .subscribe((res: any) => {
                this.getStudentData();
    
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

  onEditSubmit() {
    this.http.put(`${this.url}/put.student`, this.EditForms).subscribe((res: any) => {
      this.onEditCancle();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });

      return this.getStudentData()
    })
  }
  onEditCancle() {
    this.EditForms = {};
    this.StudentEditPopup = false;

  }

  navTo(){ 
    this.route.navigate(['/forms/select']);
  }

}



