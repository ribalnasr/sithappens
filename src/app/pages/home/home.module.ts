import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HeaderModule } from '../../modules/ui/header/header.module';
import { SubscribeFormModule } from '../../modules/ui/subscribe-form/subscribe-form.module';
import { ChatCtaModule } from '../../modules/ui/chat-cta/chat-cta.module';
import { SurveyCtaModule } from '../../modules/ui/survey-cta/survey-cta.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    SubscribeFormModule,
    ChatCtaModule,
    SurveyCtaModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
