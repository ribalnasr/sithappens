import { Injectable } from '@angular/core';
import { Firestore, DocumentReference, doc, collectionData, collection, query, CollectionReference, deleteDoc, addDoc, setDoc, docData } from '@angular/fire/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Schemas } from '../schemas/schemas.interface';
import { FPSchemas } from '../schemas/schemas.service';
import { Content } from './content.interface';


@Injectable({
  providedIn: 'root'
})
export class FPContent {

  constructor(
    private firestore: Firestore,
    private schemas: FPSchemas
  ) { }

  public ref<T extends Content.DocumentData = Content.DocumentData>(path: string) {
    return doc(this.firestore, path) as DocumentReference<T>;
  }

  public get<T extends Content.DocumentData = Content.DocumentData>(options: Content.GetAllOptions): Observable<T[]>
  public get<T extends Content.DocumentData = Content.DocumentData>(options: Content.GetOneOptions): Observable<T>
  public get<T extends Content.DocumentData = Content.DocumentData>(options: Content.GetAllOptions | Content.GetOneOptions): Observable<T> | Observable<T[]> {
    return Object.prototype.hasOwnProperty.call(options, 'id')
      ? this.getOne<T>(options as Content.GetOneOptions)
      : this.getAll<T>(options as Content.GetAllOptions)
  }

  public getAll<T extends Content.DocumentData = Content.DocumentData>(options: Content.GetAllOptions) {

    const schema = this.schemas.get(options.schema);

    if (!schema) {
      throw `Schema ${options.schema} does not exist. Check FireplaceConfig object in AppModule.`;
    }

    const collectionRef = collection(this.firestore, schema.collection) as CollectionReference<T>

    let data = collectionData(
      query(
        collectionRef,
        ...(options.query || [])
      ),
      { idField: options.idField || 'id' }
    )

    if (options.locale) {
      data = data.pipe(
        switchMap(
          results => combineLatest(
            results.map(result => this.localize({
              initialData: result,
              schema: options.schema,
              locale: options.locale
            }))
          )
        )
      )
    }

    if (options.populate) {
      data = data.pipe(
        switchMap(
          results => combineLatest(
            results.map(result => this.populate({
              initialData: result,
              schema: options.schema,
              fields: options.populate || [],
              locale: options.locale
            }))
          )
        )
      )
    }

    return data;
  }

  public getOne<T extends Content.DocumentData = Content.DocumentData>(options: Content.GetOneOptions) {

    const schema = this.schemas.get(options.schema);

    if (!schema) {
      throw `Schema ${options.schema} does not exist. Check FireplaceConfig object in AppModule.`;
    }


    let data = docData(
      doc(
        this.firestore,
        schema.collection,
        options.id
      ) as DocumentReference<T>,
      { idField: options.idField || 'id' }
    )


    if (options.locale) {

      data = data.pipe(
        switchMap(
          result => this.localize({
            initialData: result,
            schema: options.schema,
            locale: options.locale
          })
        )
      )

    }
    if (options.populate) {
      data = data.pipe(
        switchMap(
          result => this.populate({
            initialData: result,
            schema: options.schema,
            fields: options.populate || [],
            locale: options.locale
          })
        )
      )
    }

    return data;

  }

  public async create<T extends Content.DocumentData = Content.DocumentData>(options: Content.CreateOptions<T>) {
    return this.update<T>({
      ...options,
      data: {
        ...options.data || {},
        _meta: {
          ...options.data?._meta || {},
          created: new Date(),
          order: new Date().getTime()
        },
      } as T,
      id: options.id,
      skipWarning: true
    })
  }

