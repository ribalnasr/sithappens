import { FieldPath, QueryConstraint } from "@angular/fire/firestore";
import { Schemas } from "../schemas/schemas.interface";

export namespace Content {

  export interface ContentOptions {
    schema: string;
    locale?: string;
  }

  export interface GetOptions extends ContentOptions {
    populate?: PopulateField[];
    idField?: string;
  }

  export interface GetAllOptions extends GetOptions {
    query?: QueryConstraint[];
  }

  export interface GetOneOptions extends GetOptions {
    id: string;
  }

  export interface DocumentMetaData {
    order?: number;
    created?: Date;
    lastUpdated?: Date;
  }
  export interface DocumentData {
    _meta?: DocumentMetaData;
    id: string;
    [x: string]: any;
  }

  export interface CreateOptions<T extends DocumentData = DocumentData> extends ContentOptions {
    id?: string;
    data: Partial<T>;
  }

  export interface UpdateOptions<T extends DocumentData = DocumentData> extends CreateOptions<T> {
    id?: string;
    skipWarning?: boolean;
    merge?: boolean;
    mergeFields?: (string | FieldPath)[];
  }

  export interface DeleteOptions {
    schema: string;
    id: string;
  }

  export interface PopulateField {
    field: string;
    children?: PopulateField[];
  }

  export interface PopulateOptions<T extends DocumentData = DocumentData> {
    initialData: T;
    schema: string;
    fields: PopulateField[];
    locale?: string;
  }

  export interface LocalizeOptions<T extends DocumentData = DocumentData> {
    initialData: T;
    schema: string;
    locale?: string;
  }

  export interface GetOverviewOptions extends ContentOptions {
    id: string;
    // convertToString?: boolean;
  }
  export interface OverviewResult
    <FieldType extends Schemas.FieldBaseSettings, ValueType> {
    field: FieldType;
    value: ValueType;
  }

}
