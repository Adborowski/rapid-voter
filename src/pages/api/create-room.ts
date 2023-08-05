// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDoc } from "@/utils/db-util";
import clientPromise from "@/utils/mongodb";

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let client;
    console.log("[api/create-room]");
    console.log(req.body);

    try {
        client = await clientPromise;
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
        return;
    }

    try {
        insertDoc(client, "voting-rooms", req.body);
    } catch (e) {
        res.status(500).json({ message: "Could not insert document." });
        return;
    }

    res.status(200).json(req.body);
}
