import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from '../../../services/api'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonDirective, FormModule, ModalModule } from '@coreui/angular';

import { FormsModule } from '@angular/forms';  // Import FormsModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormModule, FormsModule, CommonModule, NgFor, HttpClientModule, ModalModule, ButtonDirective
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [ApiService]
})

export class CategoryComponent implements OnInit {
  ngOnInit(): void {
    this.get_category()
    this.get_status()
  }
  constructor(
    private api: ApiService
  ) { }



  category_data: any = {}
  status_data: any = {}

  get_category() {
    this.api.get('get.category').subscribe((res: any) => {
      this.category_data = res.data
    })
  }
  get_status() {
    this.api.get('get.status').subscribe((res: any) => {
      this.status_data = res.data
    })
  }


  addForm: any = {

    name: '',
    desc: '',
  }
  onSubmit(table: string) {
    if (!this.addForm.name || !this.addForm.desc) {
      alert('Please fill out both fields');
      return;
    }

    this.api.post(`post.${table}`, this.addForm)
      .subscribe((res: any) => {
        console.log(res);

        this.get_category()
        this.get_status()
        return this.addForm = {
          name: '',
          desc: '',
        }
      })

  }

  ondelete(table: string, id: number) {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: "Delete",
    }).then((result) => {
      if (result.isDenied) {

        this.api.put(`delete.${table}/${id}`, 'n').subscribe((res: any) => {
          console.log(res);

          this.get_category()
          this.get_status()
          return
        })
        Swal.fire("Deleted!", "", "success");
      }
    });
  }


}
