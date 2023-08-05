const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rapid-voter.xb0vuh7.mongodb.net/?retryWrites=true&w=majority`;

import { MongoClient } from "mongodb";

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

export async function submitVoteToRoom(
    client: any,
    roomId: string,
    selectedOption: string
) {
    const db = client.db("rapid-voter");
    const votes = db.collection("votes");

    const result = await votes.insertOne({
        roomId: roomId,
        selectedOption: selectedOption,
    });

    return result;
}

export async function getRoomVotes(client: any, roomId: string) {
    const db = client.db("rapid-voter");
    const votes = db.collection("votes");

    const result = await votes.find({ roomId: roomId });
    return result;
}
