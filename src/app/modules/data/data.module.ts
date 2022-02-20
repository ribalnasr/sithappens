import { NgModule } from '@angular/core';
import { FPModule } from '../../modules/fireplace/fireplace.module';


@NgModule({
  imports: [
    FPModule.forRoot({
      schemas: [
        {
          key: 'subscribers',
          collection: 'sit_subscribers',
          fields: [
            { key: 'email', type: 'text', label: 'Email' },
            { key: 'facebook', type: 'text', label: 'Facebook' },
            { key: 'instagram', type: 'text', label: 'Instagram' },
            { key: 'whatsapp', type: 'text', label: 'WhatsApp' },
          ]
        }
      ]
    }),
  ]
})
export class DataModule { }
