# Install

```
yarn install
yarn dlx @yarnpkg/sdks vscode
```

## Firebase Admin SDK

[Firebase SDK - 공식문서](https://firebase.google.com/docs/admin/setup?hl=ko#initialize-sdk)

## How to use

usage

```
yarn start
```

## Description

```ts
// 0. create your data type
type Product = {
  name: string;
  brand: string;
  category: string;
  id: string;
  image: string;
};

// (conditional) 0 - 1. if you have data file, create paths array
const paths = [
  path.resolve(__dirname, "../data", "some-data.json"),
  path.resolve(__dirname, "../data", "some-data2.json"),
];

// 1. modify COLLECTION_NAME
async function addDocs<T extends { id: string }>(data: T[]) {
  const db = Fb.getInstance().FireStore;
  // Create batch
  const batch = db.batch();

  for (const item of data) {
    const ref = db.collection("COLLECTION_NAME").doc(item.id);
    batch.set(ref, { ...item, createdAt: FieldValue.serverTimestamp() });
  }

  // Commit the batch
  await batch.commit();
}

// 2. refine your data
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
```
