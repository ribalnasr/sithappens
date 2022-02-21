import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatCtaComponent } from '../../modules/ui/chat-cta/chat-cta.component';
import { IonContent, ScrollCustomEvent } from '@ionic/angular';
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

  public logEvent = this.analytics.logEvent;

  constructor(
    private analytics: AnalyticsService,
  ) { }

  ngOnInit() {
  }

  scrollToSurveys() {
    this.analytics.logEvent('helpus_button_clicked')
    const top = this.firstSurvey.nativeElement.offsetTop + 80
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
