import { Fb } from "./model/common/firebase-app";
import { FieldValue } from "firebase-admin/firestore";
import path from "path";

import { omit } from "./utils/omit";
import { readData } from "./utils/read-data";
import { range } from "./utils/range";

type Product = {
  name: string;
  brand: string;
  category: string;
  id: string;
  image: string;
};

const paths = [
  path.resolve(__dirname, "../data", "크림_신발.json"),
  path.resolve(__dirname, "../data", "크림_옷.json"),
];

async function addDocs<T extends { id: string }>(data: T[]) {
  const db = Fb.getInstance().FireStore;
  // Create batch
  const batch = db.batch();

  for (const item of data) {
    const ref = db.collection("products").doc(item.id);
    batch.set(ref, { ...item, createdAt: FieldValue.serverTimestamp() });
  }

  // Commit the batch
  await batch.commit();
}

function refineData(data: Product[][]) {
  return data
    .flatMap((item) => {
      return item;
    })
    .map((item) => ({
      ...omit(item, "image"),
      price: Math.floor(range(89, 329)) * 1000,
    }));
}

async function init() {
  const data = readData<Product[]>(...paths);
  const refinedData = refineData(data);
  await addDocs(refinedData);
}

// IIFE
(async () => {
  await init();
})();
