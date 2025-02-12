import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarComponent, ButtonDirective, ModalModule } from '@coreui/angular';
import { cilPlus } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from '../../../services/api'
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AvatarComponent, ButtonDirective,
    IconDirective, CommonModule,
    NgFor, HttpClientModule,
    ModalModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [ApiService]
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {
    this.get_detail()
    this.get_orders()
    this.get_status()
  }

  constructor(
    private api: ApiService
  ) { }

  data: any = {}
  icons: any = [cilPlus]
  get_detail() {
    this.data = JSON.parse(sessionStorage.getItem('body') as string)



  }


  order_item: any = []

  get_orders() {
    var res = sessionStorage.getItem('body')
    var body = JSON.parse(res || '{}');
    var userID = body.user_id

    this.api.get(`get_order_userID/${userID}`).subscribe((res: any) => {
      console.log(res);

      this.order_item = res.data

    })
  }

  status_item: Status[] = []
  get_status() {
    this.api.get('get.status').subscribe((res: any) => {
      this.status_item = res.data
    })
  }

  dp_status(statusid: number): string | null {
    const _status = this.status_item.find(item => item.status_id === statusid);
    return _status ? _status.status_name : null;
  }

  order_info: order[] = []
  get_order_id(order_id: number) {
    this.api.get(`get_order_orderID/${order_id}`).subscribe((res: any) => {
      this.order_info = res.data
      console.log(res);
      this.get_product_img_item()
    })
  }


  product_item: Product[] = []
  img_item: ImageData[] = []
  get_product_img_item() {
    this.get_product__item()
    this.get_img__item()

  }

  get_product__item() {
    this.product_item = []
    for (let p = 0; p < this.order_info.length; p++) {
      var id = this.order_info[p].products_id
      this.api.get(`get.products/${id}`).subscribe((res: any) => {
        this.product_item.push(res.data[0])
      })
    }
  }
  get_img__item() {
    this.img_item = []
    for (let img = 0; img < this.order_info.length; img++) {
      var id = this.order_info[img].products_id
      this.api.get(`get_this_img/${id}`).subscribe((res: any) => {
        this.img_item.push(res.data[0])
      })
    }
  }

  dp_img(products_id: number): string | null {
    const img = this.img_item.find(item => item.products_id === products_id);
    return img ? img.img_url : null;
  }

  order(products_id: number): number | null {
    const qu = this.order_info.find(item => item.products_id === products_id);
    return qu ? qu.quantity : null;
  }


}





interface Status {
  status_id: number
  status_name: string
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

interface order {
  
    order_item_id:number
    order_id: number
    products_id: number
    quantity: number
    price: number
    del_frag: string
    create_date: string
    update_date: string

}

