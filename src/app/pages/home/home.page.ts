import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatCtaComponent } from '../../modules/ui/chat-cta/chat-cta.component';

@Component({
  selector: 'sit-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(ChatCtaComponent, { static: true }) chatCta: ChatCtaComponent;
  @ViewChildren('chatCheckpoint') chatCheckpoints: QueryList<ElementRef<HTMLElement>>;

  constructor() { }

  ngOnInit() {
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

}
