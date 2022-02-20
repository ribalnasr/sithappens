import * as sit from "./apis/apis";
import * as admin from 'firebase-admin';

const firebase = admin.initializeApp()

export const apis = new sit.Apis(firebase).functions;