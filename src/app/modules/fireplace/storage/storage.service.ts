import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Storage as FirebaseStorage, ref, deleteObject, uploadBytesResumable, percentage, getDownloadURL } from '@angular/fire/storage';
import { first, map } from 'rxjs/operators';
import { FPContent } from '../content/content.service';
import { Storage } from './storage.interface';

@Injectable({
  providedIn: 'root'
})
export class FPStorage {

  constructor(
    private storage: FirebaseStorage,
    private content: FPContent
  ) { }


  public upload(options: Storage.UploadOptions) {
    return new UploadTask(options, this.storage, this.content);
  }

  public async delete(options: Storage.DeleteOptions) {
    const media = await this.content.get<Storage.Media>({
      schema: 'media',
      id: options.id
    }).pipe(first()).toPromise();

    await deleteObject(
      ref(
        this.storage,
        media.fullPath
      )
    )

  }


}

export class UploadTask {

  private task = uploadBytesResumable(
    ref(
      this.storage,
      'uploads/' + this.options.file.name
    ),
    this.options.file,
    {
      contentType: this.options.file.type,
      customMetadata: this.options.metadata
    }
  )


  public cancel = () => this.task.cancel();
  public pause = () => this.task.pause();
  public progress$ = percentage(this.task).pipe(
    map(
      snap => snap.progress
    )
  )
  public resume = () => this.task.resume();

  private successFn = (_success: DocumentReference<Storage.Media>) => { };
  private errorFn = (_error: any) => { };

  public then = (onSuccess: (success: DocumentReference<Storage.Media>) => any) => {
    this.successFn = onSuccess;
  }

  public catch = (onError: (error: any) => any) => {
    this.errorFn = onError;
  }

  constructor(
    private options: Storage.UploadOptions,
    private storage: FirebaseStorage,
    private content: FPContent
  ) {

    this.task.then(
      async snap => {

        const url = await getDownloadURL(snap.ref)

        const data = {
          name: this.options.file.name,
          size: this.options.file.size,
          type: this.options.file.type,
          url,
          fullPath: snap.ref.fullPath,
          metadata: options.metadata || {}
        };

        this.content.create<Storage.Media>({
          schema: 'media',
          data
        }).then(
          id => {
            const ref = this.content.ref<Storage.Media>('app_files/' + id);
            this.successFn(ref);
          }
        ).catch(
          error => {
            this.errorFn(error)
          }
        )


      },
      async error => {
        this.errorFn(error)
      }

    );

    this.task.catch(error => {
      this.errorFn(error)
    })


  }


}