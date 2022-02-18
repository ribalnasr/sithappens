import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatCtaComponent } from './chat-cta.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ChatCtaComponent],
  exports: [ChatCtaComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ChatCtaModule { }
