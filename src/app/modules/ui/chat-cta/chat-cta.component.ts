import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sit-chat-cta',
  templateUrl: './chat-cta.component.html',
  styleUrls: ['./chat-cta.component.scss'],
})
export class ChatCtaComponent implements OnInit {

  @Input()
  public set srcoll(event) {
    console.log(event)
  }

  public visible = false;
  public userHidden = -1;
  public activeMessage = 0;


  constructor() { }

  ngOnInit() { }

  public messages = [
    'Ready to learn how to train your dog at home?',
    'Looking for dog trainer?',
  ]

}
