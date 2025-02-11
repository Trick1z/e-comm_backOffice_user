import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule, ModalModule } from '@coreui/angular';
import {nav} from '../../../services/navigate'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NgFor,NgIf, ButtonModule, ModalModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [ApiService]
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    this.get_products()
    this.get_product_img()

  }
  constructor(
    private api: ApiService,
    private route:Router
  ) { }

  showBuyBtn:boolean= false;

  products_data: Product[] = [];
  img_data: ImageData[] = [];

  cart_item: any = []
  img_item: ImageData[] = []
  //1,2
  get_products() {

    this.cart_item = []
    this.img_item = []

    const cartID = sessionStorage.getItem('cartID');
    const parsedCartID = cartID ? parseInt(cartID) : NaN;
    var item: any = []


    this.api.get(`get_cart_item/${parsedCartID}`).subscribe((res: any) => {
      item = res.msg.data

      if (item) {
        this.showBuyBtn = true
      }else{
        this.showBuyBtn = false
      }

      for (let i = 0; i < item.length; i++) {
        this.cart_item.push(item[i])
        this.api.get(`get_this_img/${this.cart_item[i].products_id}`).subscribe((res: any) => {
          this.img_item.push(res.data[0])
        })
      }

     
      this.get_products_id()


    })

  }


  get_product_img() {
    this.api.get(`get.img`).subscribe((res: any) => {
      this.img_item = res.data
      // console.log(this.img_item);

      // return res.msg.data[0].img_url
    })
  }

  getProductImage(productId: number): string | null {
    const image = this.img_item.find(item => item.products_id === productId);

    return image ? image.img_url : null;
  }


  get_products_id() {

    for (let pID = 0; pID < this.cart_item.length; pID++) {
      this.cart_item[pID].products_data = {};
      this.api.get(`get.products/${this.cart_item[pID].products_id}`).subscribe((res: any) => {
        this.cart_item[pID].products_data = res.data[0]
      })
    }

  }


  onDelete(id: number) {
    this.api.put(`delete.cart_item/${id}`, 'Y').subscribe((res: any) => {
      // console.log(res);
      this.get_products()
      this.get_product_img()
    })



  }


  amount_total: number = 0
  get_amoung() {
    for (let amg = 0; amg < this.cart_item.length; amg++) {
      var price = this.cart_item[amg].products_data.products_price

      var total = price * (this.cart_item[amg].quantity)
      this.amount_total = this.amount_total + total


    }
  }


  onBuySubmit() {
    // console.log(this.cart_item);

    var res = sessionStorage.getItem('body')
    var body = JSON.parse(res || '{}');
    var userID = body.user_id

    // this.cart_item
    // userID
    // this.amoung_total

    var data = {
      products_data: this.cart_item,
      user_id: userID,
      amount_total: this.amount_total
    }

    // console.log(data);

    this.api.post(`order_order_item`, data).subscribe((res: any) => {
      // console.log(res);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "order Added",
        showConfirmButton: false,
        timer: 1500
      });


      return nav(this.route, 'e-com/home').then(() => {
        // console.log('Navigation successful!');
      })
    
      
    })


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

interface ImageData {
  products_id: number;
  img_url: string;
}
