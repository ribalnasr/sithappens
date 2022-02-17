import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SubscribeFormComponent } from './subscribe-form.component';



@NgModule({
  declarations: [SubscribeFormComponent],
  exports: [SubscribeFormComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SubscribeFormModule { }
