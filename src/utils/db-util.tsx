// const connectToDatabase = () => {}
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rapid-voter.xb0vuh7.mongodb.net/?retryWrites=true&w=majority`;

import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect(uri);
    return client;
}

export async function insertDoc(
    client: any,
    collectionName: string,
    document: {}
) {
    const db = client.db("rapid-voter");
    await db.collection(collectionName).insertOne(document);
}

export async function findDoc(client: any, collectionName: string, query: {}) {
    console.log("[findDoc]");
    const db = client.db("rapid-voter");
    const document = await db.collection(collectionName).findOne(query);
    console.log("findDoc query", query);
    console.log("findDoc result", document);
    return document;
}
