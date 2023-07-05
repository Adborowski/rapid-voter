import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const VotingRoomPage = () => {
    const router = useRouter();

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
                });
        }
    }, [router.query.roomId]);

    return <div>Let's vote</div>;
};

export default VotingRoomPage;
