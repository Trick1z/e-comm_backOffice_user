import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardLinkDirective, CardTextDirective, CardTitleDirective, ColComponent, FormModule, GutterDirective, ListGroupDirective, ModalModule, RowComponent } from '@coreui/angular';
import { ApiService } from '../../../services/api'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListGroupDirective, CardComponent, CardBodyComponent,
    CardTitleDirective, CardBodyComponent, RowComponent, ColComponent,
    GutterDirective, CardFooterComponent, HttpClientModule,
    NgFor, CommonModule, ButtonDirective,
    ModalModule, FormModule, FormsModule

  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ApiService],
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
    this.get_products()
    this.get_product_img()
    this.get_cat_sta()
  }
  constructor(
    private api: ApiService
  ) { }

  products_data: Product[] = []
  img_data: ImageData[] = []

  get_products() {
    this.api.get(`get.products`).subscribe((res: any) => {
      this.products_data = res.data

      console.log('successfuly pull products data !');
    })
  }



  get_product_img() {
    this.api.get(`get.img`).subscribe((res: any) => {
      this.img_data = res.data
      // return res.msg.data[0].img_url
    })
  }

  getProductImage(productId: number): string | null {
    const image = this.img_data.find(item => item.products_id === productId);
    return image ? image.img_url : null;
  }




  convert_time(time: string) {
    const timeStr = time;

    const date = new Date(timeStr);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const formattedTime = date.toLocaleString('en-US', options);

    return formattedTime
  }
  base64Image: string = '';

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];  // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Image = reader.result as string;  // Store the base64 string
      };
    }
  }


  addForm: any = {};


  onSubmit() {
    this.addForm.img_url = this.base64Image

    var cat_id = parseInt(this.addForm.category_id)

    this.addForm.category_id = cat_id

    this.api.post('post.products/', this.addForm).subscribe((res: any) => {
      this.get_products();
      this.get_product_img();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product added!",
        showConfirmButton: false,
        timer: 1000
      });
      this.base64Image = '';
      return this.addForm = {}
    })
  }

  category_data: any = []
  get_cat_sta() {

    this.api.get(`get.category`).subscribe((res: any) => {
      this.category_data = res.data

    })
  }

  delete(p_id: number) {

    console.log(p_id);

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: `Delete`
    }).then((result) => {
      if (result.isDenied) {

        this.api.put(`delete2.products/${p_id}`, 'y').subscribe((res: any) => {
          console.log(res);
        })

        this.api.put(`delete2.img/${p_id}`, 'y').subscribe((res: any) => {
          console.log(res);

        })


        this.get_products()
        this.get_product_img()
        this.get_cat_sta()

        return Swal.fire("Saved!", "", "success");

      }

      return
    });
  }


  editForm: any = {}
  // onedit(id: number) {
  //   this.api.get(`get.products/${id}`).subscribe((res: any) => {
  //         this.editForm = res.data[0]; 
  //         console.log(res);
  //       });


  // }
  async onedit(id: number) {
    try {
      const productRes = await this.api.get(`get.products/${id}`).toPromise();
      this.editForm = productRes.data[0]; // Assign the product data to the form

      const imgRes = await this.api.get(`get_this_img/${id}`).toPromise();
      this.base64Image = imgRes.data[0].img_url; // Assign the image URL to the form
    } catch (error) {
      console.error('Error:', error);
    }
  }


  // onedit_data(id: number) {
  //   this.api.get(`get.products/${id}`).subscribe((res: any) => {
  //     this.editForm = res.data[0]; 
  //     console.log(res);
  //      // Assign the product data to the form

  //   });
  // }
  // onedit_img(id: number) {
  //   this.api.get(`get.this_img/${id}`).subscribe((imgRes: any) => {
  //     this.editForm.img_url = imgRes.data[0];  // Assign the image URL to the form
  //     console.log(imgRes);
  //   });
  // }


  onEditSubmit() {
    this.editForm.img_url = this.base64Image
    this.api.put(`put.product_img`, this.editForm).subscribe((res: any) => {
      console.log(res);
      this.get_products()
      this.get_product_img()
      this.get_cat_sta()
    })

    return
  }

}





interface Product {
  products_id: number;
  products_name: string;
  products_desc: string;
  products_price: string;
  category_id: number;
  stock_quantity: number;
  update_date: string;
}

// interface addForm{
//   strinproduct_name: string;
//   product_desc: string;
//   product_price: string;
//   category_id :number;
//   stock_quantity: number;
//   img_url:string
// }

interface ImageData {
  products_id: number;
  img_url: string;
}
