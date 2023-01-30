import { initializeApp, getApps, cert } from "firebase-admin/app";
import { debug } from "../../utils/debug";
import { getFirestore, Firestore } from "firebase-admin/firestore";

var serviceAccount = require("../../../serviceKey.json");

const log = debug("Fb |");

export class Fb {
  private static instance: Fb;
  private store: Firestore | undefined;

  private constructor() {
    this.bootstrap();
  }

  bootstrap() {
    if (!!getApps().length === true) {
      log("already boot");
      return;
    }
    log("boot start");

    const app = initializeApp({
      credential: cert(serviceAccount),
    });
    this.store = getFirestore();

    log("boot end");
  }

  static getInstance() {
    if (!Fb.instance) {
      Fb.instance = new Fb();
    }

    return Fb.instance;
  }

  get FireStore() {
    if (!this.store) {
      this.bootstrap();
    }
    return this.store!;
  }
}
