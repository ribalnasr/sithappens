import { Inject, Injectable } from '@angular/core';
import { FireplaceConfig } from '../config/config.interface';
import { FIREPLACE_CONFIG } from '../config/config.token';
import { Schemas } from './schemas.interface';

@Injectable({
  providedIn: 'root'
})
export class FPSchemas {

  public defaultSchemas: Schemas.SchemaSettings[] = [
    {
      key: 'media',
      collection: 'fp_media',
      fields: [
        { type: 'url', fileType: 'image', key: 'url', label: 'URL', showInOverview: true },
        { type: 'text', key: 'name', label: 'Name', showInOverview: true },
        { type: 'text', key: 'type', label: 'Type', showInOverview: true },
      ]
    },
    {
      key: 'locales',
      collection: 'fp_locales',
      fields: [
        { type: 'text', key: 'id', label: 'Key', showInOverview: true },
        { type: 'text', key: 'label', label: 'Label', showInOverview: true },
      ]
    },
    {
      key: 'users',
      collection: 'fp_users',
      fields: [
        { type: 'text', key: 'id', label: 'UID', showInOverview: true },
      ]
    }
  ]

  constructor(
    @Inject(FIREPLACE_CONFIG) private config: FireplaceConfig
  ) { }

  public get schemas(): Schemas.SchemaSettings[] {
    return [
      ...this.config.schemas,
      ...this.defaultSchemas
    ]
  }

  public get(schemaKey: string) {
    return this.schemas.find(schema => schema.key === schemaKey);
  }

  public getOverviewFields(schemaKey: string) {
    return this.get(schemaKey)?.fields?.filter(field => field.showInOverview) || []
  }

  public getAll() {
    return this.schemas;
  }




}
