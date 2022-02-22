import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideMenuComponent } from './side-menu.component';



@NgModule({
  declarations: [SideMenuComponent],
  exports: [SideMenuComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class SideMenuModule { }
