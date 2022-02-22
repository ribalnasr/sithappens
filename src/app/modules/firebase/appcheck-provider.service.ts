import { Inject, Injectable, PLATFORM_ID } from "@angular/core"
import { CustomProvider, ReCaptchaV3Provider } from "firebase/app-check"
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class RecaptchaBrowser {

    constructor(
        @Inject(PLATFORM_ID) private platformId: string
    ) { }

    provider(siteKey: string) {
        return isPlatformBrowser(this.platformId)
            ? new ReCaptchaV3Provider(siteKey)
            : new CustomProvider({
                getToken: () => new Promise(() => { })
            })
    }
}