import { Component, OnInit } from '@angular/core';
import { AvatarComponent, ButtonDirective } from '@coreui/angular';
import { cilPlus } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AvatarComponent,ButtonDirective,IconDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
ngOnInit(): void {
  this.get_detail()
}

constructor(){}

data:any={}
icons:any = [cilPlus]
get_detail(){
  this.data = JSON.parse(sessionStorage.getItem('body')as string) 


  
}

}

