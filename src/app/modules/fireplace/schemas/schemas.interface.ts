import { Type } from "@angular/core";
import { Validators } from "@angular/forms";

export namespace Schemas {

    export interface SchemaSettings {
        key: string;
        collection: string;
        fields?: FieldSettings[];
        // CMS
        title?: string;
        sortable?: boolean;
        provider?: Type<any>;
        rowButtons?: RowButton[];
    }

    export interface RowButton {
        icon?: string;
        label: string;
        action: (item: any, provider: any) => any;

    }

    export interface FieldBaseSettings {
        key: string;
        label: string;
        defaultValue?: any;
        showInOverview?: boolean;
        validators?: Validators;
        type: string | any;
        localized?: boolean;
    }

    export interface FileFieldSettings extends FieldBaseSettings {
        type: 'file';
    }


    export interface TextFieldSettings extends FieldBaseSettings {
        type: 'text';
    }

    export interface URLFieldSettings extends FieldBaseSettings {
        type: 'url';
        fileType?: string;
    }

    export interface SelectRelationalFieldSettings extends FieldBaseSettings {
        type: 'select-relational';
        schema: string;
        limit?: number;
        fieldToShow: string;
    }

    export interface MediaFieldSettings extends FieldBaseSettings {
        type: 'media';
        limit?: number;
    }

    export interface ToggleFieldSettings extends FieldBaseSettings {
        type: 'toggle';
    }

    export type FieldSettings = TextFieldSettings | SelectRelationalFieldSettings | MediaFieldSettings | FileFieldSettings | URLFieldSettings | ToggleFieldSettings;

}