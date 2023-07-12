import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Room from "@/components/room/room";
const VotingRoomPage = () => {
    const router = useRouter();
    const [votingRoomData, setVotingRoomData] = useState<any>();

    useEffect(() => {
        if (router.query.roomId) {
            const apiQuery = JSON.stringify({
                roomId: router.query.roomId,
            });

            fetch("/api/find-room", {
                method: "POST",
                body: apiQuery,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setVotingRoomData(data.votingRoom);
                });
        }
    }, [router.query.roomId]);

    return <>{votingRoomData && <Room votingRoomData={votingRoomData} />}</>;
};

export default VotingRoomPage;
