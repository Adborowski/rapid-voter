import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/utils/mongodb";
import { submitVoteToRoom } from "@/utils/db-util";

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
    console.log(req.body);

    try {
        client = await clientPromise;
        const { roomId, selectedOption } = req.body;
        const result = await submitVoteToRoom(client, roomId, selectedOption);
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
    }
}
