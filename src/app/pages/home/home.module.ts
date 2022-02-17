import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HeaderModule } from '../../modules/ui/header/header.module';
import { SubscribeFormModule } from '../../modules/ui/subscribe-form/subscribe-form.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    SubscribeFormModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
