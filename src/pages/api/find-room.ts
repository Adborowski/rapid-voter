// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDoc, findDoc } from "@/utils/db-util";

type Data = {
    message: string;
    votingRoom?: {};
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let client;
    let votingRoom;
    console.log("[api/find-room]");

    try {
        client = await connectDatabase();
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
    }

    try {
        console.log("req.body", req.body);
        votingRoom = await findDoc(client, "voting-rooms", {
            roomId: "b5190058-f6b3-4b1f-9885-baefbc66e7e4",
        });
    } catch (e) {
        res.status(500).json({ message: "Could not insert document." });
    }

    if (votingRoom) {
        res.status(200).json({ message: "Room found", votingRoom: votingRoom });
    } else {
        res.status(404).json({ message: "No room found with this ID." });
    }
}
