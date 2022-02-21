import { Injectable } from "@angular/core";
import { Analytics, logEvent } from '@angular/fire/analytics';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    constructor(
        private analytics: Analytics,
    ) { }

    logEvent(event: string) {
        if (environment.production) {
            logEvent(this.analytics, event)
        }
    }
}