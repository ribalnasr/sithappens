import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FPContent } from '../../fireplace/content/content.service';
import { AnalyticsService } from '../../firebase/analytics.service';


@Component({
  selector: 'sit-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrls: ['./subscribe-form.component.scss'],
})
export class SubscribeFormComponent implements OnInit {

  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    facebook: ['', [Validators.required, Validators.minLength(5)]],
    instagram: ['', [Validators.required, Validators.minLength(5)]],
    whatsapp: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private content: FPContent,
    private analytics: AnalyticsService,
  ) { }

  ngOnInit() { }

  public get valid() {
    return this.form.controls.email.valid
      || this.form.controls.facebook.valid
      || this.form.controls.instagram.valid
      || this.form.controls.whatsapp.valid
  }

  public subscribed = false;

  public async subscribe() {
    if (this.valid) {

      this.analytics.logEvent('subscribe_form_submitted');

      const result = await this.content.create({
        schema: 'subscribers',
        data: this.form.value
      })


      this.subscribed = true
    }
  }


}
