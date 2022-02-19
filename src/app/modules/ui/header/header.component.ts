import { Component } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'sit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(
    private menu: MenuController,
    private analytics: Analytics
  ) { }

  menuOpen() {
    this.menu.open();
    logEvent(this.analytics, 'menu_clicked')
  }

}
