import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from '../../../services/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonDirective, FormModule, ModalModule } from '@coreui/angular';

import { FormsModule } from '@angular/forms'; // Import FormsModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormModule,
    FormsModule,
    CommonModule,
    NgFor,
    HttpClientModule,
    ModalModule,
    ButtonDirective,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [ApiService],
})
export class CategoryComponent implements OnInit {
  ngOnInit(): void {
    this.get_category();
    this.get_status();
  }
  constructor(private api: ApiService) {}

  category_data: any = {};
  status_data: any = {};

  get_category() {
    this.api.get('get.category').subscribe((res: any) => {
      this.category_data = res.data;
    });
  }
  get_status() {
    this.api.get('get.status').subscribe((res: any) => {
      this.status_data = res.data;
    });
  }

  addForm: any = {
    name: '',
    desc: '',
  };

  onSubmit(table: string) {
    if (!this.addForm.name || !this.addForm.desc) {
      alert('Please fill out both fields');
      return;
    }

    this.api.post(`post.${table}`, this.addForm).subscribe((res: any) => {
      // console.log(res);

      this.get_category();
      this.get_status();
      return (this.addForm = {
        name: '',
        desc: '',
      });
    });
  }

  ondelete(table: string, id: number) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: 'Delete',
    }).then((result) => {
      if (result.isDenied) {
        this.api.put(`delete.${table}/${id}`, 'n').subscribe((res: any) => {
          // console.log(res);

          this.get_category();
          this.get_status();
          return;
        });
        Swal.fire('Deleted!', '', 'success');
      }
    });
  }

  editFrom: any = {};

  onEditCategory(item:any,table:string) {
    /* The variable `g_table` in the `CategoryComponent` class is declared as a string type. It seems
    like it was intended to be used as a property to store a table name or identifier for editing
    purposes. However, there seems to be a mistake in its usage in the `onEditCategory` method where
    it is not assigned a value correctly. */
    this.g_table = table
    this.editFrom.id = item.category_id;
    this.editFrom.name = item.category_name;
    this.editFrom.desc = item.category_desc;
    console.log(item);

  }

  onEditStaus(item:any,table:string) {
    this.g_table = table

    this.editFrom.id = item.status_id;
    this.editFrom.name = item.status_name;
    this.editFrom.desc = item.status_desc;
    console.log(item);

  }


  g_table:string = ''
  onEditSubmit(){
    var table = this.g_table

    this.api.put(`edit.put/${table}=${this.editFrom.id}` , this.editFrom ).subscribe((res: any) => {
      console.log(res);

      this.get_category();
      this.get_status();
      return Swal.fire({
        position: "center",
        icon: "success",
        title: `Your ${this.g_table} has been changed!`,
        showConfirmButton: false,
        timer: 1000
      });

    });



  }
}
