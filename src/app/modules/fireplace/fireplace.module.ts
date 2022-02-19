import { ModuleWithProviders, NgModule } from '@angular/core';
import { FIREPLACE_CONFIG } from './config/config.token';
import { FireplaceConfig } from './config/config.interface';
import { FPSchemas } from './schemas/schemas.service';
import { FPContent } from './content/content.service';
import { FPStorage } from './storage/storage.service';


@NgModule({
    providers: [
        FPSchemas,
        FPContent,
        FPStorage,
    ]
})
export class FPModule {
    static forRoot(config: FireplaceConfig): ModuleWithProviders<FPModule> {
        return {
            ngModule: FPModule,
            providers: [
                { provide: FIREPLACE_CONFIG, useValue: config },
            ]
        };
    }

}
