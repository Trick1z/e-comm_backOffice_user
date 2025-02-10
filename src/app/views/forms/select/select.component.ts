import { IconDirective } from '@coreui/icons-angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormFloatingDirective,
  FormControlDirective,
  FormLabelDirective,
  FormDirective,
  FormSelectDirective,
  GutterDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  FormFeedbackComponent,
} from '@coreui/angular';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFileUploaderModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay, Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
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
  ],
})
export class SelectComponent implements OnInit {
  ngOnInit(): void {

  }

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private route: Router) { }

  file: File | null = null;
  fileUrl: string | null = null; // ตัวแปรเพื่อเก็บ URL ของรูปภาพ
 
  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];

  if (this.selectedFile) {
    this.file = this.selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Get the base64 data from the Data URL
      this.fileUrl = e.target.result;  // Remove the data URL prefix
      // console.log(this.fileUrl);  // Logs only the base64-encoded content
    };

    reader.readAsDataURL(this.file! ); // Read the file as Data URL
  } else {
    this.file = null;
    this.fileUrl = null;
  }
}

// onFileSelected(event: any) {
//   const selectedFile = event.target.files[0];

//   if (selectedFile) {
//     this.file = selectedFile;

//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       // Read as text with UTF-8 encoding
//       this.fileUrl = e.target.result; // Now fileUrl is a string, not a base64
//       console.log(this.fileUrl);
//     };

//     reader.readAsText(this.file!, "UTF-8"); // Read the file as text with UTF-8 encoding
//   } else {
//     this.file = null;
//     this.fileUrl = null;
//   }
// }


  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files?.length) {
  //     this.selectedFile = input.files[0];
  //     console.log('File selected:', this.selectedFile);
  //   }
  // }

  // uploadFile(): void {
  //   if (!this.selectedFile) return;

  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile, this.selectedFile.name);

  //   console.log("db",formData);
  //   console.log("db1",this.selectedFile);
  //   console.log("db2",this.selectedFile.name);
    

    // this.http.post('http://127.0.0.1:8000/upload', formData).subscribe(
    //   (response) => {
    //     console.log('File uploaded successfully:', response);
    //   },
    //   (error) => {
    //     console.error('Error uploading file:', error);
    //   }
    // );
  // }

  uploadFile() {

    if(this.selectedFile == null){
      Swal.fire("SweetAlert2 is working!");
      return
    }

    

    const base64File = this.fileUrl; 
    const payload = { file: base64File };
  
    
    const headers = {
      'Content-Type': 'application/json',  
    };
  
  
    this.http.post('http://127.0.0.1:8000/upload-csv', payload, { headers }).subscribe(
      (res: any) => {

      // console.log(res);
      

        Swal.fire({
          title: "อัพโหลดเสร็จสิ้น",
          text: "ต้องการอัพโหลดเพิ่มเติมหรือไม่ ?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช้",
          cancelButtonText: "ไม่ใช้",
        }).then((result) => {
          if (!result.isConfirmed) {
            return this.navBack()
          }
        });
  

      },
      (err) => {
        Swal.fire({
          title: "error",
          icon: "success",
          draggable: true
        });
      }

      
    );
    
    return
  }



  navBack(){ 
    this.route.navigate(['/forms/layout']);
  }

  onCancel() { 
    this.route.navigate(['/forms/layout']);
  }
}
