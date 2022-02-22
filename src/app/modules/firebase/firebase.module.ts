import { Injectable, NgModule } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideFunctions, getFunctions } from '@angular/fire/functions';
// import { provideMessaging, getMessaging } from '@angular/fire/messaging';
// import { providePerformance, getPerformance } from '@angular/fire/performance';
// import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
// import { provideStorage, getStorage } from '@angular/fire/storage';
import { initializeAppCheck, provideAppCheck } from '@angular/fire/app-check';
import { AnalyticsService } from './analytics.service';
import { RecaptchaBrowser } from './appcheck-provider.service';


@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // provideFunctions(() => getFunctions()),
    // provideMessaging(() => getMessaging()),
    // providePerformance(() => getPerformance()),
    // provideRemoteConfig(() => getRemoteConfig()),
    // provideStorage(() => getStorage()),
    provideAppCheck((injector) => initializeAppCheck(getApp(), {
      provider: injector.get(RecaptchaBrowser).provider(environment.recaptcha.siteKey),
      isTokenAutoRefreshEnabled: true
    })),
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    AnalyticsService
  ],

})
export class FirebaseModule { }
