import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sitTypes from "@sithappens/types";

export class Apis {

  private firestore = this.firebase.firestore();

  constructor(
    private firebase: admin.app.App
  ) { }

  public functions = functions.https.onCall((data: sitTypes.ApiOptions, context) => {

    switch (data.action) {
      case 'subscribe':

        return 'subscribe action'

      default:
        throw 'No valid api action.'
    }

  });


}

export const apis = (
  firebase: admin.app.App
) => new Apis(firebase)