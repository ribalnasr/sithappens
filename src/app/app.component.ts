import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Get in touch', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Where credit is due', url: '/folder/Outbox', icon: 'paper-plane' },
  ];
  constructor() { }
}
