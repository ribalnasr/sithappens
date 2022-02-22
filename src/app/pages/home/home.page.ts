import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatCtaComponent } from '../../modules/ui/chat-cta/chat-cta.component';
import { IonContent, MenuController, ScrollCustomEvent } from '@ionic/angular';
import { AnalyticsService } from '../../modules/firebase/analytics.service';

@Component({
  selector: 'sit-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild('body', { static: true }) body: IonContent;
  @ViewChild('firstSurvey', { static: true }) firstSurvey: ElementRef<HTMLElement>;
  @ViewChild(ChatCtaComponent, { static: true }) chatCta: ChatCtaComponent;
  @ViewChildren('chatCheckpoint') chatCheckpoints: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private analytics: AnalyticsService,
    // private menu: MenuController
  ) { }

  // menuOpen() {
  //   this.menu.open('mainMenu');
  //   this.analytics.logEvent('menu_clicked')
  // }

  ngOnInit() {
  }

  public goTo(url: string, event?: string) {
    window.open(url, '_blank');
    if (event) {
      this.analytics.logEvent(event)
    }
  }

  scrollToSurveys() {
    this.analytics.logEvent('helpus_button_clicked')
    const top = this.firstSurvey.nativeElement.offsetTop
    this.body.scrollToPoint(0, top, 300);
    // this.firstSurvey.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  public showMiniHeader = false;

  public onScroll(event: Event) {

    this.showMiniHeader = (event as ScrollCustomEvent).detail.scrollTop > 188;

    this.chatCheckpoints.forEach((checkpoint, index) => {
      const rect = checkpoint.nativeElement.getBoundingClientRect();
      const bottom = rect.y - window.innerHeight
      if (bottom <= 0
        && this.chatCta.userHidden < index
      ) {
        this.chatCta.activeMessage = index
        this.chatCta.visible = true
      }
    })
  }



}
