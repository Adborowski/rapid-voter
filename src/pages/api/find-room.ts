// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDoc, findDoc } from "@/utils/db-util";
import clientPromise from "@/utils/mongodb";

type Data = {
    message: any;
    votingRoom?: {};
    query?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let client;
    console.log("[api/find-room]");

    try {
        client = await clientPromise;
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
    }

    try {
        const query = JSON.parse(req.body);
        console.log(req.body);
        let votingRoom = await findDoc(client, "voting-rooms", query);
        res.status(200).json({
            message: "Room found",
            votingRoom: votingRoom,
        });
    } catch (e) {
        res.status(404).json({
            query: req.body,
            message: e,
        });
        return;
    }
}
