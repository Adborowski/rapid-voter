// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDoc } from "@/utils/db-util";

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
        client = await connectDatabase();
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
    }

    try {
        insertDoc(client, "voting-rooms", req.body);
    } catch (e) {
        res.status(500).json({ message: "Could not insert document." });
    }

    res.status(200).json(req.body);
}