  public async update<T extends Content.DocumentData = Content.DocumentData>(options: Content.UpdateOptions<T>) {

    options = {
      merge: true,
      ...options
    }

    const schema = this.schemas.get(options.schema);

    if (!schema) {
      throw `Schema ${options.schema} does not exist. Check FireplaceConfig object in AppModule.`;
    }

    const nonLocalizedData = {
      ...options.data || {},
      _meta: {
        ...options.data?._meta || {},
        lastUpdated: new Date(),
      },
    } as Content.DocumentData;

    const localizedData = {
      ...options.data
    }

    for (const field of schema.fields || []) {
      if (field.localized) {
        delete nonLocalizedData[field.key];
      }
      delete localizedData['id'];
      if (!field.localized) {
        delete localizedData[field.key];
      }
    }

    const collectionRef = collection(
      this.firestore,
      schema.collection
    ) as CollectionReference<T>

    let id = options.id;
    if (!id) {
      id = (await addDoc(
        collectionRef,
        nonLocalizedData
      )).id
      if (!options.skipWarning) {
        console.warn(`Property 'id' was not provided. Created new document instead with id: ${id}`);
      }
    } else {
      await setDoc(
        doc(
          this.firestore,
          schema.collection,
          options.id!
        ),
        nonLocalizedData
      ).catch(
        error => {
          console.error(error)
        }
      )
    }

    if (options.locale && Object.entries(localizedData).length) {

      await setDoc<any>(
        doc(
          this.firestore,
          schema.collection,
          id,
          'translations',
          options.locale
        ),
        localizedData
      )

    }

    return id;

  }

  public async delete(options: Content.DeleteOptions) {
    const schema = this.schemas.get(options.schema);

    if (!schema) {
      throw `Schema ${options.schema} does not exist. Check FireplaceConfig object in AppModule.`;
    }

    return deleteDoc(
      doc(
        this.firestore,
        schema.collection,
        options.id
      )
    )

  }

  public localize<T extends Content.DocumentData = Content.DocumentData>(options: Content.LocalizeOptions<T>) {

    const schema = this.schemas.get(options.schema);

    if (!schema) {
      throw `Schema ${options.schema} does not exist. Check FireplaceConfig object in AppModule.`;
    }

    if (!options.locale) {
      throw `Locale is not specified.`;
    }

    const documentRef = doc(
      this.firestore,
      schema.collection,
      options.initialData.id,
      'translations',
      options.locale
    ) as DocumentReference<Partial<T>>

    const localizedData = docData(documentRef);

    return localizedData.pipe(
      map<Partial<T>, T>(
        translation => {
          if (translation?.id) {
            delete translation.id
          }

          return {
            ...options.initialData,
            ...(translation || {})
          }
        }
      )
    )

  }

  public populate<T extends Content.DocumentData = Content.DocumentData>(options: Content.PopulateOptions<T>) {

    const schema = this.schemas.get(options.schema);

    if (!schema) {
      throw `Schema ${options.schema} does not exist. Check FireplaceConfig object in AppModule.`;
    }


    const populatableFields = ['select-relational', 'media'];

    const fieldsToPopulate: (Schemas.SelectRelationalFieldSettings | Schemas.MediaFieldSettings)[] = (schema.fields || []).filter(field => populatableFields.includes(field.type) && options.fields.map(populateField => populateField.field).includes(field.key)) as any;

    const data = {
      ...options.initialData
    };

    const populatedFields = fieldsToPopulate.map(
      field => {
        const multiple = field.limit !== 1;

        const fieldSchema = this.schemas.get(field.type === 'media' ? 'media' : field.schema);

        const getOne = (reference: DocumentReference) => this.getOne({ id: reference.id, schema: fieldSchema!.key, locale: options.locale, populate: options.fields.find(populateField => populateField.field === field.key)?.children || [] })

        if (multiple) {
          const references = options.initialData[field.key] as DocumentReference[];
          return combineLatest(references.map(reference => getOne(reference)));
        } else {
          const reference = options.initialData[field.key] as DocumentReference;
          return getOne(reference)
        }
      }
    );

    return (
      populatedFields.length
        ? combineLatest(populatedFields)
        : of([])
    ).pipe(
      map(
        result => {

          let index = 0;
          for (const field of fieldsToPopulate) {
            (data as any)[field.key] = result[index];
            index++;
          }

          return data;
        }
      )
    )

  }

  public getOverviewFields<FieldSettings extends Schemas.FieldBaseSettings = Schemas.FieldSettings>(options: Content.GetOverviewOptions) {

    const overviewFields = this.schemas.getOverviewFields(options.schema);

    return this.get({
      id: options.id,
      schema: options.schema,
      locale: options.locale,

    }).pipe(
      map(
        data => {
          const results = overviewFields.map((field) => ({
            value: data[field.key],
            field
          }));
          return results as Content.OverviewResult<FieldSettings, any>[];
        }
      )
    )
  }

}
