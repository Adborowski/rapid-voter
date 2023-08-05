// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, getRoomVotes } from "@/utils/db-util";
import clientPromise from "@/utils/mongodb";

type Data = {
    message: any;
    payload?: {};
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let client;
    console.log("[api/get-room-results]");

    try {
        client = await clientPromise;
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
    }

    try {
        const { roomId } = req.body;
        let roomVotes = await getRoomVotes(client, roomId);
        roomVotes = roomVotes.toArray().then((votes: {}) => {
            res.status(200).json({
                message: "Found room votes.",
                payload: votes,
            });
        });
    } catch (e) {
        res.status(404).json({
            message: e,
        });
        return;
    }
}
