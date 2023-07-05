import { useRouter } from "next/router";
const VotingRoomPage = () => {
    const router = useRouter();
    console.log(router.query.roomId);

    const query = {
        roomId: router.query.roomId,
    };

    fetch("/api/find-room", {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
    return <h1>Let's vote</h1>;
};

export default VotingRoomPage;
