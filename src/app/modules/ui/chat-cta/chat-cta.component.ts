import { Component, Input, OnInit } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'sit-chat-cta',
  templateUrl: './chat-cta.component.html',
  styleUrls: ['./chat-cta.component.scss'],
})
export class ChatCtaComponent implements OnInit {

  public visible = false;
  public userHidden = -1;
  public activeMessage = 0;

  constructor(
    private analytics: Analytics
  ) { }

  ngOnInit() { }

  public messages = [
    'Ready to learn how to train your dog at home?',
    'Looking for a dog trainer?',
  ]

  closePopup() {


    logEvent(this.analytics, 'chat_popup_closed')

  }

}
