import { InjectionToken } from "@angular/core";
import { FireplaceConfig } from "./config.interface";

export const FIREPLACE_CONFIG = new InjectionToken<FireplaceConfig>('FireplaceConfig');
