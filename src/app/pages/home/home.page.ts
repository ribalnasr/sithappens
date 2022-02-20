import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatCtaComponent } from '../../modules/ui/chat-cta/chat-cta.component';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { IonContent } from '@ionic/angular';

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
    private analytics: Analytics,
  ) { }

  ngOnInit() {
  }

  scrollToSurveys() {
    logEvent(this.analytics, 'helpus_button_clicked')

    const top = this.firstSurvey.nativeElement.offsetTop

    this.body.scrollToPoint(0, top, 300);
    // this.firstSurvey.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  onScroll() {
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

  logEvent(event: string) {
    logEvent(this.analytics, event)
  }

}
