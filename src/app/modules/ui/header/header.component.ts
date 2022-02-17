import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'sit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(
    public menu: MenuController
  ) { }

  menuOpen() {
    this.menu.open()
  }

}
