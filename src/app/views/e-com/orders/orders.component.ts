import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { ButtonDirective, FormModule, ModalModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NgFor, ButtonDirective, ModalModule, FormsModule,
    FormModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss', providers: [ApiService]
})
export class OrdersComponent implements OnInit {


  ngOnInit(): void {
    this.get_orders()
    this.get_status()
  }

  constructor(
    private api: ApiService
  ) { }


  order_item: any = []
  get_orders() {
    this.api.get('get_orders/').subscribe((res: any) => {
      this.order_item = res.data
      // console.log(res);

    })
  }
  status_item: status[] = []
  get_status() {
    this.api.get('get.status').subscribe((res: any) => {
      this.status_item = res.data
      // console.log(res);

    })
  }

  dp_status(status_id: number): string | null {
    const status = this.status_item.find(item => item.status_id === status_id);
    return status ? status.status_name : null;
  }



  status_value: number = 0;
  order_id: number = 0
  total_amount: number = 0;

  set_valures(oid: number, sid: number,total:number) {
    this.status_value = sid
    this.order_id = oid
    this.total_amount = total

  }

  onsubmit() {
    // console.log(this.status_value);
    this.api.put(`put_orders_status/${this.order_id}.${this.status_value}`, this.status_value).subscribe((res: any) => {
      // console.log(res);
      this.get_orders()
    })

  }
}

interface status {
  status_id: number
  status_name: string
  status_desc: string
}
