import { Component, Input, OnInit } from '@angular/core';
import { AnalyticsService } from '../../firebase/analytics.service';

export type SurveyType = 'parenting' | 'caregiving';

export interface Survey {
  type: SurveyType;
  title: string;
  body: string;
  imageUrl: string;
  formUrl: string;
  analyticsEvent: string;
}

export const surveys: Survey[] = [
  {
    type: 'parenting',
    title: 'Does your family include a Pet?',
    body: 'Only 4 minutes of your time can help us make pet-parenting in Tbilisi safer & stress-free.',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdeUurh-6M_YNu1kC0-5dljDLOy-CT5eDh0uWomKU40yCZQCw/viewform?usp=sf_link',
    imageUrl: '/assets/images/living.png',
    analyticsEvent: 'parenting_survey_link_clicked'
  },
  {
    type: 'caregiving',
    title: 'Do you enjoy Pet Sitting, Dog Walking or Boarding?',
    body: 'Only 4 minutes of your time can help us make pet caregiving in Tbilisi easier & more accessible.',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeSaW1iLE_QJKFcIrEjKAfwrpM_NP0dz7gATkVfgCuaWf-TSA/viewform?usp=sf_link',
    imageUrl: '/assets/images/park.png',
    analyticsEvent: 'caregiving_survey_link_clicked'
  }
];

@Component({
  selector: 'sit-survey-cta',
  templateUrl: './survey-cta.component.html',
  styleUrls: ['./survey-cta.component.scss'],
})
export class SurveyCtaComponent implements OnInit {

  @Input() survey: SurveyType;


  public get activeSurvey() {
    return surveys.find(survey => survey.type === this.survey)
  }


  constructor(
    private analytics: AnalyticsService,
  ) { }

  public goTo(url: string, event?: string) {
    window.open(url, '_blank');
    if (event) {
      this.analytics.logEvent(event)
    }
  }


  ngOnInit() { }

}
