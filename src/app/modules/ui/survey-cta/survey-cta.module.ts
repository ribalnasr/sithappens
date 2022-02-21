import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SurveyCtaComponent } from './survey-cta.component';



@NgModule({
  declarations: [
    SurveyCtaComponent
  ],
  exports: [
    SurveyCtaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SurveyCtaModule { }
